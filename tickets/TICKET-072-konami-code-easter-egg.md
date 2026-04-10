# TICKET-072 — Konami Code Easter Egg

**Status**: Backlog
**Priority**: Low
**Effort**: 1-2 hours

## Description

↑↑↓↓←→←→BA triggers something. Options: navigate to `/terminal`, flash a brief glitch effect, or display a hidden message. Must not conflict with the terminal keydown listener (TICKET-069).

## Acceptance Criteria

- [ ] Konami sequence detected via `keydown` listener
- [ ] On success: navigate to `/terminal` or trigger a brief visual effect
- [ ] Sequence detection resets on any non-sequence key
- [ ] Coexists cleanly with TICKET-069 keydown listener
