# Professional Positioning, SEO, and Copy Audit — 2026-08-23

## Verified technical baseline

- `npm run check:seo` crawled 15 sitemap routes, reported SEO 100, and passed score budgets.
- Existing canonical, Open Graph, robots, sitemap, and JSON-LD implementation is present.

## Copy findings

- Homepage repeats full-time/contract audience labels and CTAs before showing enough evidence.
- `/hire` mixes senior/staff role positioning with local-service wording and makes consulting read broader than intended.
- `/work` has strong source material but case-study outcomes and decision context should lead the scan path.

## Remediation map

| Route          | Search/user intent                              | Planned change                                                                  |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- |
| `/`            | Senior/staff engineering ownership              | New evidence-led hero and proof sequence                                        |
| `/hire`        | Full-time fit and selective embedded consulting | Clarify role fit, commercial selectivity, and factual local/remote availability |
| `/work`        | Case-study evidence                             | Lead with constraints, contribution, and results                                |
| `/work/[slug]` | Named-project proof                             | Strengthen title, meta description, and engineering trace                       |

## Post-change verification

| Check | Result | Evidence |
| --- | --- | --- |
| Unit tests | PASS | `npm run test` — 19 files, 57 tests |
| Formatting and lint | PASS | `npm run lint` |
| Svelte and TypeScript | PASS | `npm run check` — 0 errors, 0 warnings |
| Production build | PASS | `npm run build` |
| Bundle budget | PASS | `npm run check:bundle-budget` — JS 235,761 bytes; CSS 64,964 bytes |
| SEO crawl | PASS | `npm run check:seo` — 15 sitemap routes and configured score budgets |

## Manual review

- Rendered `/`, `/hire`, `/work`, `/work/icapital`, `/work/angi`, `/work/shell`, and `/work/healthcasts` at 1440×1200 and 390×844 in light and dark themes (28 route/theme/viewport combinations).
- Reviewed the homepage, hire page, work index, and Healthcasts case-study layouts. The evidence sequence is readable without motion, and the Healthcasts weeks-to-days outcome is visible in the case-study scan path.
- Browser checks confirmed a title, meta description, canonical URL, expected theme, and focusability for visible links, buttons, and inputs in every rendered combination. Reduced-motion mode left the engineering trace visible with a 0.00001-second computed transition duration.
- No testimonial was added. An optional colleague testimonial request remains editorial follow-up pending explicit MojoTech approval.
