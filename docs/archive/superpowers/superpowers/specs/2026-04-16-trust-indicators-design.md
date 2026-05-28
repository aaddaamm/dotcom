# Trust Indicators & Credentials — Design

**Ticket:** [#13 TICKET-021](https://github.com/aaddaamm/dotcom/issues/13)
**Date:** 2026-04-16
**Status:** Draft — awaiting review

## Purpose

Add professional credentials and technical trust signals aimed at hiring managers and engineering leads scanning the site. Supports the active site pivot from freelance-first positioning toward a technically-credible senior-engineer identity.

## Scope

Full treatment across two surfaces:

1. **Homepage** — light signals only. Upgrade the existing `hero-stats` block so its values are defensible rather than filler.
2. **`/hire`** — deep treatment. Add two new sections (philosophy + public activity) that give a hiring-manager audience both a voice-based and a technical-proof read on Adam.

Out of scope for this ticket: a dedicated `/about` page, conference talks or other external public work (none exists), photo styling decisions (handled later when a headshot is produced).

## Surfaces

### Homepage — upgraded metrics strip

**Location:** Replaces the existing `.hero-stats` block in `src/components/hero-section.svelte:20-33`.

**Visual:** Two-tier layout, reusing the mono/accent typography already in the hero.

- **Line 1 — numbers:** `10+` Years · `15+` Projects. Mono font, accent color on the numbers, muted small-caps label under each, matching the current `.stat-number` / `.stat-label` styling.
- **Line 2 — industries:** `fintech / healthcare / enterprise` in smaller muted mono text. Separator is `/`, rendered in a dim neutral (`color-mix` of `--color-muted` with background) to sit behind the word tokens.

**Rationale:** The current block shows "10+ Years / Full Stack / Team Lead" — the last two are filler. The proposed metrics are all defensible from existing `copy.ts` content:

- **10+ years** — matches the hero subhead claim.
- **15+ projects** — `selectedWork` (4) + `earlierWork` (4) + the distinct sub-projects called out inside the case studies (Nominee Investments, Supernova migration, i18n rollout at iCapital; HomeAdvisor quiz, Handy assignment logic, Angie's CMS at Angi; Healthcasts CMS + Auth0 overhaul). That's 13 named, with room for the `10+` caveat to cover unnamed ones. Safe ceiling.
- **Industries** — fintech (iCapital), healthcare (Healthcasts), enterprise (Shell, Angi) are the three strongest; the other four (insurance, edtech, automotive, home services) drop out of the hero strip to keep it tight and reappear naturally in `/work`.

**Accent budget:** Homepage keeps to the two-accent rule. Hero cursor mark + accent-dot elements (already present) + the metric numbers all share the same accent color and cluster in a single vertical region — reads as one accent "moment," not scattered.

### `/hire` — full treatment

**New section flow** (insertions marked NEW):

1. PageHeader _(unchanged)_
2. ServicesSection _(unchanged)_
3. **NEW: Philosophy section** — "How I work" heading
4. Technologies _(unchanged)_
5. **NEW: Public activity section** — "Public activity" heading
6. FaqSection _(unchanged)_
7. CTA _(unchanged)_

Rationale: Services answers "what do you do." Philosophy answers "how do you work" — placed before Technologies so the reader has a voice-based anchor before the technical proof cluster. Grouping both new sections back-to-back was rejected because it would feel grafted on.

#### Philosophy section

**Heading:** `How I work` with trailing accent-dot, matching other `/hire` section headings.

**Layout:** Two-column at ≥640px, stacks on mobile. Left: 56px circular headshot placeholder (see below). Right: paragraph copy.

**Headshot placeholder:** A circular element rendering the initials `AR` in the mono font, accent color on a muted fill. No image asset. If/when a headshot is produced later, the component accepts an image source and falls back to initials.

**Copy (draft, ~95 words):**

> The best engineers I've worked with weren't the ones with the strongest opinions — they were the ones who listened first. When I join a team, my job isn't to replace your culture, your patterns, or your conventions. It's to slot in, read the code before I write any, ask the questions a newcomer notices but regulars have stopped asking, and then ship reliably. I'd rather land one well-scoped change than three speculative ones. I treat every codebase as something other engineers will inherit from me — including the one I'm touching right now.

Copy lives in `$lib/copy.ts` as a new exported constant (e.g. `philosophy`) so it stays with the rest of the page content.

#### Public activity section

**Heading:** `Public activity` with trailing accent-dot.

**Layout:** Stat-block grid reusing the existing `stack-group` card pattern from the `/hire` Technologies section — same background gradient, border radius, padding, and typography. Three cards:

| Card | Label (mono uppercase accent) | Value                                               |
| ---- | ----------------------------- | --------------------------------------------------- |
| 1    | `Commits`                     | `314` — small muted label: _past year_              |
| 2    | `Repos`                       | `24` — small muted label: _public_                  |
| 3    | `Languages`                   | comma-separated list: TS, Svelte, Ruby, Elixir, C++ |

**Below the grid:** single accent-colored link → `https://github.com/aaddaamm` with arrow glyph, matching other accent links on the site.

**Data source:** runtime fetch from GitHub's GraphQL API, cached in Upstash Redis — same infrastructure pattern already established for Goodreads (see project_infrastructure memory). Rationale: values drift continuously; build-time hardcoding would lie; build-time fetch would require re-deploy to refresh. Upstash caching already has the env vars wired (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) and the `@upstash/redis` client available.

**Fetch surface:** new API route `src/routes/api/github/+server.ts` (mirroring the Goodreads pattern), loaded by a `+page.ts` or `+layout.server.ts` for `/hire`. Cache TTL: 24 hours. Data shape:

```ts
type GithubActivity = {
	commitsLastYear: number;
	publicRepos: number;
	languages: string[];
};
```

**Failure behavior:** if the fetch fails or cache is cold and API is unreachable, the section renders with the last-known cached value. If there is no cache at all, the section is omitted entirely rather than rendering placeholders — a silent degradation that avoids broadcasting "my site is broken."

## Data & content summary

| Content                            | Source                                                                      | Owner                                |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------------------------ |
| Homepage metric numbers (10+, 15+) | Hardcoded in `copy.ts`                                                      | Adam (review annually)               |
| Industry tags                      | Derived from `copy.ts` work list                                            | Automatic                            |
| Philosophy paragraph               | `copy.ts` exported constant                                                 | Drafted in this spec, Adam to revise |
| Headshot                           | Initials placeholder component                                              | Real photo deferred                  |
| GitHub stats                       | Upstash-cached GitHub GraphQL fetch                                         | Automatic, 24h TTL                   |
| GitHub languages list              | Curated subset of `copy.ts` tech stack intersected with GitHub API response | Automatic                            |

## Out of scope

- Producing or styling a real headshot photo
- Conference talks, podcasts, external articles — Adam confirmed none exists
- A `/about` page
- Contribution graph visualization (would be either an embedded image — stale — or a bespoke SVG — large effort, undersells the actual activity density)
- Pinned GitHub repos (current public repos are tutorial/learning-focused and would undersell senior work)

## Acceptance criteria mapping

| Ticket criterion                                                          | Addressed by                                                                                                                      |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Years of experience and projects completed count                          | Homepage metrics strip, `/hire` philosophy paragraph opens with "senior engineer" voice                                           |
| GitHub activity or tech stack expertise visually                          | `/hire` Public activity section (stat-block grid)                                                                                 |
| Professional headshot and personal story                                  | `/hire` Philosophy section — initials placeholder + ~95-word paragraph                                                            |
| Highlight open source contributions or public technical work if available | Languages range card acknowledges polyglot public work; blog already links from nav. External public work confirmed not to exist. |

## Risks

- **Headshot placeholder sitting indefinitely.** Mitigation: spec keeps the placeholder component flexible so swapping in a real photo is a one-line copy change. Note the deferral in the PR description.
- **Upstash cold start failure on first `/hire` render after cache expiry.** Mitigation: cache-stale-on-error — serve last-known value even if fetch fails mid-revalidation.
- **Accent overuse on `/hire`.** Mitigation: both new headings use the same accent-dot pattern already present on the page. No new accent tokens.
- **Philosophy copy tone mismatch.** Mitigation: draft is in the spec for Adam to revise before implementation ships.
