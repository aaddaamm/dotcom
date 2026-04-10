# TICKET-055 — Consolidate Email Validation — Remove Duplicate Regex

**Status**: Done
**Priority**: Low
**Effort**: 15 min

## Description

The contact API (`+server.ts:58-61`) duplicates the email regex instead of importing `validateEmail` from `$lib/validation`. Two copies of validation logic will drift over time.

## Acceptance Criteria

- [ ] Import `validateEmail` from `$lib/validation` in `src/routes/api/contact/+server.ts`
- [ ] Replace the inline `emailRegex` + `test` call with `validateEmail(data.email)`
- [ ] Remove the now-unused inline regex

## Notes

Completed: 2026-04-08

## Files

- `src/routes/api/contact/+server.ts:58-61`
