# TICKET-088 — Replace cheerio with fast-xml-parser for RSS Parsing

**Status**: Open
**Priority**: Low
**Effort**: 1 hr

## Description

`src/lib/server/goodreadsService.ts` imports `cheerio` — a full DOM parsing library — to parse Goodreads RSS XML. `cheerio` is ~10× larger than `fast-xml-parser` and increases serverless cold-start time.

Since the parsing only needs to extract structured fields from XML (no CSS selectors, no DOM manipulation), `fast-xml-parser` or the built-in `DOMParser` (Node 18+) would be sufficient and dramatically lighter.

## Acceptance Criteria

- [ ] `cheerio` removed from dependencies
- [ ] `fast-xml-parser` (or equivalent lightweight XML parser) used in `goodreadsService.ts`
- [ ] Goodreads books still parse correctly (title, author, cover image, shelf, rating, link)
- [ ] Build passes, `/play` page still shows books

## Files

- `src/lib/server/goodreadsService.ts`
- `package.json`
