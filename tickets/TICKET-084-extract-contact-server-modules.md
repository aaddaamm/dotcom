# TICKET-084 — Refactor Contact Server Handler into Focused Modules

**Status**: Done
**Priority**: Low
**Effort**: 1 hr

## Description

`src/routes/api/contact/+server.ts` is 133 lines doing four things: rate limiting, input validation, sanitization, and email sending. Extract each responsibility into a focused module so the handler becomes ~30 lines of orchestration.

Suggested split:
- `src/lib/server/rateLimit.ts` — `isRateLimited(ip)` (reusable for future endpoints)
- `src/lib/server/emailTemplates.ts` — HTML email template strings (currently 60+ lines of inline HTML with hardcoded hex colors)
- `src/lib/server/contactEmail.ts` — `sendContactNotification()`, (auto-responder removed per TICKET-077)

## Acceptance Criteria

- [ ] Rate limiting logic extracted to `src/lib/server/rateLimit.ts`
- [ ] Email templates extracted to `src/lib/server/emailTemplates.ts` using CSS vars or design tokens instead of hardcoded hex
- [ ] Contact handler reduced to orchestration only (~30 lines)
- [ ] All existing behavior preserved
- [ ] Build passes

## Dependencies

- TICKET-077 (harden contact form) should land first

## Files

- `src/routes/api/contact/+server.ts`
