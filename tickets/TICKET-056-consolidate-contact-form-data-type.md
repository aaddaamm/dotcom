# TICKET-056 — Consolidate Duplicate ContactFormData Type

**Status**: Done (email-templates.ts deleted per TICKET-051; validation.ts is the single source of truth)
**Priority**: Low
**Effort**: 15 min

## Description

`ContactFormData` is defined independently in both `validation.ts` and `email-templates.ts`. The two definitions diverge — `email-templates.ts` is missing the `project` field. One authoritative definition should be exported and re-used.

## Acceptance Criteria

- [ ] Keep `ContactFormData` in `validation.ts` as the single source of truth
- [ ] Update `email-templates.ts` to import from `$lib/validation` (or delete the file per TICKET-051)
- [ ] Ensure the contact API imports the type from `$lib/validation` only

## Notes

Completed: 2026-04-08

## Files

- `src/lib/validation.ts:8-16`
- `src/lib/email-templates.ts:3-9`
