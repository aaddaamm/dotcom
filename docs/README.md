# Docs Index

Internal documentation for operational checks, content workflow, and quality baselines.

## Files

- `accessibility-audit-2026-04-22.md`
  - Accessibility audit snapshot (automated + manual notes)
- `analytics-events.md`
  - Source of truth for custom analytics events and payload shapes
- `blog-workflow.md`
  - Blog frontmatter conventions + draft readiness process
- `ops-lite-checks.md`
  - Reliability checks run in GitHub Actions (Lighthouse + link checks)
- `performance-baseline-2026-04-22.md`
  - Core Web Vitals targets + bundle budget baseline

## Maintenance notes

- Date-stamped docs (`*-YYYY-MM-DD.md`) are snapshots and should be updated or superseded after major site changes.
- When adding/removing analytics events, update `analytics-events.md` in the same PR.
- When changing draft readiness rules, update `blog-workflow.md` in the same PR.
- When performance budgets change, update both workflow env values and `performance-baseline-*.md`.
