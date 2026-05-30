# Case Study Dedicated Pages — Design Spec

_2026-04-18_

## Overview

Add dedicated case study pages at `/work/[slug]` for the four main engagements (iCapital, Angi, Shell, Healthcasts). The content already exists in `copy.ts`; this is a presentation and routing change.

All four clients were engagements during Adam's time at MojoTech. Attribution is handled via a light "via MojoTech · [period]" byline — present on each page but not the focus.

---

## Data

`selectedWork` in `src/lib/copy.ts` gains a `slug` field on each entry:

| Company     | Slug          |
| ----------- | ------------- |
| iCapital    | `icapital`    |
| Angi        | `angi`        |
| Shell       | `shell`       |
| Healthcasts | `healthcasts` |

No other data changes. The existing `caseStudy.situation`, `caseStudy.work`, and `caseStudy.outcome` strings are used as-is.

---

## Routing

**`src/routes/work/[slug]/+page.ts`**

- Loads the case study entry from `selectedWork` by matching `params.slug`
- Throws `error(404)` for unrecognised slugs
- Returns the matched entry and its index (for prev/next navigation)

**`src/routes/work/[slug]/+page.svelte`**

- Renders the full case study page (see layout below)

---

## Case Study Page Layout

**Navigation (top):**
`← back to work` link above the `PageHeader`.

**Header:**

- Title: `{company} — {role}` (e.g., "iCapital — Fintech Platform Engineering")
- Description: `via MojoTech · {period}` (e.g., "via MojoTech · 2024–present")

**Stack tags:** Displayed below the header, non-interactive (no filter behaviour on this page).

**Content sections:** Three full-width prose blocks, each with a mono uppercase label and body text:

1. `situation`
2. `work`
3. `outcome`

Styling follows the existing `cs-label` / `cs-body` pattern from `work-card.svelte`, scaled up for a full-page context (larger body font, more vertical spacing).

**Navigation (bottom):**
Prev/next links ordered by `selectedWork` array order. Shows company name only (e.g., `← Angi` / `Healthcasts →`). First/last entries omit the missing direction.

**SEO:**
`SeoHead` with:

- Title: `"{Company} Case Study — Adam Robinson"`
- Description: text of `caseStudy.situation` up to and including the first `.`
- Path: `/work/{slug}`

---

## Work Card Changes

`src/components/work-card.svelte`:

- `WorkItem` interface gains optional `slug?: string`
- Toggle row gets a second element: `<a href="/work/{slug}" class="case-study-link">full case study →</a>`
- Link only renders when `slug` is present
- Existing `↓ case study` inline toggle is preserved

---

## Out of Scope

- No additional content sections beyond situation / work / outcome
- No markdown files — content stays in `copy.ts`
- No per-page customisation — one shared template for all four
