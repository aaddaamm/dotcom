# TICKET-080 — Consolidate Duplicate IntersectionObserver Factories

**Status**: Done
**Priority**: Medium
**Effort**: 30 min

## Description

`src/lib/animations.ts` exports `createScrollObserver` (lines 8-33) and `createElementObserver` (lines 36-67) which are 95% identical — same `prefersReducedMotion` check, same `IntersectionObserver` construction, same `entries.forEach` body, same return shape. The duplication creates drift risk.

## Acceptance Criteria

- [ ] A single factory function handles both use cases (parameterized if needed)
- [ ] All callers updated
- [ ] Behavior unchanged — animations still work
- [ ] Build passes

## Files

- `src/lib/animations.ts`
- Any files importing `createScrollObserver` or `createElementObserver`
