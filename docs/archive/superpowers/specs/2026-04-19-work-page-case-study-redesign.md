# Work Page & Case Study Redesign

**Date:** 2026-04-19
**Status:** Approved

## Problem

The `/work` page buries case study content behind a toggle ("↓ case study"). A hiring manager scanning the page sees card summaries but has to click to reach the actual narrative — the most valuable signal for technical evaluators. The individual `/work/[slug]` pages exist but are hard to discover.

Additionally, the card layout carries redundant fields (`description` and `outcome` summary) that repeat information already in the case study narrative.

## Goals

- Case study content visible by default — no interaction required
- Cleaner card structure that leads with the story, not a summary of the story
- `/work/[slug]` pages remain as focused reading destinations, linkable from a resume or email
- Copy rhythm improved — `work` sections broken into shorter sentences

## Out of Scope

- Adding metrics/numbers to case studies (deferred spike — tracked in memory)
- Visual elements on slug pages (future work, structure leaves room for it)

---

## Design

### 1. Copy (`src/lib/copy.ts`)

Rewrite the `caseStudy.work` field for all four projects. Same content, better sentence rhythm — long run-on sentences broken into 2–3 punchy units. The `description` and `outcome` fields are kept in the data model (no deletion) as optional fallbacks.

**iCapital `work`:**

> Expanded translation support across the platform, covering both static UI copy and dynamic database-backed content using the Mobility gem. On the Nominee Investments project — a high-visibility initiative to unify several disparate nominee investment flows — co-designed and built a new Rails service to consolidate bulk processing for thousands of investments. Also drove the team's migration from Supernova v1 to v2, navigating breaking changes and coordinating with the library team when components needed fixes before the upgrade could proceed.

**Angi `work`:**

> On HomeAdvisor, worked in Vue and Java to unify the user quiz flow across the merging brands into a single Angi experience. On Handy, worked in Rails and React on professional assignment logic and job ingestion for Handy partner stores. On Angie's List, built out a CMS-driven content experience in Next.js — blog-style project descriptions with varied visual layouts. Along the way, took on a team of interns: coached them through real development workflows using a live use case — a Careers page revamp — and by the end they had something real to demo.

**Shell `work`:**

> Built a full-stack application that ingested oil platform data and determined the optimal, least-cost decommissioning path. Frontend in React with Ant Design, backend in Node. Worked onsite with the Shell Techworks team in Boston, using the Google Design Sprint process to rapidly iterate and arrive at a clear MVP scope — compressing months of potential back-and-forth into focused, structured sessions.

**Healthcasts `work`:**

> Built a new publishing pipeline around a headless CMS (Strapi) and a custom React rendering layer, dramatically reducing time-to-publish for their core medical consensus deliverable. Updated AWS infrastructure and migrated frameworks to current, supported versions. Then led a full authentication overhaul — unifying login across all their platforms with Auth0, moving to a single secure flow that also unblocked a parallel AI initiative dependent on a cleaner identity layer.

---

### 2. Work Card (`src/components/work-card.svelte`)

**Remove:**

- Expand/collapse toggle button and all associated state (`expanded`, `slide`/`fly` transitions)
- `description` paragraph
- `outcome` summary line (`↳ ...`)
- `variant` prop conditional rendering for the toggle row (keep `variant` for stack tag filter behavior — that's a separate concern)

**New card structure:**

1. Header row — `title` + `period` (unchanged)
2. Meta row — `role` (accent color) · stack tags inline (monospace, compact, same filter behavior) · `"full case study →"` link flush right (if `project.slug` exists)
3. Case study sections — `situation` / `work` / `outcome` always visible, no animation

**Meta row layout:**

```
Senior Engineer  ·  React · TypeScript · Node.js · Rails        full case study →
```

Role in accent color, tags in muted monospace, link right-aligned.

Stack tags in the meta row remain clickable filter buttons (same behavior as now, just repositioned — no style change to the button itself).

---

### 3. Slug Pages (`src/routes/work/[slug]/+page.svelte`)

**Change:** The `PageHeader` description line currently reads `"via MojoTech · {project.period}"`. Replace with `"{project.role} · {project.period}"` — surfaces the role instead of the agency attribution, which reads oddly as a standalone page.

Everything else unchanged: stack tags, situation/work/outcome sections, prev/next nav.

---

## File Changelist

| File                                  | Change                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/lib/copy.ts`                     | Rewrite `caseStudy.work` for all 4 projects                                               |
| `src/components/work-card.svelte`     | Remove toggle/expand, remove description+outcome, add meta row, case study always visible |
| `src/routes/work/[slug]/+page.svelte` | Replace "via MojoTech" with role in PageHeader description                                |
