# Portfolio Site — Build Plan

**Engineer:** Aaron Mulandi
**PM:** Claude
**Ship date:** 14 days from start
**Budget:** ~20 hours (2 hrs/weekday, 5 hrs/weekend day)
**Definition of done:** Live at a real URL, Lighthouse ≥ 95 across the board, three projects posted, linked from LinkedIn and résumé.

---

## Ground rules

1. **Scope is frozen.** Four pages. Anything else goes in a `PARKED.md` file, not into this build.
2. **Deploy on day 2, not day 14.** A live broken site beats a perfect local one. Every push after that ships.
3. **Content before polish.** Write the project write-ups before you style them. If you style first you'll design around lorem ipsum and the real text will break it.
4. **Timebox design decisions to 10 minutes.** Pick, move on. You can adjust later; you can't get the hours back.
5. **Commit daily.** Your commit history is part of what recruiters see.

---

## Stack (decided — do not relitigate)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | You know it; static export; Vercel deploys free |
| Styling | Tailwind CSS | Fastest path from idea to layout |
| Content | MDX files in `/content` | No CMS to configure; projects are just files |
| Fonts | `next/font` with two families max | Zero layout shift, no CDN dependency |
| Hosting | Vercel | Free tier, auto-deploy on push, custom domain support |
| Analytics | Vercel Analytics (free tier) | Know whether recruiters actually visit |

**Deliberately excluded:** CMS, database, auth, i18n, dark mode toggle, animation libraries, component libraries. All of it is scope creep dressed as best practice.

---

## Milestone 1 — Skeleton live (Days 1–2, ~4 hrs)

**Goal:** A deployed URL with real navigation and no styling worth mentioning.

- [ ] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Push to a new public GitHub repo (`portfolio` or `aaronmulandi.com`)
- [ ] Connect repo to Vercel, confirm auto-deploy works
- [ ] Create four routes: `/`, `/work/[slug]`, `/about`, `/contact`
- [ ] Semantic HTML skeleton on each: one `<h1>`, real `<nav>`, `<main>`, `<footer>`
- [ ] Set metadata in `layout.tsx` — title, description, Open Graph tags

**Acceptance:** The URL loads. You can click between all four pages. It looks unstyled and that is correct.

**PM note:** If you spend more than 30 minutes on Vercel setup, something's misconfigured — check the build output rather than guessing.

---

## Milestone 2 — Content written (Days 3–4, ~4 hrs)

**Goal:** Every word on the site exists in a file. No lorem ipsum anywhere.

- [ ] Write EduAccess write-up (~400 words): problem, architecture, the fairness result, what you'd do differently
- [ ] Write invoicing system write-up (mark status honestly: *in progress*)
- [ ] Write third project write-up — or leave a placeholder card that says "in progress," which is honest
- [ ] Write the About page (~200 words). Reuse your LinkedIn About; cut the résumé language
- [ ] Write your one-line positioning statement for the homepage hero

**Acceptance:** Someone could read the site as plain text and understand what you build and why.

**PM note:** Each project write-up needs one number in it. A number is what separates a portfolio from a scrapbook.

---

## Milestone 3 — Design system (Days 5–6, ~4 hrs)

**Goal:** Type scale, colour palette, and spacing defined once in config, used everywhere.

- [ ] Pick two fonts: one for headings with character, one for body. Load via `next/font`
- [ ] Define a type scale in `tailwind.config` — 5 steps, no more
- [ ] Define a palette: one ground, one surface, one ink, one muted, one accent. Five values
- [ ] Define spacing rhythm — pick a base unit and stick to multiples
- [ ] Build the three primitives you'll reuse: `Section`, `ProjectCard`, `Chip`

**Acceptance:** No hardcoded hex values or font sizes anywhere outside the config.

**PM note:** Avoid the defaults — Inter on near-black with a neon accent is what every dev portfolio looks like. Pick something with a point of view. The HTML mockup I built uses IBM Plex on deep navy with amber; steal it or diverge deliberately, but choose.

---

## Milestone 4 — Homepage (Days 7–9, ~5 hrs)

**Goal:** The page that does 90% of the work.

- [ ] Hero: name, one-line positioning, primary CTA
- [ ] One signature element — the thing a visitor remembers. Interactive beats decorative
- [ ] Project cards, three of them, linking to detail pages
- [ ] Short skills section, grouped, no proficiency bars
- [ ] Footer with email, GitHub, LinkedIn, résumé link

**Acceptance:** A stranger can tell what you do within five seconds of landing.

**PM note:** The signature element is where you spend your creative budget. Everything else should be clean and quiet. One memorable thing beats five clever ones.

---

## Milestone 5 — Project pages (Days 10–11, ~3 hrs)

**Goal:** Detail pages that render from MDX.

- [ ] Set up MDX rendering for `/work/[slug]`
- [ ] Layout: title, status, stack chips, body, links to repo and demo
- [ ] Style code blocks and images consistently
- [ ] Add prev/next navigation between projects

**Acceptance:** Adding a new project means adding one file, nothing else.

---

## Milestone 6 — Fundamentals pass (Days 12–13, ~3 hrs)

**Goal:** This is the milestone that proves you have frontend fundamentals. Do not skip it.

**Responsive**
- [ ] Test at 375px, 768px, 1440px
- [ ] No horizontal scroll at any width
- [ ] Tap targets ≥ 44px on mobile

**Accessibility**
- [ ] Every image has meaningful `alt` (or `alt=""` if decorative)
- [ ] Colour contrast ≥ 4.5:1 for body text — check with a contrast tool
- [ ] Full keyboard navigation; visible `:focus-visible` styles
- [ ] Logical heading hierarchy, one `<h1>` per page
- [ ] Run axe DevTools, fix everything it flags

**Performance**
- [ ] Images via `next/image`, correctly sized, modern formats
- [ ] Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO
- [ ] Cumulative Layout Shift < 0.1
- [ ] `prefers-reduced-motion` respected on every animation

**Acceptance:** Screenshot your Lighthouse scores. If any are below 95, fix before shipping.

**PM note:** These checks are the actual deliverable. Anyone can make a site look decent; a 100 on accessibility tells an engineer you know what you're doing.

---

## Milestone 7 — Ship (Day 14, ~2 hrs)

- [ ] Buy a domain (~$12/yr), point it at Vercel
- [ ] Add favicon and Open Graph image — check the link preview in Slack or iMessage
- [ ] Write the repo README: what it is, stack, how to run it
- [ ] Add the URL to LinkedIn (Featured + Contact info) and to your résumé header
- [ ] Send it to two people for honest feedback

**Acceptance:** You'd be comfortable if a hiring manager opened it right now.

---

## Parked (v2 — not now)

Blog · dark mode toggle · view transitions · CMS · contact form backend · project filtering · case-study deep dives · testimonials

If you catch yourself building any of these before Day 14, stop.

---

## Risk register

| Risk | Mitigation |
|---|---|
| Design paralysis on days 5–6 | 10-minute timebox per decision. Copy the reference mockup if stuck |
| Scope creep | `PARKED.md`. Write the idea down, keep building |
| Only two real projects | Ship with two and an honest "in progress" third. Empty beats fake |
| Site launches, GitHub is empty | Push the portfolio repo itself, plus the invoicing system when done |
| This displaces the invoicing system | Hard 14-day stop. Invoicing resumes Day 15 |

---

## Sequencing note from your PM

This site is worth building, but it is **not** your highest-value project. The invoicing system is — it's the shipped backend evidence your résumé is missing, and no amount of portfolio polish substitutes for it.

So: 14 days here, hard stop, then back to invoicing. A beautiful site pointing at an empty GitHub is worse than a plain site pointing at two real systems.
