# TICKET-009 — Analytics & Conversion Tracking

**Status**: Done
**Priority**: Medium
**Effort**: 2 hours

## Description

Set up detailed conversion funnel analytics beyond Vercel's built-in.

## Acceptance Criteria

- [x] Contact form submission tracking
- [x] CTA click tracking
- [x] Page scroll depth tracking

## Notes

Already have Vercel analytics, need more granular conversion data.

Completed: 2026-04-15. All events via `window.va?.track()`:
- `Contact Form Submitted` — contact-form.svelte (pre-existing)
- `CTA Clicked` — hero, services, hire, teach, mobile FAB
- `Scroll Depth` — 25/50/75/100% milestones, reset on each navigation, in +layout.svelte
