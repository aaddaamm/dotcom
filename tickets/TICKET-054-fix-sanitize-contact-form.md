# TICKET-054 — Fix sanitizeContactForm Dropping project Field

**Status**: Done
**Priority**: Low
**Effort**: 15 min

## Description

`sanitizeContactForm` in `validation.ts` returns an object that omits the `project` field. It isn't called server-side today (the contact API has its own sanitization), but if it ever is, `project` silently disappears from the submission.

## Acceptance Criteria

- [ ] Add `project: data.project ? sanitizeInput(data.project) : undefined` to the return value in `sanitizeContactForm`
- [ ] Verify all fields round-trip correctly through the function

## Notes

Completed: 2026-04-08

## Files

- `src/lib/validation.ts:65-73`
