# TICKET-063 — Move Repeated Section Styles to app.css

**Status**: Done
**Priority**: Medium
**Effort**: 1 hour

## Description

`.section-border`, `.section-heading`, and `.accent-dot` are redefined in `<style>` blocks on multiple page components with minor variations (e.g. `margin-bottom: 24px` vs `20px`). They should be single global utilities.

## Acceptance Criteria

- [ ] Consolidate `.section-border`, `.section-heading`, `.accent-dot` into `app.css`
- [ ] Remove per-page redefinitions; use the global classes directly
- [ ] Resolve any margin/spacing differences by picking one canonical value or making it a CSS var

## Notes

Completed: 2026-04-10

## Files

- `src/routes/+page.svelte`
- `src/routes/hire/+page.svelte`
- `src/app.css`
