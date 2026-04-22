# Performance Baseline — 2026-04-22

## Route-level targets (mobile-focused)

Primary routes:

- `/`
- `/blog`
- `/work`
- `/hire`

Targets:

- **LCP**: <= 2.5s (good), stretch <= 2.0s
- **INP**: <= 200ms (good), stretch <= 150ms
- **CLS**: <= 0.1 (good), stretch <= 0.05

Notes:

- These are field targets (Core Web Vitals), not just lab metrics.
- Continue using Lighthouse as a guardrail, but prioritize RUM trends in Vercel analytics.

## CI bundle guardrails

A bundle-budget check runs in CI (`.github/workflows/performance-budget.yml`) after build.

Current default budgets:

- Total client JS: `220000` bytes
- Largest JS chunk: `100000` bytes
- Total client CSS: `60000` bytes
- Largest CSS chunk: `30000` bytes

Script:

- `npm run check:bundle-budget`
- Implementation: `scripts/bundle-budget-check.mjs`

## Current baseline snapshot (latest local build)

- JS total: ~190 KB
- Largest JS chunk: ~85 KB
- CSS total: ~50 KB
- Largest CSS chunk: ~28 KB

## Follow-up

- Revisit budgets after major feature additions
- If a budget fails, reduce bundle size or intentionally raise threshold with rationale in PR
