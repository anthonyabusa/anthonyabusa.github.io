# anthonyabusa.com — Personal Site

Public-facing personal website + blog. Astro 6, deployed to GitHub Pages.
Read alongside `~/.claude/CLAUDE.md` (machine-level behavior). This is **not** metis-os —
do **not** apply metis-os operational mechanics here (no Hearth lane routing, no
tasks.json/lease lifecycle, no `ClaudeCode/memory/` standard). Those load only inside metis-os.

## Canonical clone (read first)
- **Work only in `~/code/anthonyabusa.github.io`.** This is the canonical checkout.
- The `~/dev/anthonyabusa.github.io` clone is a stale duplicate — do not edit it.
- Never work from a Google-Drive/iCloud-synced copy: cloud sync corrupts `.git`
  (EDEADLK, build reads stale bytes). This is why the repo was moved out of Drive.

## Stack & layout
- **Astro 6** + Tailwind (via `@tailwindcss/vite`) + `@astrojs/sitemap`. Site: `https://anthonyabusa.com`.
- `src/pages/` — routes · `src/content/` — blog (content collections, see `src/content.config.ts`)
  · `src/components/` · `src/layouts/` · `src/data/` · `src/styles/`.
- `public/` — static assets served as-is. `dist/` — build output (generated, don't edit).

## Commands
- `npm run dev` — local dev server.
- `npm run build` — production build (`astro build`).
- `npm run preview` — preview the built site.
- `npm run lint:copy` — copy/prose lint (`scripts/copy-lint.mjs`); CI runs this before build, so run it before pushing.

## Deploy
- GitHub Pages via `.github/workflows/deploy.yml` — auto-deploys on **push to `main` or `master`**
  (current branch is `master`) using `withastro/action`. No manual deploy step.
- Custom domain `anthonyabusa.com` is set in `astro.config.mjs` (`site:`) — DNS is on Cloudflare.
- A push to the default branch is a **live publish**. Treat it as external-facing: verify the
  build locally (`npm run build`) before pushing.

## Design & voice
- This is a marketing/portfolio surface — **motion is welcome** here. Do **not** import metis-os
  dashboard/workspace motion-restraint rules; those are scoped to internal tooling.
- Voice/writing: cite only Ant's own words for first-person claims; never present agent-drafted
  prose as his voice.
