# Portfolio — aaronmulandi

Personal portfolio and engineering write-ups.
Live at **https://my-portfolio-delta-sable-23.vercel.app**

## What this is

Four pages — home, work, about, contact — built to be fast, accessible, and
honest about what is finished and what isn't. Project write-ups live as Markdown
files and render themselves; the homepage carries an interactive simulation of
the bandwidth-fairness problem from the EduAccess project.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 — CSS-first tokens in `app/globals.css` |
| Content | Markdown with frontmatter in `content/` |
| Fonts | IBM Plex Sans / Condensed / Mono via `next/font` |
| Hosting | Vercel, auto-deploying from `main` |

No CMS, no database, no auth, no component library. Deliberately.

## Running it

The app lives in `my-portfolio/`, not at the repo root.

```bash
cd my-portfolio
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # typecheck
```

## Adding a project

Add one file. Nothing else.

```bash
touch my-portfolio/content/my-project.md
```

```markdown
---
title: My Project
status: in-progress          # in-progress | live | shipped
year: 2026
summary: One sentence for the card on the homepage.
stack: [Python, PostgreSQL]
repo: https://github.com/...  # optional
metrics: [99.9%|uptime, 40ms|p99 latency]   # optional, only if measured
---

## The problem
...
```

`generateStaticParams` picks it up, prerenders `/work/my-project`, and the
homepage card appears. The metrics row renders only when `metrics` is present —
an absent number beats an invented one.

## Layout

```
docs/                       build plan, design system, drafting material
my-portfolio/
  app/
    components/             Section, Chip, ProjectCard, Markdown, LinkContention
    globals.css             the entire design system — nine colours, five type steps
    work/[slug]/            project pages, prerendered per content file
  content/                  Markdown sources for every page
  lib/projects.ts           frontmatter reader
```

## Conventions

- **No hardcoded colours or font sizes outside `globals.css`.** Everything is a
  token; a hex code in a component is a bug.
- **Every interactive element** carries a visible `:focus-visible` ring and a
  44px minimum tap target.
- **No unmeasured numbers.** Targets are labelled as targets, simulations as
  simulations.

Lighthouse on the production build: 98–100 performance, 100 accessibility, 100
best practices, 100 SEO, CLS 0.
