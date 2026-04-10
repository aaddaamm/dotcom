# TICKET-059 — Contact Form Silent Email Failure

**Status**: Done
**Priority**: High
**Effort**: 1 hour

## Description

The contact API swallows Resend failures and returns HTTP 200 regardless. Users see a success message even if their message was never delivered. There is no fallback or notification channel.

## Acceptance Criteria

- [ ] Surface Resend errors to the client with a distinct failure message ("Message sent to backup — we'll follow up shortly")
- [ ] Or: log failed submissions to Upstash Redis for manual review
- [ ] Do not silently discard form data on transient Resend errors

## Notes

Upgraded from Medium — a hiring manager or recruiter submitting the contact form and never getting a response is a high-cost failure.

Completed: 2026-04-10

## Files

- `src/routes/api/contact/+server.ts`
