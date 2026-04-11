# TICKET-079 — Consolidate Duplicate escapeHtml Implementations

**Status**: Open
**Priority**: Medium
**Effort**: 20 min

## Description

`escapeHtml` is implemented twice with subtle differences:
- `src/routes/api/contact/+server.ts:8-15` — escapes `&`, `<`, `>`, `"`, `'`
- `src/routes/blog/rss.xml/+server.ts:39-45` — escapes `&`, `<`, `>`, `"` (omits single quote)

Duplicate implementations create drift risk. Extract to a single canonical function in `src/lib/server/utils.ts` (or similar) and import it in both places.

## Acceptance Criteria

- [ ] Single `escapeHtml` implementation in a shared server utility file
- [ ] Both `contact/+server.ts` and `rss.xml/+server.ts` import from the shared location
- [ ] The canonical version escapes `&`, `<`, `>`, `"`, `'`
- [ ] Build passes

## Files

- `src/routes/api/contact/+server.ts`
- `src/routes/blog/rss.xml/+server.ts`
