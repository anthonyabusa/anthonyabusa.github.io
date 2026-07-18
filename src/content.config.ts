import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

// Library / bookshelf. Structured book records synced from the Notion "Books"
// DB by scripts/sync-library.py (one .md file per book; frontmatter = the
// Notion-owned catalog fields, body = repo-owned reading notes pushed back to
// Notion). Notion owns the catalog; the repo owns published notes. Each field
// has exactly one authoritative side, so the two-way sync never clobbers.
const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    genres: z.array(z.string()).default([]),
    // 'read' | 'reading' | 'want' (mapped from the Notion Status select).
    status: z.enum(['read', 'reading', 'want']).default('want'),
    rating: z.number().min(1).max(5).optional(),
    progress: z.number().optional(),
    completed: z.coerce.date().optional(),
    cover: z.string().optional(),
    // Short book blurb for the detail page. Optional: populated later (e.g. from
    // Open Library); the page hides the section when absent so it's never fabricated.
    synopsis: z.string().optional(),
    // Objective key points extracted from the source (e.g. a research paper). Shown
    // in a dedicated "Key takeaways" section, kept separate from the first-person
    // Reflections (body) so a summary is never presented as Ant's own notes.
    takeaways: z.array(z.string()).default([]),
    notionId: z.string(),
    notionLastEdited: z.string().optional(),
  }),
});

export const collections = { blog, library };
