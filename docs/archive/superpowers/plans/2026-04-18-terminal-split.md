# Terminal Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract stateful interaction logic from `terminal.svelte` into a `TerminalState` class so the component stays focused on DOM concerns.

**Architecture:** A `TerminalState` class in `terminal-state.svelte.ts` owns all `$state` fields and business logic. `terminal.svelte` instantiates it with `new TerminalState()`, keeping DOM refs, effects, event handlers, and the template. Each terminal instance gets its own isolated state.

**Tech Stack:** Svelte 5 runes (`$state` on class fields), SvelteKit (`$app/navigation`, `$app/state`), TypeScript.

---

### Task 1: Create terminal-state.svelte.ts

**Files:**

- Create: `src/lib/terminal-state.svelte.ts`

- [ ] **Step 1: Create the file**

```ts
import { goto } from '$app/navigation';
import { runCommand, getCompletions, type Mode } from '$lib/terminal-commands';

export type HistoryEntry =
	| { id: number; type: 'input'; text: string }
	| { id: number; type: 'output'; lines: string[] };

export class TerminalState {
	isOpen = $state(false);
	input = $state('');
	history = $state<HistoryEntry[]>([]);
	cmdHistory = $state<string[]>([]);
	cmdHistoryIndex = $state(-1);
	mode = $state<Mode>('terminal');
	#nextId = 0;

	open(initialChar = '') {
		this.isOpen = true;
		this.input = initialChar;
	}

	close(fullscreen: boolean) {
		if (fullscreen) return;
		this.isOpen = false;
		this.input = '';
	}

	submit(fullscreen: boolean) {
		const cmd = this.input.trim();
		this.input = '';
		if (!cmd) return;

		this.history = [...this.history, { id: this.#nextId++, type: 'input', text: cmd }];
		this.cmdHistory = [cmd, ...this.cmdHistory.slice(0, 49)];
		this.cmdHistoryIndex = -1;

		const result = runCommand(cmd, this.mode);

		if (result.clear) {
			this.history = [];
			return;
		}

		if (result.close) {
			this.close(fullscreen);
			return;
		}

		if (result.lines.length > 0) {
			this.history = [...this.history, { id: this.#nextId++, type: 'output', lines: result.lines }];
		}

		if (result.modeChange) this.mode = result.modeChange;

		if (result.navigate) {
			const dest = result.navigate;
			setTimeout(() => {
				goto(dest);
				if (!fullscreen) this.close(fullscreen);
			}, result.navigateDelay ?? 0);
		}
	}

	navigateHistory(direction: 'up' | 'down') {
		if (direction === 'up') {
			const next = Math.min(this.cmdHistoryIndex + 1, this.cmdHistory.length - 1);
			this.cmdHistoryIndex = next;
			if (this.cmdHistory[next] !== undefined) this.input = this.cmdHistory[next];
		} else {
			const next = this.cmdHistoryIndex - 1;
			this.cmdHistoryIndex = next;
			this.input = next < 0 ? '' : (this.cmdHistory[next] ?? '');
		}
	}

	tabComplete() {
		const completions = getCompletions(this.input);
		if (completions.length === 0) return;
		if (completions.length === 1) {
			const tokens = this.input.split(' ');
			const argCommands = ['ls', 'cat', 'open', 'git', 'sudo', 'mode', 'echo'];
			if (tokens.length === 1) {
				this.input = completions[0];
				if (argCommands.includes(completions[0])) this.input += ' ';
			} else {
				tokens[tokens.length - 1] = completions[0];
				this.input = tokens.join(' ');
			}
		} else {
			this.history = [
				...this.history,
				{ id: this.#nextId++, type: 'output', lines: [completions.join('   ')] }
			];
		}
	}
}
```

Note: `tabComplete()` handles the multi-completion history append internally (it has access to `#nextId`), so it returns `void`. The component just calls `state.tabComplete()` with no return value.

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: 0 errors (3 pre-existing warnings in terminal.svelte unrelated to this file).

- [ ] **Step 3: Commit**

```bash
git add src/lib/terminal-state.svelte.ts
git commit -m "feat(terminal): add TerminalState class with reactive state and business logic"
```

---

### Task 2: Update terminal.svelte to use TerminalState

**Files:**

- Modify: `src/components/terminal.svelte` (script block only — template and styles unchanged)

Replace the entire `<script>` block (lines 1–183) with the following. The template (`<div class="terminal">…`) and `<style>` block are **not touched**.

- [ ] **Step 1: Replace the script block**

```svelte
<script lang="ts">
	import { onDestroy, tick, untrack } from 'svelte';
	import { page } from '$app/state';
	import { terminalOpen } from '$lib/stores/terminal';
	import { TerminalState } from '$lib/terminal-state.svelte';

	let { fullscreen = false }: { fullscreen?: boolean } = $props();

	const state = new TerminalState();
	state.isOpen = fullscreen;

	let inputEl: HTMLInputElement;
	let scrollEl: HTMLElement;

	function openAndFocus(initialChar = '') {
		state.open(initialChar);
		tick().then(() => {
			if (inputEl) {
				inputEl.focus();
				inputEl.setSelectionRange(state.input.length, state.input.length);
			}
		});
	}

	// Sync isOpen → shared store so layout can hide the footer CTA.
	// untrack the write so this effect only re-runs when isOpen changes, not when the store changes.
	$effect(() => {
		const open = state.isOpen;
		untrack(() => {
			if (!fullscreen) terminalOpen.set(open);
		});
	});

	// Open when triggered externally (e.g. footer button sets terminalOpen).
	// untrack the isOpen read so only $terminalOpen drives this effect.
	$effect(() => {
		if ($terminalOpen && !fullscreen) {
			untrack(() => {
				if (!state.isOpen) openAndFocus();
			});
		}
	});

	$effect(() => {
		if (state.history.length === 0) return;
		tick().then(() => {
			if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
		});
	});

	$effect(() => {
		window.addEventListener('keydown', handleWindowKeydown);
		if (fullscreen) tick().then(() => inputEl?.focus());
		return () => window.removeEventListener('keydown', handleWindowKeydown);
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			state.submit(fullscreen);
			return;
		}
		if (e.key === 'Escape') {
			state.close(fullscreen);
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			state.navigateHistory('up');
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			state.navigateHistory('down');
			return;
		}
		if (e.key === 'Tab') {
			e.preventDefault();
			state.tabComplete();
		}
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (state.isOpen || fullscreen) return;
		if (page.url.pathname === '/terminal') return;
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		if (e.key.length !== 1) return;
		const target = e.target as HTMLElement;
		if (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			target instanceof HTMLSelectElement ||
			target.isContentEditable
		)
			return;
		e.preventDefault();
		openAndFocus(e.key);
	}

	onDestroy(() => {
		if (!fullscreen) terminalOpen.set(false);
	});

	const PROMPT = 'adam@adamrobinson.tech:~$';
</script>
```

- [ ] **Step 2: Update template bindings**

The template uses bare variable names (`isOpen`, `input`, `history`, `mode`). Update each reference to use `state.*`. Find and replace these in the template section only (lines 185–240 in the original file):

| Old                                        | New                                              |
| ------------------------------------------ | ------------------------------------------------ |
| `class:open={isOpen}`                      | `class:open={state.isOpen}`                      |
| `{#if !fullscreen}`                        | unchanged                                        |
| `{#if mode === 'rpg'}`                     | `{#if state.mode === 'rpg'}`                     |
| `onclick={close}`                          | `onclick={() => state.close(fullscreen)}`        |
| `bind:this={scrollEl}`                     | unchanged                                        |
| `{#if fullscreen && history.length === 0}` | `{#if fullscreen && state.history.length === 0}` |
| `{#each history as entry (entry.id)}`      | `{#each state.history as entry (entry.id)}`      |
| `bind:this={inputEl}`                      | unchanged                                        |
| `bind:value={input}`                       | `bind:value={state.input}`                       |
| `onkeydown={handleKeydown}`                | unchanged                                        |

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: 0 errors. The 3 pre-existing warnings in terminal.svelte (a11y + untrack warning) are unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/components/terminal.svelte
git commit -m "refactor(terminal): delegate state and logic to TerminalState class"
```

---

### Task 3: Build verification

- [ ] **Step 1: Production build**

```bash
npx vite build
```

Expected: clean build, same pre-existing Resend warning, no new errors.

- [ ] **Step 2: Verify line counts**

```bash
awk '/^<script/,/^<\/script>/' src/components/terminal.svelte | wc -l
```

Expected: ≤ 70 lines.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

Verify in browser at `http://localhost:5173`:

- Pressing any key on the home page opens the terminal drawer
- Typing a command and pressing Enter runs it (try `help`)
- Arrow Up/Down cycles command history
- Tab completes commands
- Escape closes the drawer
- Navigating to `http://localhost:5173/terminal` shows the fullscreen terminal, Escape does nothing
- Clicking the footer "Get In Touch" button when on any page (not `/contact`) shows the mobile FAB — confirms `terminalOpen` store sync still works

- [ ] **Step 4: Close the issue and push**

```bash
git push origin main
gh issue close 20 --comment "Implemented — TerminalState class in src/lib/terminal-state.svelte.ts. terminal.svelte script block reduced from 183 to ~65 lines."
```
