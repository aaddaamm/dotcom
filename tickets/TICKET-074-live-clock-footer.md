# TICKET-074 — Live Clock in Footer

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

Subtle live clock showing current New York time — `New York · 14:23:07` in mono. Ticking every second. Demonstrates the page is alive without adding noise.

## Acceptance Criteria

- [ ] Updates every second via `setInterval` in `onMount`
- [ ] Interval cleared in `onDestroy`
- [ ] Shows timezone label alongside time
- [ ] Mono font, muted color
- [ ] SSR-safe (initial value set client-side to avoid hydration mismatch)

## Notes

Completed: 2026-04-10

## Files

- `src/components/footer.svelte`
