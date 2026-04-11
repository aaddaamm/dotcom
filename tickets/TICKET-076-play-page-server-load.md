# TICKET-076 — Move /play Goodreads Fetch to Server Load

**Status**: Done
**Priority**: High
**Effort**: 30 min

## Description

`/play` renders a spinner and fetches Goodreads data client-side after hydration. The `+page.server.ts` exists but returns `{}`. Moving the fetch to the server load eliminates the spinner, the layout shift, and an unnecessary client-side round-trip.

## Acceptance Criteria

- [ ] `src/routes/play/+page.server.ts` calls Goodreads service and returns `currentlyReading` and `read` arrays
- [ ] `src/routes/play/+page.svelte` reads from `data` prop instead of fetching on mount
- [ ] Spinner / loading state removed from the page
- [ ] Page SSRs books correctly (no layout shift)
- [ ] Build passes

## Files

- `src/routes/play/+page.server.ts`
- `src/routes/play/+page.svelte`
- `src/lib/server/goodreadsService.ts`
