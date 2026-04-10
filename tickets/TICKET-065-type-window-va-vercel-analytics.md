# TICKET-065 — Type window.va Vercel Analytics — Repeated Unsafe Cast

**Status**: Backlog
**Priority**: Low
**Effort**: 15 min

## Description

`contact-form.svelte` casts `window` to an inline anonymous type twice to access `window.va`. The type assertion is fragile and duplicated.

## Acceptance Criteria

- [ ] Add a `Window` interface augmentation to `src/app.d.ts` declaring `va?: { track: (event: string, params?: Record<string, string>) => void }`
- [ ] Remove both inline type casts from `contact-form.svelte`

## Files

- `src/app.d.ts`
- `src/components/contact-form.svelte`
