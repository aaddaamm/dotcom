# Ops Lite Checks (Personal Site)

This site uses a lightweight reliability approach to avoid over-engineering.

## What runs automatically

### 1) Weekly Lighthouse quality check

- Workflow: `.github/workflows/lighthouse.yml`
- Also runs on PRs and pushes to `main`
- Checks SEO + accessibility with practical thresholds

### 2) Weekly broken-link check

- Workflow: `.github/workflows/link-check.yml`
- Uses `npm run check:links` (Linkinator) against `https://adamrobinson.tech`
- Skips `mailto:` and `tel:` links

## Why this is enough (for now)

- Catches UX/SEO regressions
- Catches broken internal/external links
- Minimal maintenance burden for a personal website

## Deferred intentionally

- API synthetic uptime checks
- Pager/alerting systems
- Detailed incident runbooks

If the site evolves into a product with stricter uptime expectations, expand checks from this baseline.
