# TICKET-078 — Delete Dead Code: validation.ts + design-tokens.ts

**Status**: Done
**Priority**: Medium
**Effort**: 15 min

## Description

Two files contain code that is never imported anywhere:

1. **`src/lib/validation.ts`** exports `sanitizeInput`, `sanitizeContactForm`, and `validatePhone` — none are imported anywhere in the codebase. `sanitizeContactForm` is actively dangerous as dead code: a future dev could reach for it, assume it sanitizes correctly, and miss that it only strips `<>` with no length cap or email re-validation. The contact endpoint reimplements its own sanitization inline.

2. **`src/lib/design-tokens.ts`** — zero importers, entirely dead.

## Acceptance Criteria

- [ ] `src/lib/design-tokens.ts` deleted
- [ ] Unused exports removed from `src/lib/validation.ts` (`sanitizeInput`, `sanitizeContactForm`, `validatePhone`) — or entire file deleted if nothing remains
- [ ] Grep confirms no remaining imports of deleted exports
- [ ] Build passes

## Files

- `src/lib/validation.ts`
- `src/lib/design-tokens.ts`
