# TICKET-061 — Add PageData Types to Load Functions

**Status**: Backlog
**Priority**: Low
**Effort**: 1 hour

## Description

`app.d.ts` is minimal and load function return types rely entirely on inference. Explicit `PageData` types catch shape mismatches between `+page.server.ts` and `+page.svelte` at compile time rather than at runtime.

## Acceptance Criteria

- [ ] Define typed return shapes for blog index, blog post, and any other load functions with non-trivial data
- [ ] Use SvelteKit's generated `PageData` type pattern or explicit `Load` return types
- [ ] Confirm `npm run check` passes with no new type errors

## Files

- `src/app.d.ts`
- `src/routes/blog/+page.server.ts`
- `src/routes/blog/[...slug]/+page.server.ts`
