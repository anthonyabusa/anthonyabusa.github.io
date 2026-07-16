#!/usr/bin/env python3
"""One-time local backfill for the /library bookshelf. Touches ONLY the existing
src/content/library/*.md files (no Notion), so the diff stays focused:

  1. Cover res: upgrade Open Library cover URLs from -M.jpg / -S.jpg to -L.jpg
     (medium covers looked rough on the shelf; large is the same image, sharper).
  2. Synopsis: fetch each book's blurb from Open Library into the `synopsis`
     frontmatter field (matched to the SAME cover the file already uses, so we
     don't grab a different edition). Never fabricated: no OL description -> left
     blank. Only fills books that don't already have a synopsis.

sync-library.py carries the same logic so future Notion pulls preserve/extend it.
Dry-run by default; pass --commit to write. --limit N for a small first batch.
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

CONTENT_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "library"
UA = {"User-Agent": "anthonyabusa.com library sync (backfill)"}
FM_RE = re.compile(r"^---\n(.*?)\n---\n?(.*)$", re.DOTALL)
COVER_RE = re.compile(r'(https://covers\.openlibrary\.org/b/id/(\d+)-)(M|S|L)(\.jpg)')


def _get(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.load(r)


def _fm_value(fm: str, key: str) -> str | None:
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1) if m else None


def _fm_first_list(fm: str, key: str) -> str | None:
    # first "- item" under a "key:" line
    m = re.search(rf'^{key}:\s*\n(\s+-\s*"?.*)', fm, re.M)
    if not m:
        return None
    first = m.group(1).splitlines()[0]
    return re.sub(r'^\s*-\s*"?|"?\s*$', "", first).strip() or None


_BLURB_SRC = r"(Globe|Times|Post|Chronicle|Review|Journal|Weekly|Magazine|News|Herald|Guardian|Tribune|NPR|BookPage|Booklist|Kirkus)"


def clean_desc(desc) -> str:
    if isinstance(desc, dict):
        desc = desc.get("value", "")
    d = str(desc or "")
    d = re.split(r"\n\s*[-*_]{3,}", d)[0]                    # cut "----" source separators
    d = re.sub(r"\(\[source\]\[\d+\]\).*", "", d, flags=re.S)  # OL "([source][1])" cruft
    d = re.sub(r"^\s*\[\d+\]:\s*http\S+.*$", "", d, flags=re.M)  # ref-link definitions
    d = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", d)            # markdown links -> text
    d = re.sub(r"\*\*(.+?)\*\*", r"\1", d)                    # bold -> text
    d = re.sub(r"(?<!\w)\*(.+?)\*(?!\w)", r"\1", d)           # italics -> text
    d = re.sub(r"__(.+?)__", r"\1", d)
    d = re.sub(r"From the [A-Za-z ]+ edition\.?", "", d)       # "From the Trade Paperback edition."
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


def looks_like_junk(d: str) -> bool:
    """Reject marketing-blurb / review-quote 'descriptions' — blank beats junk."""
    if len(d) < 40:
        return True
    if re.search(r"\bpdf\b", d, re.I):
        return True
    if re.search(_BLURB_SRC, d) and ('"' in d or "“" in d):
        return True
    if d.count('"') + d.count("“") + d.count("”") >= 4:       # quote-stacked blurbs
        return True
    return False


def fetch_synopsis(title: str, author: str | None, cover_id: str | None) -> str | None:
    q = {"title": title, "limit": "5", "fields": "key,cover_i"}
    if author:
        q["author"] = author
    try:
        docs = _get("https://openlibrary.org/search.json?" + urllib.parse.urlencode(q)).get("docs", [])
    except Exception:
        return None
    if not docs:
        return None
    doc = None
    if cover_id:
        doc = next((d for d in docs if str(d.get("cover_i")) == str(cover_id)), None)
    doc = doc or docs[0]
    key = doc.get("key")
    if not key:
        return None
    try:
        work = _get(f"https://openlibrary.org{key}.json")
    except Exception:
        return None
    d = clean_desc(work.get("description", ""))
    if not d or looks_like_junk(d):
        return None
    return d


def yaml_q(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def process(path: Path, commit: bool) -> str:
    text = path.read_text(encoding="utf-8")
    m = FM_RE.match(text)
    if not m:
        return "no-frontmatter"
    fm, body = m.group(1), m.group(2)
    notes = []
    cover_id = None

    # 1) cover res upgrade
    cm = COVER_RE.search(fm)
    if cm:
        cover_id = cm.group(2)
        if cm.group(3) != "L":
            fm = fm[: cm.start()] + cm.group(1) + "L" + cm.group(4) + fm[cm.end():]
            notes.append("cover->L")

    # 2) synopsis (only if absent)
    if not re.search(r"^synopsis:", fm, re.M):
        title = _fm_value(fm, "title") or ""
        author = _fm_first_list(fm, "authors")
        syn = fetch_synopsis(title, author, cover_id)
        if syn:
            lines = fm.split("\n")
            out = []
            for ln in lines:
                if ln.startswith("notionId:"):
                    out.append(f"synopsis: {yaml_q(syn)}")
                out.append(ln)
            fm = "\n".join(out)
            notes.append(f"synopsis({len(syn)}c)")
        else:
            notes.append("no-synopsis")

    if not notes or notes == ["no-synopsis"]:
        return "unchanged" if not notes else "no-synopsis"

    new_text = f"---\n{fm}\n---\n" + (f"\n{body.strip()}\n" if body.strip() else "")
    if commit and new_text != text:
        path.write_text(new_text, encoding="utf-8")
    return ", ".join(notes)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--sleep", type=float, default=0.6)
    args = ap.parse_args()

    files = sorted(CONTENT_DIR.glob("*.md"))
    if args.limit:
        files = files[: args.limit]

    stats = {"cover": 0, "synopsis": 0, "no-synopsis": 0, "unchanged": 0}
    for i, f in enumerate(files, 1):
        res = process(f, args.commit)
        if "cover->L" in res:
            stats["cover"] += 1
        if "synopsis(" in res:
            stats["synopsis"] += 1
        if res == "no-synopsis":
            stats["no-synopsis"] += 1
        if res == "unchanged":
            stats["unchanged"] += 1
        print(f"  [{i}/{len(files)}] {f.stem}: {res}")
        # only sleep when we actually hit the network (synopsis lookup)
        if "synopsis" in res or res == "no-synopsis":
            time.sleep(args.sleep)

    print(
        f"\nFiles {len(files)} | covers->L {stats['cover']} | synopsis +{stats['synopsis']} | "
        f"no-OL-desc {stats['no-synopsis']} | {'COMMITTED' if args.commit else 'DRY-RUN (use --commit)'}"
    )


if __name__ == "__main__":
    main()
