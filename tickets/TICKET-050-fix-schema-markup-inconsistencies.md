# TICKET-050 — Fix Schema Markup Inconsistencies in app.html

**Status**: Done
**Priority**: Low
**Effort**: 15 min

## Description

The `Person` structured data in `app.html` describes a "Lead Software Engineer building backend systems" in "Providence, RI" — conflicting with the site's freelance-consultant persona and the "Cranston, RI" used everywhere else.

## Acceptance Criteria

- [ ] Update `jobTitle` and `description` to match the freelance consultant persona (aligned with `seo-head.svelte` `LocalBusiness` schema)
- [ ] Change `addressLocality` from `"Providence"` to `"Cranston"`

## Notes

Completed: 2026-04-08

## Files

- `src/app.html:28-37`
