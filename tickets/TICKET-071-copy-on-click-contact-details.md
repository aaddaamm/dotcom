# TICKET-071 — Copy-on-Click Contact Details

**Status**: Done
**Priority**: Low
**Effort**: 30 min

## Description

Email and GitHub handle in the footer copy to clipboard on click with a brief "copied!" flash. Standard engineer UX — small but noticed.

## Acceptance Criteria

- [ ] Click email → copies address, shows inline "copied!" for 1.5s
- [ ] Click GitHub link → copies URL, shows inline "copied!" for 1.5s
- [ ] Uses `navigator.clipboard` API with a graceful no-op fallback
- [ ] No layout shift from the feedback state

## Notes

Completed: 2026-04-10

## Files

- `src/components/footer.svelte`
