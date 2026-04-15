# TICKET-083 — Parallelize Goodreads RSS Fetch + Share Cache via Upstash

**Status**: Done
**Priority**: Medium
**Effort**: 1–2 hr

## Description

Two related performance issues in `src/lib/server/goodreadsService.ts`:

1. **Sequential pagination**: Pages 1..20 are fetched in a `while` loop one at a time (~20 serial RTTs on cache miss). Pages 2..N could be fetched in parallel after page 1 reveals the total count.

2. **Per-instance cache**: `cache` is module-scoped, so every Vercel cold instance independently refetches all pages. Two simultaneous cold-start requests both fetch everything — no in-flight dedupe. Upstash is already in the project for rate limiting; using it for the Goodreads cache too would share the result across all instances.

## Acceptance Criteria

- [ ] After fetching page 1 (to get total count), remaining pages fetched with `Promise.all`
- [ ] Cache result written to Upstash KV with same TTL as current in-memory cache (1 hr)
- [ ] On cache hit from Upstash, in-memory cache also populated (two-tier: memory → Redis → fetch)
- [ ] Behavior unchanged for `/play` page (books still display correctly)
- [ ] Build passes

## Files

- `src/lib/server/goodreadsService.ts`
