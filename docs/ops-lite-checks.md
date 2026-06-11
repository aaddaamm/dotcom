# Ops Lite Checks (Personal Site)

This site uses a lightweight reliability approach to avoid over-engineering.

## What runs automatically

### 1) Lighthouse SEO + accessibility gate

- Workflow: `.github/workflows/lighthouse.yml`
- Runs on PRs, pushes to `main`, weekly, and manual dispatch
- Builds the site, starts Vite preview, then runs `npm run check:lighthouse`
- Audits `/`, `/blog`, `/work`, `/hire`, `/contact`, `/play`, and `/terminal`
- Requires accessibility >= 96% on all audited routes
- Requires SEO = 100% except `/terminal`, which is intentionally `noindex` and not SEO-gated
- Uploads JSON reports as the `lighthouse-reports` artifact

### 2) Client bundle budget gate

- Workflow: `.github/workflows/performance-budget.yml`
- Runs on PRs and pushes to `main`
- Builds the site, then runs `npm run check:bundle-budget`
- Enforces default budgets from `scripts/bundle-budget-check.mjs`, overridden in CI by workflow env vars

### 3) Weekly broken-link check

- Workflow: `.github/workflows/link-check.yml`
- Runs weekly and manual dispatch
- Uses `npm run check:links` (Linkinator) against `https://adamrobinson.tech`
- Skips `mailto:`, `tel:`, LinkedIn, and Instagram links

## Why this is enough (for now)

- Catches UX/SEO regressions
- Catches bundle-size regressions before deploy
- Catches broken internal/external links
- Minimal maintenance burden for a personal website

## Deferred intentionally

- API synthetic uptime checks
- Pager/alerting systems
- Detailed incident runbooks

If the site evolves into a product with stricter uptime expectations, expand checks from this baseline.
