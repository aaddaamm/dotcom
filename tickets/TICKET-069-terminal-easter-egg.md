# TICKET-069 — Terminal Easter Egg

**Status**: Done
**Priority**: Medium
**Effort**: 4-6 hours

## Description

Hidden terminal drawer that activates when a visitor starts typing on any page. Supports commands like `whoami`, `help`, `ls`. Rewards curious engineers.

Implement Option A (keydown → drawer) + Option C (`/terminal` route) using the same component.

Full design spec (trigger options, visual design, command list, RPG mode, architecture) is in `tickets/TICKET-019-terminal-easter-egg.md`.

## Acceptance Criteria

- [ ] Terminal drawer component: dark bg, teal prompt, monospace font
- [ ] Commands: `whoami`, `help`, `ls`, `ls /work`, `ls /stack`, `clear`, `exit`
- [ ] Keydown listener on `window` activates drawer — skips inputs, textareas, contenteditables, meta/ctrl combos
- [ ] `Escape` or `exit` dismisses the drawer
- [ ] `/terminal` route renders the same component full-screen (shareable, linkable)
- [ ] FAB suppressed while drawer is open on mobile
- [ ] Drawer slides up from bottom, covers ~50% of viewport

## Notes

Design spec: `tickets/TICKET-019-terminal-easter-egg.md`

Previously filed as TICKET-019 (old numbering). The file `tickets/TICKET-019-terminal-easter-egg.md` contains the full design document including RPG mode, command table, architecture notes, and open questions — do not overwrite it.
