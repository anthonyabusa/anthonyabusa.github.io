#!/usr/bin/env python3
"""Refine /library synopses with the Hearth Qwen3 model:

  * REWRITE every existing synopsis into an intellectual yet warm, positive,
    inviting tone (the raw Open Library / iTunes copy is marketing boilerplate
    and sometimes clinical or negative). Grounded strictly in the source text —
    no invented facts, awards, or plot points.
  * CREATE a synopsis for books that still have none, from a public summary:
    retry Google Books (spaced to dodge the keyless 429), else fall back to the
    model's own knowledge WITH ABSTENTION (it returns NONE if unsure — never
    fabricated). Wikipedia REST is too title-sensitive for books, so skipped.

Output is dash-safe (site voice forbids em dashes) and length-bounded. Touches
only src/content/library/*.md. Dry-run by default; --commit to write.
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
QWEN = "http://100.82.81.93:8081/v1/chat/completions"
MODEL = "mlx-community/Qwen3.6-35B-A3B-4bit"
UA = {"User-Agent": "anthonyabusa.com library sync (refine)"}
FM_RE = re.compile(r"^---\n(.*?)\n---\n?(.*)$", re.DOTALL)

REWRITE_SYS = (
    "/no_think Rewrite the book description below in an intellectual yet warm, positive, "
    "inviting tone. 2-3 sentences, about 40-75 words. Focus on the book's ideas and what a "
    "reader gains from it. Stay strictly faithful to the source: do not invent facts, awards, "
    "authors, or plot points. Avoid clinical, bleak, or negative framing; frame growth and "
    "insight positively. Do NOT use em dashes. Return ONLY the rewritten synopsis, no preamble."
)
CREATE_SYS = (
    "/no_think Write an intellectual, warm, positive synopsis (2-3 sentences, about 40-75 words) "
    'of the book "{title}" by {author}. Focus on its ideas and value to a reader. Use only what '
    "you factually know about THIS specific book; never invent. Do NOT use em dashes. If you are "
    "not confident you know this exact book, reply with exactly: NONE"
)


def _get(url: str):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25) as r:
        return json.load(r)


def qwen(system: str, user: str, max_tokens: int = 220) -> str:
    payload = {
        "model": MODEL,
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "temperature": 0.2,
        "max_tokens": max_tokens,
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(QWEN, data=data, headers={**UA, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        out = json.load(r)
    return out["choices"][0]["message"]["content"]


def clean_out(s: str) -> str:
    s = re.sub(r"<think>.*?</think>", "", s, flags=re.S).strip()
    s = re.sub(r"^```[a-z]*\n?|\n?```$", "", s).strip()
    s = s.strip().strip('"“”').strip()
    s = s.replace("—", ", ").replace("–", "-")
    s = re.sub(r"\s*,\s*,", ",", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def google_desc(title: str, author: str | None) -> str | None:
    q = "intitle:" + title + ((" inauthor:" + author) if author else "")
    for attempt in range(3):
        try:
            items = _get("https://www.googleapis.com/books/v1/volumes?" +
                         urllib.parse.urlencode({"q": q, "maxResults": "3", "printType": "books"})).get("items", [])
            for it in items:
                d = it.get("volumeInfo", {}).get("description")
                if d and len(d) > 60:
                    return re.sub(r"<[^>]+>", " ", d)
            return None
        except Exception:
            time.sleep(2 + attempt * 3)
    return None


def _fm_value(fm: str, key: str) -> str:
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1) if m else ""


def _first_author(fm: str) -> str | None:
    m = re.search(r'^authors:\s*\n\s+-\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1).replace("\n", " ").strip() if m else None


def _set_synopsis(fm: str, text: str) -> str:
    esc = text.replace("\\", "\\\\").replace('"', '\\"')
    if re.search(r"^synopsis:", fm, re.M):
        return re.sub(r'^synopsis:.*$', f'synopsis: "{esc}"', fm, count=1, flags=re.M)
    return re.sub(r"^(notionId:)", f'synopsis: "{esc}"\n' + r"\1", fm, count=1, flags=re.M)


def process(path: Path, commit: bool) -> str:
    text = path.read_text(encoding="utf-8")
    m = FM_RE.match(text)
    if not m:
        return "no-fm"
    fm, body = m.group(1), m.group(2)
    title = _fm_value(fm, "title")
    author = _first_author(fm)
    existing = _fm_value(fm, "synopsis")

    if existing:
        new = clean_out(qwen(REWRITE_SYS, f"Title: {title}\nSource: {existing}"))
        tag = "rewrote"
    else:
        src = google_desc(title, author)
        if src:
            new = clean_out(qwen(REWRITE_SYS, f"Title: {title}\nSource: {src}"))
            tag = "created(google)"
        else:
            out = clean_out(qwen(CREATE_SYS.format(title=title, author=author or "an unknown author"), title))
            if out.strip().upper().strip(".") == "NONE" or len(out) < 40:
                return "no-source"
            new = out
            tag = "created(model)"

    if not new or len(new) < 40 or new.upper().startswith("NONE"):
        return "skip-badout"
    fm = _set_synopsis(fm, new)
    new_text = f"---\n{fm}\n---\n" + (f"\n{body.strip()}\n" if body.strip() else "")
    if commit:
        path.write_text(new_text, encoding="utf-8")
    return f"{tag}: {new[:70]}..."


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--only", default="")
    args = ap.parse_args()

    files = sorted(CONTENT_DIR.glob("*.md"))
    if args.only:
        wanted = set(args.only.split(","))
        files = [f for f in files if f.stem in wanted]
    elif args.limit:
        files = files[: args.limit]

    rw = cr = ns = 0
    for i, f in enumerate(files, 1):
        try:
            res = process(f, args.commit)
        except Exception as e:
            res = f"ERROR {type(e).__name__}: {str(e)[:80]}"
        rw += res.startswith("rewrote")
        cr += res.startswith("created")
        ns += res == "no-source"
        print(f"  [{i}/{len(files)}] {f.stem}: {res}")
    print(f"\nFiles {len(files)} | rewrote {rw} | created {cr} | no-source {ns} | "
          f"{'COMMITTED' if args.commit else 'DRY-RUN'}")


if __name__ == "__main__":
    main()
