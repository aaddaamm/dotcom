# TICKET-086 — Fix Svelte 5 Anti-patterns in terminal.svelte

**Status**: Open
**Priority**: Low
**Effort**: 1 hr

## Description

`src/components/terminal.svelte` mixes Svelte 4 stores with Svelte 5 runes in ways that are fragile:

1. `terminalOpenTrigger` is an integer counter incremented externally to "trigger" opening — store-as-event-bus anti-pattern. In Svelte 5, an exported function or context is idiomatic.
2. `$effect` at lines 25–27 writes back to `terminalOpen` whenever `isOpen` changes — potential state cycle if anything else writes to `terminalOpen`.
3. `const _ = history.length` in `$effect` is a workaround for manual dependency tracking. Use `$effect.pre` or natural dependency reads instead.
4. `if (browser)` inside `onDestroy` is unnecessary — `onDestroy` never runs on the server.
5. `rpgUnlocked` state is set but never read in the template — dead state.

## Acceptance Criteria

- [ ] `terminalOpenTrigger` replaced with an idiomatic Svelte 5 trigger mechanism
- [ ] `$effect` state cycle risk resolved
- [ ] `const _` hack replaced with proper `$effect` dependency tracking
- [ ] `if (browser)` removed from `onDestroy`
- [ ] `rpgUnlocked` either wired to actual UI or removed
- [ ] Terminal still opens/closes/functions correctly
- [ ] Build passes

## Files

- `src/components/terminal.svelte`
- `src/lib/stores/` (any store files involved)
