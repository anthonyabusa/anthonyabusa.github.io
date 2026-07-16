#!/usr/bin/env python3
"""Local enrichment for the /library bookshelf, from Open Library (real data):

  1. Covers: fetch a cover for books that still have NONE (the first sync missed
     ~23, mostly on subtitle/format mismatches). Retries title+author, then a
     title-only search with the subtitle stripped. -L (high res). Still-blank
     books keep the typographic fallback tile.
  2. Genres: research each book's Open Library subjects and add real genres,
     preferring BISAC categories ("SELF-HELP / Personal Growth" -> Self-Help)
     which are broad + filter-friendly, falling back to plain topical subjects.
     UNION with the book's existing Notion genres — never drops your curation.

Touches only src/content/library/*.md (no Notion). sync-library.py mirrors the
merge so future Notion pulls preserve added genres + covers. Dry-run by default.
"""
from __future__ import annotations

import argparse
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "library"
UA = {"User-Agent": "anthonyabusa.com library sync (enrich)"}
FM_RE = re.compile(r"^---\n(.*?)\n---\n?(.*)$", re.DOTALL)

# Canonical genre vocabulary. OL subjects are noisy (foreign-language terms,
# hyper-specific topics, library metadata), so we keep ONLY subjects that map to
# a clean genre here — consistent + filter-friendly, no fabrication.
ALLOW = [
    "Fiction", "Fantasy", "Science Fiction", "Mystery", "Thriller",
    "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Short Stories",
    "Poetry", "Drama", "Classics", "Young Adult", "Graphic Novel", "Adventure",
    "Biography", "Memoir", "History", "Philosophy", "Psychology", "Sociology",
    "Self-Help", "Personal Development", "Business", "Economics", "Finance",
    "Leadership", "Entrepreneurship", "Management", "Marketing", "Politics",
    "Science", "Physics", "Biology", "Chemistry", "Mathematics", "Neuroscience",
    "Genetics", "Medicine", "Health", "Fitness", "Nutrition", "Technology",
    "Computer Science", "Artificial Intelligence", "Engineering", "Nature",
    "Ecology", "Religion", "Spirituality", "Theology", "Mindfulness", "Meditation",
    "Yoga", "Ethics", "Education", "Sports", "Travel", "Art", "Music", "True Crime",
    "Anthropology", "Gender Studies", "Survival", "War", "Essays", "Productivity",
    "Communication", "Relationships", "Parenting", "Creativity", "Sexuality",
]
_CANON = {g.lower(): g for g in ALLOW}
# Common Open Library / BISAC phrasings -> our canonical genre.
_ALIAS = {
    "business & economics": "Business", "self-help": "Self-Help", "self help": "Self-Help",
    "personal growth": "Personal Development", "psychology": "Psychology",
    "social science": "Sociology", "political science": "Politics", "computers": "Computer Science",
    "body, mind & spirit": "Spirituality", "health & fitness": "Health",
    "biography & autobiography": "Biography",
    "juvenile fiction": "Fiction", "science fiction & fantasy": "Science Fiction",
    "fantasy fiction": "Fantasy", "detective and mystery stories": "Mystery",
    "religion": "Religion", "philosophy": "Philosophy",
    "history": "History", "science": "Science", "fiction": "Fiction",
    "literary collections": "Essays", "family & relationships": "Relationships",
    "spiritual life": "Spirituality", "conduct of life": "Personal Development",
    "success": "Personal Development", "leadership": "Leadership", "economics": "Economics",
    "artificial intelligence": "Artificial Intelligence", "computer science": "Computer Science",
    "neurosciences": "Neuroscience", "physics": "Physics", "biology": "Biology",
    # iTunes / Apple Books genre names
    "self-improvement": "Self-Help", "business & personal finance": "Business",
    "health, mind & body": "Health", "biographies & memoirs": "Biography",
    "religion & spirituality": "Spirituality", "sci-fi & fantasy": "Science Fiction",
    "computers & internet": "Computer Science", "science & nature": "Science",
    "politics & current events": "Politics", "arts & entertainment": "Art",
    "history": "History", "fiction & literature": "Fiction", "romance": "Romance",
    "mysteries & thrillers": "Mystery", "sports & outdoors": "Sports",
    "professional & technical": "Technology", "travel & adventure": "Travel",
}


def _match_genre(raw: str) -> str | None:
    s = raw.strip().strip(".").strip()
    if "/" in s:                                     # BISAC "SELF-HELP / ..." -> top
        s = s.split("/")[0].strip()
    s = re.sub(r"\s*\([^)]*\)", "", s).strip()       # drop "(Psychology)" qualifiers
    key = s.lower()
    return _ALIAS.get(key) or _CANON.get(key)


def _get(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.load(r)


def _search(params: dict) -> list:
    try:
        return _get("https://openlibrary.org/search.json?" + urllib.parse.urlencode(params)).get("docs", [])
    except Exception:
        return []


def clean_genres(subjects, limit=3) -> list[str]:
    """Map noisy OL subjects to canonical genres; BISAC categories first."""
    bisac, plain, seen, out = [], [], set(), []
    for raw in subjects or []:
        g = _match_genre(raw)
        if not g:
            continue
        (bisac if "/" in raw else plain).append(g)
    for g in bisac + plain:
        if g.lower() not in seen:
            seen.add(g.lower())
            out.append(g)
        if len(out) >= limit:
            break
    return out


def ol_lookup(title: str, author: str | None, want_cover: bool):
    """Return (cover_url|None, [subjects]) from Open Library."""
    fields = "cover_i,subject"
    q = {"title": title, "limit": "5", "fields": fields}
    if author:
        q["author"] = author
    docs = _search(q)
    # cover-hungry books: broaden with a title-only, subtitle-stripped search
    if want_cover and not any(d.get("cover_i") for d in docs):
        base = re.split(r"[:\-–—]", title)[0].strip()
        docs = _search({"title": base or title, "limit": "5", "fields": fields}) or docs
    subjects = []
    for d in docs:
        subjects.extend(d.get("subject") or [])
        if len(subjects) > 40:
            break
    cover = None
    if want_cover:
        cid = next((d.get("cover_i") for d in docs if d.get("cover_i")), None)
        cover = f"https://covers.openlibrary.org/b/id/{cid}-L.jpg" if cid else None
    return cover, subjects


# --------------------------------------------------------------------------
# Second source: Google Books (covers + descriptions + categories) — fills the
# gaps Open Library leaves. Keyless volumes API.
# --------------------------------------------------------------------------
_BLURB_SRC = r"(Globe|Times|Post|Chronicle|Review|Journal|Weekly|Magazine|News|Herald|Guardian|Tribune|NPR|BookPage|Booklist|Kirkus)"


def clean_desc(desc) -> str:
    d = str(desc or "")
    d = re.sub(r"<[^>]+>", " ", d)                            # Google descriptions carry HTML
    d = re.split(r"\n\s*[-*_]{3,}", d)[0]
    d = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", d)
    d = re.sub(r"\*\*(.+?)\*\*", r"\1", d)
    d = re.sub(r"(?<!\w)\*(.+?)\*(?!\w)", r"\1", d)
    d = re.sub(r"From the [A-Za-z ]+ edition\.?", "", d)
    d = re.sub(r"[\w .'’-]{2,45}\bpdf\b", "", d, flags=re.I)
    d = re.sub(r"--\s*[A-Z][\w .'’&]+", "", d)
    d = d.replace("—", ", ").replace("–", "-")
    d = re.sub(r"\s*,\s*,", ",", d)
    d = re.sub(r"\s+", " ", d).strip().strip('"“”‘’ ')
    if len(d) > 600:
        cut = d[:600]
        dot = cut.rfind(". ")
        d = (cut[: dot + 1] if dot > 300 else cut).strip()
    return d


def is_junk_desc(d: str) -> bool:
    if len(d) < 40 or re.search(r"\bpdf\b", d, re.I):
        return True
    if re.search(_BLURB_SRC, d) and ('"' in d or "“" in d):
        return True
    return d.count('"') + d.count("“") + d.count("”") >= 4


def second_source(title: str, author: str | None):
    """Return (cover_url|None, [genres], description|None) from a source OTHER than
    Open Library. Primary: iTunes/Apple Books (keyless, reliable). Google Books is
    intentionally NOT used — its keyless endpoint hard-429s from this host."""
    term = title + ((" " + author) if author else "")
    try:
        res = _get("https://itunes.apple.com/search?" +
                   urllib.parse.urlencode({"term": term, "entity": "ebook", "limit": "3"})).get("results", [])
    except Exception:
        return None, [], None
    if not res:
        return None, [], None
    best = res[0]
    cover = best.get("artworkUrl100")
    if cover:                                                 # 100px -> 600px
        cover = re.sub(r"/\d+x\d+bb\.(jpg|png)", "/600x600bb.jpg", cover)
    return cover, best.get("genres") or [], best.get("description")


def _fm_value(fm: str, key: str) -> str:
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1) if m else ""


def _fm_list(fm: str, key: str) -> list[str]:
    m = re.search(rf"^{key}:\s*\n((?:\s+-\s*.*\n?)+)", fm, re.M)
    if not m:
        return []
    return [re.sub(r'^\s*-\s*"?|"?\s*$', "", ln).strip() for ln in m.group(1).splitlines() if ln.strip()]


def _write_list(fm: str, key: str, values: list[str]) -> str:
    block = f"{key}:\n" + "\n".join(f'  - "{v}"' for v in values)
    if re.search(rf"^{key}:", fm, re.M):
        return re.sub(rf"^{key}:\s*\n(?:\s+-\s*.*\n?)*", block + "\n", fm, flags=re.M)
    return re.sub(r"^(status:)", block + "\n" + r"\1", fm, flags=re.M, count=1)


def process(path: Path, commit: bool):
    text = path.read_text(encoding="utf-8")
    m = FM_RE.match(text)
    if not m:
        return "no-fm"
    fm, body = m.group(1), m.group(2)
    title = _fm_value(fm, "title")
    authors = _fm_list(fm, "authors")
    author = authors[0].replace("\n", " ").strip() if authors else None
    existing = _fm_list(fm, "genres")
    has_cover = bool(re.search(r"^cover:", fm, re.M))

    has_syn = bool(re.search(r"^synopsis:", fm, re.M))
    notes = []

    cover, subjects = ol_lookup(title, author, want_cover=not has_cover)
    candidates = clean_genres(subjects)

    # Second source: Google Books fills what Open Library missed (cover / synopsis
    # / thin genres).
    gdesc = None
    if (not has_cover and not cover) or (not has_syn) or (len(existing) < 3):
        gcover, gcats, gdesc = second_source(title, author)
        if not has_cover and not cover and gcover:
            cover = gcover
            notes.append("cover=alt")
        candidates = candidates + clean_genres(gcats)

    if not has_cover and cover and "cover=alt" not in notes:
        notes.append("cover=ol")
    if not has_cover and cover:
        fm = re.sub(r"^(notionId:)", f'cover: "{cover}"\n' + r"\1", fm, flags=re.M, count=1)

    if not has_syn and gdesc:
        d = clean_desc(gdesc)
        if d and not is_junk_desc(d):
            esc = d.replace("\\", "\\\\").replace('"', '\\"')
            fm = re.sub(r"^(notionId:)", f'synopsis: "{esc}"\n' + r"\1", fm, flags=re.M, count=1)
            notes.append("synopsis+")

    seen, add = {e.lower() for e in existing}, []
    for g in candidates:
        if g.lower() not in seen:
            seen.add(g.lower())
            add.append(g)
    add = add[: max(0, 5 - len(existing))]                    # cap total genres ~5
    if add:
        fm = _write_list(fm, "genres", existing + add)
        notes.append("genres+" + str(len(add)))

    if not notes:
        return "unchanged"
    new_text = f"---\n{fm}\n---\n" + (f"\n{body.strip()}\n" if body.strip() else "")
    if commit:
        path.write_text(new_text, encoding="utf-8")
    return ", ".join(notes) + f"  [{title}]"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--sleep", type=float, default=0.5)
    args = ap.parse_args()

    files = sorted(CONTENT_DIR.glob("*.md"))
    if args.limit:
        files = files[: args.limit]
    covers = genres = 0
    for i, f in enumerate(files, 1):
        res = process(f, args.commit)
        if "cover=" in res:
            covers += 1
        if "genres+" in res:
            genres += 1
        print(f"  [{i}/{len(files)}] {f.stem}: {res}")
        time.sleep(args.sleep)
    print(f"\nFiles {len(files)} | covers +{covers} | books-genre-enriched {genres} | "
          f"{'COMMITTED' if args.commit else 'DRY-RUN'}")


if __name__ == "__main__":
    main()
