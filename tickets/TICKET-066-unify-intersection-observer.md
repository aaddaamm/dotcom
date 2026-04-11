# TICKET-066 — Unify IntersectionObserver Pattern — animations.ts vs Blog Post

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

Two separate IntersectionObserver implementations exist with different class names (`animate-in` vs `animated`) and different threshold/rootMargin values. The blog post page creates its own observer instead of using the utility in `animations.ts`.

## Acceptance Criteria

- [ ] Extend `animations.ts` with a configurable `createElementObserver(options)` factory (threshold, rootMargin, className all optional with sensible defaults)
- [ ] Replace the inline observer in `blog/[...slug]/+page.svelte` with the factory
- [ ] Confirm both use cases still animate correctly

## Files

- `src/lib/animations.ts`
- `src/routes/blog/[...slug]/+page.svelte`
