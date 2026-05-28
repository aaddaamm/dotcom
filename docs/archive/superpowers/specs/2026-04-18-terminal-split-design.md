# terminal.svelte Split — Design Spec

**Date:** 2026-04-18
**Issue:** #20 — refactor: split terminal.svelte — extract logic to terminal-state.ts
**Status:** Approved

## Summary

Extract stateful interaction logic from `terminal.svelte` into a `TerminalState` class in `src/lib/terminal-state.svelte.ts`. The component keeps only DOM concerns: refs, effects, and event handlers. No behavior change.

## Approach

Svelte 5 class with `$state` fields (Option A). Each `terminal.svelte` instance creates its own `TerminalState` via `new TerminalState()`, giving full per-instance isolation. This is important because the drawer and the `/terminal` fullscreen page have different `fullscreen` behavior and must not share state.

## File Split

| File | Role |
|------|------|
| `src/lib/terminal-state.svelte.ts` | **New.** `TerminalState` class + `HistoryEntry` type. Owns all reactive state and business logic. |
| `src/components/terminal.svelte` | **Modified.** DOM refs, effects, event handlers, template, styles. Instantiates `TerminalState`. |

`terminal-commands.ts` is unchanged. `Mode` type stays there.

## TerminalState Class

```ts
// src/lib/terminal-state.svelte.ts
import { goto } from '$app/navigation'
import { runCommand, getCompletions, type Mode } from '$lib/terminal-commands'

export type HistoryEntry =
  | { id: number; type: 'input'; text: string }
  | { id: number; type: 'output'; lines: string[] }

export class TerminalState {
  isOpen = $state(false)
  input = $state('')
  history = $state<HistoryEntry[]>([])
  cmdHistory = $state<string[]>([])
  cmdHistoryIndex = $state(-1)
  mode = $state<Mode>('terminal')
  #nextId = 0

  open(initialChar = '') { ... }       // pure state: sets isOpen, input
  close(fullscreen: boolean) { ... }   // pure state: guards on fullscreen
  submit(fullscreen: boolean) { ... }
  navigateHistory(direction: 'up' | 'down') { ... }
  tabComplete(): string[] | null { ... } // returns completions list or null
}
```

### Method responsibilities

**`open(initialChar)`** — sets `isOpen = true`, `input = initialChar`. DOM focus is handled by the component after calling this.

**`close(fullscreen)`** — no-op if `fullscreen`; otherwise sets `isOpen = false`, `input = ''`.

**`submit(fullscreen)`** — reads `this.input`, appends to `history` and `cmdHistory`, runs `runCommand`, handles `clear`/`close`/`navigate`/`modeChange` results. For `close` results, calls `this.close(fullscreen)`. Calls `goto()` for navigate results, then `this.close(fullscreen)` if not fullscreen.

**`navigateHistory(direction)`** — increments/decrements `cmdHistoryIndex`, updates `input`.

**`tabComplete()`** — runs `getCompletions(this.input)`. Single completion: updates `this.input` directly, returns `null`. Multiple completions: returns the array (component appends them to history). Zero completions: returns `null`.

## What Stays in terminal.svelte

- `fullscreen` prop, `inputEl`, `scrollEl` DOM refs
- `$effect`: store sync (`isOpen → terminalOpen`)
- `$effect`: store→open (responds to `$terminalOpen`)
- `$effect`: auto-scroll on `state.history` change
- `$effect`: window keydown listener + fullscreen focus
- `handleKeydown` — calls `state.submit`, `state.close`, `state.navigateHistory`, `state.tabComplete`; appends tab completions to `state.history`; calls `tick()` for DOM focus after `state.open`
- `handleWindowKeydown` — guards on `state.isOpen`, calls `state.open`, calls `tick()` for focus
- `onDestroy` — resets store
- `PROMPT` constant
- Full template and `<style>` block (unchanged)

## Line Count Target

| Section | Before | After |
|---------|--------|-------|
| `<script>` | ~183 lines | ~65 lines |
| Template | ~57 lines | ~57 lines (unchanged) |
| `<style>` | ~147 lines | ~147 lines (unchanged) |
| **Script + template** | **~240 lines** | **~122 lines** |

Target: <150 lines of script + template. ✅

## Acceptance Criteria

- [ ] `src/lib/terminal-state.svelte.ts` created with `TerminalState` class and `HistoryEntry` type
- [ ] `terminal.svelte` script block ≤ 70 lines
- [ ] No behavior change — drawer and fullscreen terminal work identically
- [ ] `npm run check` passes (0 errors)
- [ ] `npx vite build` passes
