# TICKET-077 — Harden Contact Form: Mail Relay + Rate Limit Fail-Open

**Status**: Done
**Priority**: High
**Effort**: 1–2 hr

## Description

Two related security issues in `src/routes/api/contact/+server.ts`:

1. **Open mail relay**: The auto-responder sends a confirmation email to whatever address the user submits. An attacker can use this as a free relay — 3 messages per IP per 15 min, each generating an outbound email to an arbitrary recipient with attacker-controlled content in the name field. Reputation/abuse risk for the sending domain.

2. **Rate limiter fails open**: `isRateLimited()` swallows all Redis/Upstash errors and returns `false`. If env vars are rotated, Upstash is degraded, or the service is down, the form has no rate limit at all with only a `console.warn`. This silently removes all spam protection with no alert.

## Acceptance Criteria

- [ ] Auto-responder removed OR gated behind additional validation (e.g., only send if email passes a stricter check, or remove entirely — the notification to Adam is the important one)
- [ ] `isRateLimited()` falls back to a per-instance in-memory limiter (simple Map with TTL) when Redis is unavailable, so some protection always exists
- [ ] Redis failure logs a warning but does not silently disable protection
- [ ] Build passes, contact form still submits correctly

## Notes

Simplest fix for the relay: just remove the auto-responder. The site is a personal portfolio — the outbound notification to Adam is all that matters.

## Files

- `src/routes/api/contact/+server.ts`
