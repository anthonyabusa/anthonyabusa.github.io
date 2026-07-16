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

    cover, subjects = ol_lookup(title, author, want_cover=not has_cover)
    notes = []

    if not has_cover and cover:
        fm = re.sub(r"^(notionId:)", f'cover: "{cover}"\n' + r"\1", fm, flags=re.M, count=1)
        notes.append("cover+")

    ol_genres = clean_genres(subjects)
    add = [g for g in ol_genres if g.lower() not in {e.lower() for e in existing}]
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
        if "cover+" in res:
            covers += 1
        if "genres+" in res:
            genres += 1
        print(f"  [{i}/{len(files)}] {f.stem}: {res}")
        time.sleep(args.sleep)
    print(f"\nFiles {len(files)} | covers +{covers} | books-genre-enriched {genres} | "
          f"{'COMMITTED' if args.commit else 'DRY-RUN'}")


if __name__ == "__main__":
    main()
