# TICKET-051 — Remove Dead Code (email-templates.ts, api-utils.ts)

**Status**: Done (email-templates.ts deleted; api-utils.ts is NOT dead — used by goodreads routes)
**Priority**: Low
**Effort**: 15 min

## Description

Two library files export functions that are never imported or called anywhere. `email-templates.ts` also defines a `ContactFormData` interface that diverges from the one in `validation.ts` (missing `project` field), creating a maintenance hazard.

## Acceptance Criteria

- [ ] Delete `src/lib/email-templates.ts` (or wire it up if intended to replace inline email HTML in `+server.ts`)
- [ ] Delete `src/lib/server/api-utils.ts` (or wire it up in the goodreads/sitemap routes)
- [ ] Ensure build still passes after deletion

## Notes

Completed: 2026-04-08

## Files

- `src/lib/email-templates.ts`
- `src/lib/server/api-utils.ts`
