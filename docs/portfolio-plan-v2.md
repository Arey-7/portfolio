# Portfolio v2 — Build Plan

**Engineer:** Aaron Mulandi
**Starts:** 2026-09-17, with v1 shipped and Milestones 1–7 closed
**Budget:** ~10 hours
**Definition of done:** No dead ends, no duplicated styling, the design system
fully realised, and Lighthouse still ≥ 95 / 100 / 100 / 100.

---

## What v1 left behind

v1 froze scope to four pages and hit every acceptance test. Three kinds of debt
survived it:

1. **Structural gaps.** "Work" in the nav links to a single hardcoded project.
   There is no work index. The 404 is stock Next.js. There is no sitemap.
2. **Design-system debt.** The doc specifies seven primitives; three were built.
   The focus-ring class string is copy-pasted a dozen times. Scroll reveal is
   specified and unimplemented.
3. **Depth.** The design doc calls a three-number metrics row mandatory. No page
   has one, because nothing has been measured.

---

## Ground rules

1. **No new pages that need content you don't have.** A blog is a commitment to
   write; an empty blog is worse than no blog.
2. **Lighthouse is a gate, not a goal.** Any change that drops a score below the
   v1 numbers gets reverted, not excused.
3. **Every primitive extracted must remove duplication that already exists.**
   Abstraction ahead of a second use case is speculation.
4. **The 14-day stop still applies.** This is v1's leftover budget, not a new
   project. Day 14 remains the hard stop before the invoicing system resumes.

---

## Milestone V1 — Structural gaps (~3 hrs)

**Goal:** No route on the site is a dead end or a placeholder.

- [ ] `/work` index page listing every project, reading from `content/`
- [ ] Nav "Work" points at `/work`, not at one hardcoded slug
- [ ] Branded `not-found.tsx` using the design system
- [ ] `sitemap.ts` and `robots.ts` via Next's file conventions

**Acceptance:** Every nav item lands on a real page. `/sitemap.xml` lists all
routes. A bad URL renders the site's own 404, not Next's.

---

## Milestone V2 — Finish the design system (~4 hrs)

**Goal:** The seven primitives exist, and no styling is copy-pasted.

- [ ] Extract `Button` — two variants only, primary (solid amber) and secondary
      (outlined), replacing the duplicated CTA markup on home and contact
- [ ] Extract `StatusPill` from `ProjectCard` and the project page, which
      currently duplicate the same status-label map
- [ ] Hoist the repeated `focus-visible:…` string into one shared constant or a
      CSS utility class
- [ ] Implement scroll reveal to the doc's spec: opacity 0→1, translateY
      14px→0, 600ms, once only, `prefers-reduced-motion` respected

**Acceptance:** `grep -c "focus-visible:outline-link"` returns one definition,
not a dozen. No two files define the same status labels.

---

## Milestone V3 — Case-study depth (~3 hrs)

**Goal:** The project pages do what the design doc says they should.

- [ ] Metrics row populated for at least one project — **requires real measured
      numbers, which do not exist yet**
- [ ] "What I'd do differently" as an explicit section in each case study
- [ ] Table of contents on long project pages

**Blocked:** the metrics row cannot ship honestly until the EduAccess JFI
harness runs against real hardware. Until then this milestone is two-thirds.

---

## Deliberately not doing

| Parked item | Why not |
|---|---|
| Project filtering | Two projects. Filtering sorts nothing. |
| Blog | A content commitment, not a feature. Empty is worse than absent. |
| Testimonials | You don't have any. Inventing them is the 0.93 problem again. |
| CMS | The content is three Markdown files. |
| Contact form backend | A visible email address already works, with no spam surface. |
| Dark mode toggle | The design commits to one dark palette. A light mode means designing a second nine-value palette and re-auditing every contrast pair. |
| View transitions | Revisit only after V1 and V2 land, and only if it costs no Lighthouse points. |

---

## The standing note from v1

This is still not your highest-value project. The invoicing system and the
EduAccess reconciler bug are. v2 is worth ten hours because the site is the
thing recruiters open first — not because it outranks shipping real systems.

Four labels on this site still read "in progress" or "pending deployment". The
fastest way to improve the portfolio remains changing those to "shipped".
