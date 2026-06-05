# Anthony Abusa Portfolio

Astro-powered personal portfolio for Anthony Abusa: consulting, entrepreneurship, projects, and writing.

Live site: https://anthonyabusa.github.io

## Stack

- Astro 6
- Tailwind CSS 4
- GitHub Pages deploy via GitHub Actions
- Node >= 22.12

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content map

- `src/pages/` — route pages
- `src/components/` — reusable UI cards, nav, footer, reveal behavior
- `src/data/projects.json` — project cards shown on home/projects
- `src/content/blog/` — Markdown blog posts
- `public/` — static assets

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml` and publishes to GitHub Pages.
