# TICKET-052 — Harden Goodreads Service

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

Three small reliability gaps in `goodreadsService.ts`: silent error swallowing with no logging, `parseInt(bookId)` can produce `NaN` for empty strings, and the pagination loop has no max-page guard.

## Acceptance Criteria

- [ ] Add `console.error` in the `getBooksFromShelf` catch block before returning `[]`
- [ ] Guard `parseInt(bookId)` against `NaN` (e.g. `parseInt(bookId) || 0`)
- [ ] Add a max-page limit (e.g. `page > 20`) to the pagination `while(true)` loop

## Notes

Completed: 2026-04-08

## Files

- `src/lib/server/goodreadsService.ts`
