<script lang="ts">
	import { onDestroy, tick, untrack } from 'svelte';
	import { page } from '$app/state';
	import { getTerminalOpen, setTerminalOpen } from '$lib/stores/terminal.svelte';
	import { TerminalState } from '$lib/terminal-state.svelte';
	import { trackTerminalOpen } from '$lib/analytics';

	const { fullscreen = false }: { fullscreen?: boolean } = $props();

	const state = new TerminalState(() => fullscreen);

	let inputEl: HTMLInputElement;
	let scrollEl: HTMLElement;

	// Sync isOpen → shared store so layout can hide the footer CTA.
	// untrack the write so this effect only re-runs when isOpen changes, not when the store changes.
	$effect(() => {
		const open = state.isOpen;
		untrack(() => {
			if (!fullscreen) setTerminalOpen(open);
		});
	});

	// Open when triggered externally (e.g. footer button sets terminalOpen).
	// untrack the isOpen read so only terminalOpen drives this effect.
	$effect(() => {
		if (getTerminalOpen() && !fullscreen) {
			untrack(() => {
				if (!state.isOpen) openAndFocus('button');
			});
		}
	});

	$effect(() => {
		if (state.history.length === 0) return;
		tick().then(() => {
			if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
		});
	});

	function openAndFocus(source: 'keyboard' | 'button' | 'page' = 'keyboard', initialChar = '') {
		state.open(source, initialChar);
		tick().then(() => {
			if (inputEl) {
				inputEl.focus();
				inputEl.setSelectionRange(state.input.length, state.input.length);
			}
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			state.submit();
			return;
		}
		if (e.key === 'Escape') {
			state.close();
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
		openAndFocus('keyboard', e.key);
	}

	// $effect is browser-only — no window guard needed
	$effect(() => {
		window.addEventListener('keydown', handleWindowKeydown);
		if (fullscreen) {
			trackTerminalOpen('page');
			tick().then(() => inputEl?.focus());
		}
		return () => window.removeEventListener('keydown', handleWindowKeydown);
	});

	onDestroy(() => {
		if (!fullscreen) setTerminalOpen(false);
	});

	const PROMPT = 'adam@adamrobinson.tech:~$';
</script>

<div
	class="terminal"
	class:drawer={!fullscreen}
	class:open={state.isOpen}
	class:fullscreen
	role="region"
	aria-label="Terminal"
>
	{#if !fullscreen}
		<div class="terminal-bar">
			<span class="terminal-bar-title">{PROMPT.split(':')[0]}</span>
			{#if state.mode === 'rpg'}
				<span class="rpg-badge">RPG</span>
			{/if}
			<button class="close-btn" onclick={() => state.close()} aria-label="Close terminal">×</button>
		</div>
	{/if}

	<div class="terminal-output" bind:this={scrollEl}>
		{#if fullscreen && state.history.length === 0}
			<div class="terminal-line output muted">type 'help' for available commands.</div>
		{/if}
		{#each state.history as entry (entry.id)}
			{#if entry.type === 'input'}
				<div class="terminal-line">
					<span class="prompt">{PROMPT}</span>
					&nbsp;{entry.text}
				</div>
			{:else}
				{#each entry.lines as line, i (i)}
					<div class="terminal-line output">{line || '\u00a0'}</div>
				{/each}
			{/if}
		{/each}
	</div>

	<div class="terminal-input-row">
		<span class="prompt">{PROMPT}</span>
		<input
			bind:this={inputEl}
			bind:value={state.input}
			type="text"
			class="terminal-input"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck={false}
			aria-label="Terminal input"
			onkeydown={handleKeydown}
		/>
	</div>
</div>

<style>
	.terminal {
		font-family: var(--font-mono);
		font-size: 13px;
		background: #0a0a0a;
		color: #e8e8e8;
		display: flex;
		flex-direction: column;
	}

	/* Drawer mode */
	.drawer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50vh;
		min-height: 280px;
		max-height: 500px;
		z-index: 200;
		border-top: 1px solid #1a1a1a;
		transform: translateY(100%);
		transition: transform 300ms ease-out;
	}

	.drawer.open {
		transform: translateY(0);
	}

	/* Fullscreen mode */
	.fullscreen {
		min-height: 70vh;
		border: 1px solid #1a1a1a;
		border-radius: 6px;
	}

	/* Top bar (drawer only) */
	.terminal-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 6px 16px;
		border-bottom: 1px solid #1a1a1a;
		flex-shrink: 0;
	}

	.terminal-bar-title {
		font-size: 11px;
		color: #555;
		flex: 1;
	}

	.rpg-badge {
		font-size: 10px;
		padding: 1px 6px;
		border-radius: 3px;
		background: color-mix(in srgb, var(--color-accent) 20%, transparent);
		color: var(--color-accent);
		border: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
	}

	.close-btn {
		background: none;
		border: none;
		color: #555;
		cursor: pointer;
		font-size: 18px;
		line-height: 1;
		padding: 0 2px;
		font-family: inherit;
		transition: color 150ms ease;
	}

	.close-btn:hover {
		color: #e8e8e8;
	}

	/* Output area */
	.terminal-output {
		flex: 1;
		overflow-y: auto;
		padding: 12px 16px 4px;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.terminal-output::-webkit-scrollbar {
		width: 4px;
	}

	.terminal-output::-webkit-scrollbar-track {
		background: transparent;
	}

	.terminal-output::-webkit-scrollbar-thumb {
		background: #333;
		border-radius: 2px;
	}

	/* Lines */
	.terminal-line {
		line-height: 1.6;
		white-space: pre;
		color: #888;
	}

	.terminal-line .prompt {
		color: var(--color-accent);
	}

	.terminal-line.output {
		color: #e8e8e8;
	}

	.terminal-line.output.muted {
		color: #555;
	}

	/* Input row */
	.terminal-input-row {
		display: flex;
		align-items: center;
		gap: 0;
		padding: 8px 16px 12px;
		flex-shrink: 0;
	}

	.prompt {
		color: var(--color-accent);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.terminal-input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		color: #e8e8e8;
		font-family: var(--font-mono);
		font-size: 13px;
		margin-left: 0.4em;
		caret-color: var(--color-accent);
		padding: 0;
	}
</style>
