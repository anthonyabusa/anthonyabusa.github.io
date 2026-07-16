#!/usr/bin/env python3
"""
Two-way sync between the Notion "Books" DB and the site's `library` content
collection (src/content/library/*.md), so the public /library bookshelf stays
in lockstep with the Books DB Ant curates in Notion.

Field ownership (this is what makes "two-way" safe — each field has exactly ONE
authoritative side, so neither direction ever clobbers the other's work):

  Notion  → local   the catalog: Title, Author, Genre, Rating, Status,
                    Progress, Completed. Notion is where Ant manages books, so a
                    pull overwrites these fields locally. The "Hear About From"
                    field is deliberately NOT synced (it names real people).
  local   → Notion   reading notes (the markdown BODY of each file) are written
                    back to the Notion page under a site-owned "Notes (from
                    site)" heading, replacing only that managed section.
  local-only         `cover` (fetched once from OpenLibrary; Notion has no
                    cover property) is preserved across pulls, never pushed.

Safety contract (mirrors people-db-sync/notion_sync.py):
  * Dry-run by DEFAULT. Real writes require --commit.
  * Idempotent: every file carries `notionId`; matches on it, so a book maps to
    exactly one file regardless of a title edit.
  * Pull never touches the markdown body; push never touches catalog frontmatter.
    A book edited on both sides therefore merges cleanly — no last-write race.

Usage:
  python3 scripts/sync-library.py                 # dry-run pull: prints plan, writes nothing
  python3 scripts/sync-library.py --commit        # pull Notion -> local .md files
  python3 scripts/sync-library.py --commit --push # also push local notes -> Notion page bodies
  python3 scripts/sync-library.py --commit --no-covers   # skip OpenLibrary cover lookups
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

# Reuse the shared throttled Notion client (cross-process ~3 req/s, 429-safe).
# Same bridge people-db-sync uses; keeps every Notion call on one paced client.
sys.path.insert(0, str(Path.home() / "metis-os/scripts"))
import notion_cc  # noqa: E402

BOOKS_DB = "85b22868-00ad-4979-9870-cd2bcf1adce3"
CONTENT_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "library"
NOTION_VER = "2022-06-28"
TOK = notion_cc.token()

# Notion Status name -> our compact status enum.
STATUS_MAP = {"Done": "read", "In progress": "reading", "Not started": "want"}
NOTES_HEADING = "Notes (from site)"  # site-owned section in the Notion page body


# ---------------------------------------------------------------------------
# Notion API (paced through notion_cc's throttle)
# ---------------------------------------------------------------------------
def api(method: str, path: str, payload: dict | None = None) -> dict:
    # notion_cc.request self-throttles (~3 req/s) and retries 429s; returns (ok, data).
    ok, data = notion_cc.request(TOK, method, path, payload)
    if not ok:
        raise RuntimeError(f"Notion API {method} {path}: {data.get('error')} {data.get('detail','')}")
    return data


def query_all_books() -> list[dict]:
    out, cursor = [], None
    while True:
        payload = {"page_size": 100}
        if cursor:
            payload["start_cursor"] = cursor
        r = api("POST", f"/databases/{BOOKS_DB}/query", payload)
        out.extend(r["results"])
        if not r.get("has_more"):
            return out
        cursor = r["next_cursor"]


# ---------------------------------------------------------------------------
# Property extraction
# ---------------------------------------------------------------------------
def _plain(rich: list) -> str:
    return "".join(x.get("plain_text", "") for x in (rich or [])).strip()


def book_from_page(page: dict) -> dict:
    p = page["properties"]

    def sel(name):
        v = p.get(name, {}).get("select")
        return v["name"] if v else None

    def multi(name):
        return [o["name"] for o in p.get(name, {}).get("multi_select", []) or []]

    status_name = (p.get("Status", {}).get("status") or {}).get("name")
    rating_raw = sel("Rating")
    completed = (p.get("Completed", {}).get("date") or {}).get("start")

    return {
        "notionId": page["id"],
        "notionLastEdited": page.get("last_edited_time"),
        "title": _plain(p.get("Title", {}).get("title")) or "Untitled",
        "authors": multi("Author"),
        "genres": multi("Genre"),
        "status": STATUS_MAP.get(status_name, "want"),
        "rating": int(rating_raw) if rating_raw and rating_raw.isdigit() else None,
        "progress": p.get("Progress", {}).get("number"),
        "completed": completed,
        # NOTE: the Notion "Hear About From" field is intentionally NOT synced.
        # It names real people (recommenders), which must never land in this
        # PUBLIC repo. It isn't shown on the page either, so nothing is lost.
    }


# ---------------------------------------------------------------------------
# OpenLibrary covers (keyless, best-effort, cached in frontmatter)
# ---------------------------------------------------------------------------
def fetch_cover(title: str, author: str | None) -> str | None:
    q = {"title": title, "fields": "cover_i", "limit": "1"}
    if author:
        q["author"] = author
    url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode(q)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "anthonyabusa.com library sync"})
        with urllib.request.urlopen(req, timeout=15) as r:
            docs = json.load(r).get("docs", [])
        cid = docs[0].get("cover_i") if docs else None
        # -L (large): -M looked rough on the shelf; same image, higher res.
        return f"https://covers.openlibrary.org/b/id/{cid}-L.jpg" if cid else None
    except Exception:
        return None


# ---------------------------------------------------------------------------
# OpenLibrary synopses (keyless, best-effort, cached in frontmatter, blank-safe)
# ---------------------------------------------------------------------------
_BLURB_SRC = r"(Globe|Times|Post|Chronicle|Review|Journal|Weekly|Magazine|News|Herald|Guardian|Tribune|NPR|BookPage|Booklist|Kirkus)"


def _clean_desc(desc) -> str:
    if isinstance(desc, dict):
        desc = desc.get("value", "")
    d = str(desc or "")
    d = re.split(r"\n\s*[-*_]{3,}", d)[0]                     # cut "----" source separators
    d = re.sub(r"\(\[source\]\[\d+\]\).*", "", d, flags=re.S)  # OL "([source][1])" cruft
    d = re.sub(r"^\s*\[\d+\]:\s*http\S+.*$", "", d, flags=re.M)
    d = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", d)            # markdown links -> text
    d = re.sub(r"\*\*(.+?)\*\*", r"\1", d)
    d = re.sub(r"(?<!\w)\*(.+?)\*(?!\w)", r"\1", d)
    d = re.sub(r"__(.+?)__", r"\1", d)
    d = re.sub(r"From the [A-Za-z ]+ edition\.?", "", d)
    d = re.sub(r"[\w .'’-]{2,45}\bpdf\b", "", d, flags=re.I)   # "<title> pdf" download spam
    d = re.sub(r"--\s*[A-Z][\w .'’&]+", "", d)                 # "--The Boston Globe" attributions
    d = d.replace("—", ", ").replace("–", "-")                 # em/en dashes: site voice forbids em dashes
    d = re.sub(r"\s*,\s*,", ",", d)
    d = re.sub(r"\s+", " ", d).strip().strip('"“”‘’ ')
    if len(d) > 600:
        cut = d[:600]
        dot = cut.rfind(". ")
        d = (cut[: dot + 1] if dot > 300 else cut).strip()
    return d


def _is_junk_desc(d: str) -> bool:
    """Reject marketing-blurb / review-quote 'descriptions' — blank beats junk."""
    if len(d) < 40 or re.search(r"\bpdf\b", d, re.I):
        return True
    if re.search(_BLURB_SRC, d) and ('"' in d or "“" in d):
        return True
    return d.count('"') + d.count("“") + d.count("”") >= 4


def fetch_synopsis(title: str, author: str | None, cover: str | None) -> str | None:
    """Best-effort book blurb from OpenLibrary, matched to the cover already in use."""
    cover_id = None
    if cover:
        m = re.search(r"/b/id/(\d+)-", cover)
        cover_id = m.group(1) if m else None
    q = {"title": title, "limit": "5", "fields": "key,cover_i"}
    if author:
        q["author"] = author
    ua = {"User-Agent": "anthonyabusa.com library sync"}
    try:
        req = urllib.request.Request("https://openlibrary.org/search.json?" + urllib.parse.urlencode(q), headers=ua)
        with urllib.request.urlopen(req, timeout=15) as r:
            docs = json.load(r).get("docs", [])
    except Exception:
        return None
    if not docs:
        return None
    doc = next((d for d in docs if cover_id and str(d.get("cover_i")) == cover_id), None) or docs[0]
    key = doc.get("key")
    if not key:
        return None
    try:
        req = urllib.request.Request(f"https://openlibrary.org{key}.json", headers=ua)
        with urllib.request.urlopen(req, timeout=15) as r:
            work = json.load(r)
    except Exception:
        return None
    d = _clean_desc(work.get("description", ""))
    return None if (not d or _is_junk_desc(d)) else d


def itunes_lookup(title: str, author: str | None):
    """Second source (iTunes/Apple Books) for what Open Library misses: returns
    (cover_url|None, description|None). Keyless; Google Books hard-429s here."""
    term = title + ((" " + author) if author else "")
    try:
        req = urllib.request.Request(
            "https://itunes.apple.com/search?" + urllib.parse.urlencode(
                {"term": term, "entity": "ebook", "limit": "3"}),
            headers={"User-Agent": "anthonyabusa.com library sync"})
        with urllib.request.urlopen(req, timeout=15) as r:
            res = json.load(r).get("results", [])
    except Exception:
        return None, None
    if not res:
        return None, None
    best = res[0]
    cover = best.get("artworkUrl100")
    if cover:
        cover = re.sub(r"/\d+x\d+bb\.(jpg|png)", "/600x600bb.jpg", cover)
    return cover, best.get("description")


# ---------------------------------------------------------------------------
# Local markdown files (frontmatter + body)
# ---------------------------------------------------------------------------
FM_RE = re.compile(r"^---\n(.*?)\n---\n?(.*)$", re.DOTALL)


def slugify(title: str) -> str:
    s = re.sub(r"[^\w\s-]", "", title.lower()).strip()
    return re.sub(r"[\s_-]+", "-", s)[:60] or "book"


def yaml_dump(fm: dict) -> str:
    """Minimal, deterministic YAML for our flat frontmatter (no external dep)."""
    def scalar(v):
        if isinstance(v, bool):
            return "true" if v else "false"
        if isinstance(v, (int, float)):
            return str(v)
        s = str(v)
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

    lines = []
    for k, v in fm.items():
        if v is None or v == "":
            continue
        if isinstance(v, list):
            if not v:
                continue
            lines.append(f"{k}:")
            lines.extend(f"  - {scalar(i)}" for i in v)
        else:
            lines.append(f"{k}: {scalar(v)}")
    return "\n".join(lines)


def parse_local(path: Path) -> tuple[dict, str]:
    """Return (frontmatter_dict, body). Minimal reader for our own flat schema."""
    text = path.read_text(encoding="utf-8")
    m = FM_RE.match(text)
    if not m:
        return {}, text
    raw, body = m.group(1), m.group(2)
    fm, key = {}, None
    for line in raw.splitlines():
        if re.match(r"^\s+-\s", line):
            fm.setdefault(key, [])
            fm[key].append(_unquote(line.split("-", 1)[1].strip()))
        elif ":" in line:
            key, val = line.split(":", 1)
            key, val = key.strip(), val.strip()
            fm[key] = _unquote(val) if val else []
    return fm, body.strip()


def _unquote(v: str):
    if len(v) >= 2 and v[0] == v[-1] == '"':
        return v[1:-1].replace('\\"', '"').replace("\\\\", "\\")
    return v


def index_local() -> dict[str, Path]:
    """Map notionId -> file path for every existing library file."""
    idx = {}
    if not CONTENT_DIR.exists():
        return idx
    for f in CONTENT_DIR.glob("*.md"):
        fm, _ = parse_local(f)
        nid = fm.get("notionId")
        if nid:
            idx[nid] = f
    return idx


# ---------------------------------------------------------------------------
# PUSH: local notes -> Notion page body (managed section)
# ---------------------------------------------------------------------------
def push_notes(page_id: str, notes: str, commit: bool) -> str:
    """Replace the site-owned "Notes (from site)" section of the Notion page."""
    children = api("GET", f"/blocks/{page_id}/children?page_size=100").get("results", [])
    # Find our managed heading, delete it and everything after (site owns the tail).
    start = None
    for i, b in enumerate(children):
        if b["type"] == "heading_2" and _plain(b["heading_2"]["rich_text"]) == NOTES_HEADING:
            start = i
            break
    to_delete = [b["id"] for b in children[start:]] if start is not None else []
    if not notes and not to_delete:
        return "no-notes"
    if not commit:
        return f"would push notes ({len(notes)} chars, clears {len(to_delete)} block(s))"
    for bid in to_delete:
        api("DELETE", f"/blocks/{bid}")
    if notes:
        blocks = [{"object": "block", "type": "heading_2",
                   "heading_2": {"rich_text": [{"type": "text", "text": {"content": NOTES_HEADING}}]}}]
        for para in [p for p in notes.split("\n\n") if p.strip()]:
            blocks.append({"object": "block", "type": "paragraph",
                           "paragraph": {"rich_text": [{"type": "text", "text": {"content": para.strip()[:1900]}}]}})
        api("PATCH", f"/blocks/{page_id}/children", {"children": blocks})
    return "pushed" if notes else "cleared"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true", help="write files / Notion (default dry-run)")
    ap.add_argument("--push", action="store_true", help="also push local notes -> Notion bodies")
    ap.add_argument("--no-covers", action="store_true", help="skip OpenLibrary cover lookups")
    ap.add_argument("--no-synopsis", action="store_true", help="skip OpenLibrary synopsis lookups")
    ap.add_argument("--limit", type=int, default=0, help="process only first N books (safe first batch)")
    args = ap.parse_args()

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    local = index_local()
    pages = query_all_books()
    if args.limit:
        pages = pages[: args.limit]

    created = updated = unchanged = pushed = covers = synopses = pruned = 0
    seen = set()
    for page in pages:
        b = book_from_page(page)
        nid = b["notionId"]
        seen.add(nid)
        existing = local.get(nid)
        old_fm, body = (parse_local(existing) if existing else ({}, ""))

        auth = b["authors"][0] if b["authors"] else None

        # Cover: keep an existing one (upgrade rough -M/-S to -L); else Open Library.
        cover = old_fm.get("cover")
        if cover:
            cover = re.sub(r"-[MS]\.jpg$", "-L.jpg", cover)
        elif not args.no_covers:
            cover = fetch_cover(b["title"], auth)

        # Synopsis: keep an existing one; else Open Library (blank if no clean
        # description — never fabricated).
        synopsis = old_fm.get("synopsis")
        if not synopsis and not args.no_synopsis:
            synopsis = fetch_synopsis(b["title"], auth, cover)

        # iTunes/Apple Books second source fills what Open Library still missed.
        if (not cover and not args.no_covers) or (not synopsis and not args.no_synopsis):
            itc, itd = itunes_lookup(b["title"], auth)
            if not cover and not args.no_covers and itc:
                cover = itc
            if not synopsis and not args.no_synopsis and itd:
                d = _clean_desc(itd)
                if d and not _is_junk_desc(d):
                    synopsis = d

        if cover and not old_fm.get("cover"):
            covers += 1
        if synopsis and not old_fm.get("synopsis"):
            synopses += 1

        # Genres: Notion-owned, but UNION in any locally-added genres (e.g. Open
        # Library enrichment via enrich-genres-covers.py) so a pull never drops
        # them. Notion genres always kept; additive only.
        genres = list(b["genres"])
        for g in old_fm.get("genres", []):
            if g.lower() not in {x.lower() for x in genres}:
                genres.append(g)

        fm = {
            "title": b["title"],
            "authors": b["authors"],
            "genres": genres,
            "status": b["status"],
            "rating": b["rating"],
            "progress": b["progress"],
            "completed": b["completed"],
            "cover": cover,
            "synopsis": synopsis,
            "notionId": nid,
            "notionLastEdited": b["notionLastEdited"],
        }
        content = "---\n" + yaml_dump(fm) + "\n---\n"
        if body:
            content += "\n" + body + "\n"

        path = existing or (CONTENT_DIR / f"{slugify(b['title'])}.md")
        # Avoid slug collision with a DIFFERENT book.
        if not existing and path.exists():
            path = CONTENT_DIR / f"{slugify(b['title'])}-{nid[:8]}.md"

        if existing and existing.read_text(encoding="utf-8") == content:
            unchanged += 1
        else:
            action = "update" if existing else "create"
            print(f"  [{action}] {b['title']}  ({b['status']}{', ★'+str(b['rating']) if b['rating'] else ''})")
            if args.commit:
                path.write_text(content, encoding="utf-8")
            created += action == "create"
            updated += action == "update"

        if args.push and body:
            res = push_notes(nid, body, args.commit)
            if res.startswith(("pushed", "cleared", "would push")):
                pushed += 1
                print(f"    [notes->notion] {res}")

    # Prune orphans: delete local files whose Notion row no longer exists, so a
    # book removed in Notion drops off the shelf. Guarded — only on a FULL sync
    # (never under --limit, never if the query came back empty) so a transient
    # empty/partial result can't wipe the collection.
    if not args.limit and seen:
        for nid, path in local.items():
            if nid not in seen:
                print(f"  [prune] {path.name} (Notion row deleted)")
                pruned += 1
                if args.commit:
                    path.unlink()

    print(
        f"\nBooks: {len(pages)} | create {created} | update {updated} | "
        f"unchanged {unchanged} | covers +{covers} | synopsis +{synopses} | "
        f"pruned {pruned} | notes-pushed {pushed} | "
        f"{'COMMITTED' if args.commit else 'DRY-RUN (use --commit)'}"
    )


if __name__ == "__main__":
    main()
