# TICKET-060 — Blog Draft Filtering Is Dev-Mode-Only, Not Build-Mode-Aware

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

`getAllPosts(dev)` gates draft visibility on SvelteKit's `dev` flag. Vercel preview deployments run in production mode (`dev === false`), so drafts are invisible there too — no way to preview a draft before publishing without running locally.

## Acceptance Criteria

- [ ] Add a `SHOW_DRAFTS` env var that can be set on the Vercel preview environment
- [ ] Pass `dev || !!SHOW_DRAFTS` to `getAllPosts` in the blog load function
- [ ] Document in CLAUDE.md that preview drafts require `SHOW_DRAFTS=true` on the Vercel project

## Files

- `src/lib/server/blog.ts`
- `src/routes/blog/+page.server.ts`
