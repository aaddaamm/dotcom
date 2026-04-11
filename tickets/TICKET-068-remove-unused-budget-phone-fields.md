# TICKET-068 — Remove Unused `budget` and `phone` Fields from ContactFormData

**Status**: Done
**Priority**: Low
**Effort**: 15 min

## Description

`ContactFormData` in `validation.ts` declares optional `budget` and `phone` fields. Neither appears in the contact form component or is read by the contact API. Dead type surface.

## Acceptance Criteria

- [ ] Confirm `budget` and `phone` are not used anywhere (grep)
- [ ] Remove them from the `ContactFormData` interface
- [ ] Verify `npm run check` passes

## Files

- `src/lib/validation.ts`
