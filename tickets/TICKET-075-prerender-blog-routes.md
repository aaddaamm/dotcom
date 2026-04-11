# TICKET-075 — Prerender Blog Routes

**Status**: Done
**Priority**: High
**Effort**: 5 min

## Description

Blog content is entirely build-time (`import.meta.glob` from local markdown files) but blog routes are not prerendered. Every request runs `marked.parse()` on a serverless function. Adding `export const prerender = true` to both blog routes eliminates serverless execution entirely for static content.

## Acceptance Criteria

- [ ] Add `export const prerender = true` to `src/routes/blog/+page.server.ts`
- [ ] Add `export const prerender = true` to `src/routes/blog/[...slug]/+page.server.ts`
- [ ] `npx vite build` succeeds, blog pages appear in `.svelte-kit/output/prerendered`
- [ ] Blog posts still render correctly including dark/light theme

## Files

- `src/routes/blog/+page.server.ts`
- `src/routes/blog/[...slug]/+page.server.ts`
