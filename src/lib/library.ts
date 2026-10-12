// Books vs research papers share one `library` collection (one Notion Books DB),
// but render on separate pages: /library (books) and /papers (papers).
//
// Classification survives the Notion sync because both inputs are repo-owned
// fields that scripts/sync-library.py preserves verbatim across a pull:
//   1. an explicit `kind` frontmatter override wins, then
//   2. any entry with a `sourceUrl` is a paper (the field exists only for
//      research-paper cards: arXiv abstract, DOI, author-hosted PDF).
import type { CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'library'>;

export function isPaper(entry: Entry): boolean {
  if (entry.data.kind) return entry.data.kind === 'paper';
  return Boolean(entry.data.sourceUrl);
}
