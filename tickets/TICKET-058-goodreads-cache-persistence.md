# TICKET-058 — Goodreads Cache Persistence Across Cold Starts

**Status**: Backlog
**Priority**: Medium
**Effort**: 1-2 hours

## Description

`goodreadsService.ts` uses an in-memory cache with a 1-hour TTL. Vercel serverless cold starts reset this cache, causing frequent RSS fetches and added latency on the first request after inactivity.

## Acceptance Criteria

- [ ] Move Goodreads cache to Upstash Redis (client already wired for contact rate-limiting)
- [ ] Store serialized shelf JSON with a 1-hour TTL key per shelf
- [ ] Fall back to live RSS fetch on Redis miss or error

## Files

- `src/lib/server/goodreadsService.ts`
