# Performance Baseline — 2026-04-22

Last verified: 2026-06-10

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

Current CI budgets:

- Total client JS: `240000` bytes
- Largest JS chunk: `100000` bytes
- Total client CSS: `65000` bytes
- Largest CSS chunk: `34000` bytes

Local script defaults match these values unless overridden with `BUDGET_TOTAL_JS`, `BUDGET_SINGLE_JS`, `BUDGET_TOTAL_CSS`, or `BUDGET_SINGLE_CSS`.

Script:

- `npm run check:bundle-budget`
- Implementation: `scripts/bundle-budget-check.mjs`

## Current baseline snapshot (latest local build)

Measured after `npm run build && npm run check:bundle-budget` on 2026-06-10.

- JS total: `234758` bytes (~229.3 KiB)
- Largest JS chunk: `96138` bytes (~93.9 KiB)
- CSS total: `63905` bytes (~62.4 KiB)
- Largest CSS chunk: `33537` bytes (~32.8 KiB)

## Follow-up

- Revisit budgets after major feature additions
- If a budget fails, reduce bundle size or intentionally raise threshold with rationale in PR
