# TICKET-049 — Fix Draft Blog Post Routing

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

`getAllPosts(true)` returns draft posts with slugs prefixed `drafts/foo`. These render as links on the `/blog` listing page in dev, but `blog/[slug]` is a single-segment route — SvelteKit won't match `/blog/drafts/foo`, so clicking them 404s.

## Acceptance Criteria

- [ ] Add a `src/routes/blog/drafts/[slug]/+page.server.ts` route that loads draft posts (dev-only), OR
- [ ] Change `blog/[slug]` to `blog/[...slug]` and update `+page.server.ts` to join the segments back into a path
- [ ] Draft links on the blog listing page navigate correctly in dev

## Notes

Completed: 2026-04-08

## Files

- `src/lib/server/blog.ts:33`
- `src/routes/blog/[slug]/+page.server.ts`
