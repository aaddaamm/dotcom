# TICKET-057 — Harden Contact API Input Handling

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

Two small gaps in the contact API's request handling:

1. No `Content-Type` check — a non-JSON body causes `request.json()` to throw, returning a 500 instead of a 400.
2. The IP address logged in the notification email (`x-forwarded-for` header, line 97) may differ from the IP used for rate limiting (`getClientAddress()`, line 37), making submissions hard to correlate in logs.

## Acceptance Criteria

- [ ] Check `request.headers.get('content-type')` before parsing; return 400 if not `application/json`
- [ ] Capture `clientIP` before the try block and reuse it in the email body instead of re-reading `x-forwarded-for`

## Notes

Completed: 2026-04-08

## Files

- `src/routes/api/contact/+server.ts`
