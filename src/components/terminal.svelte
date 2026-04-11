<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { terminalOpen } from '$lib/stores/terminal';
	import { runCommand, getCompletions } from '$lib/terminal-commands';
	import type { Mode } from '$lib/terminal-commands';

	let { fullscreen = false }: { fullscreen?: boolean } = $props();

	type HistoryEntry = { type: 'input'; text: string } | { type: 'output'; lines: string[] };

	let isOpen = $state(fullscreen);
	let input = $state('');
	let history = $state<HistoryEntry[]>([]);
	let cmdHistory = $state<string[]>([]);
	let cmdHistoryIndex = $state(-1);
	let mode = $state<Mode>('terminal');
	let rpgUnlocked = $state(false);

	let inputEl: HTMLInputElement;
	let scrollEl: HTMLElement;

	$effect(() => {
		if (!fullscreen) terminalOpen.set(isOpen);
	});

	$effect(() => {
		// scroll to bottom whenever history changes
		const _ = history.length;
		tick().then(() => {
			if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
		});
	});

	function open(initialChar = '') {
		isOpen = true;
		input = initialChar;
		tick().then(() => {
			if (inputEl) {
				inputEl.focus();
				inputEl.setSelectionRange(input.length, input.length);
			}
		});
	}

	function close() {
		if (fullscreen) return;
		isOpen = false;
		input = '';
	}

	function submit() {
		const cmd = input.trim();
		input = '';
		if (!cmd) return;

		history = [...history, { type: 'input', text: cmd }];
		cmdHistory = [cmd, ...cmdHistory.slice(0, 49)];
		cmdHistoryIndex = -1;

		const result = runCommand(cmd, mode);

		if (result.clear) {
			history = [];
			return;
		}

		if (result.close) {
			close();
			return;
		}

		if (result.lines.length > 0) {
			history = [...history, { type: 'output', lines: result.lines }];
		}

		if (result.modeChange) mode = result.modeChange;
		if (result.rpgUnlock) rpgUnlocked = true;

		if (result.navigate) {
			const dest = result.navigate;
			setTimeout(() => {
				goto(dest);
				if (!fullscreen) close();
			}, result.navigateDelay ?? 0);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			submit();
			return;
		}

		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			const next = Math.min(cmdHistoryIndex + 1, cmdHistory.length - 1);
			cmdHistoryIndex = next;
			if (cmdHistory[next] !== undefined) input = cmdHistory[next];
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const next = cmdHistoryIndex - 1;
			cmdHistoryIndex = next;
			input = next < 0 ? '' : (cmdHistory[next] ?? '');
			return;
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			const completions = getCompletions(input);
			if (completions.length === 0) return;
			if (completions.length === 1) {
				const tokens = input.split(' ');
				const argCommands = ['ls', 'cat', 'open', 'git', 'sudo', 'mode', 'echo'];
				if (tokens.length === 1) {
					input = completions[0];
					if (argCommands.includes(completions[0])) input += ' ';
				} else {
					tokens[tokens.length - 1] = completions[0];
					input = tokens.join(' ');
				}
			} else {
				history = [...history, { type: 'output', lines: [completions.join('   ')] }];
			}
		}
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (isOpen || fullscreen) return;
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
		open(e.key);
	}

	onMount(() => {
		window.addEventListener('keydown', handleWindowKeydown);
		if (fullscreen) tick().then(() => inputEl?.focus());
	});

	onDestroy(() => {
		if (browser) window.removeEventListener('keydown', handleWindowKeydown);
		if (!fullscreen) terminalOpen.set(false);
	});

	const PROMPT = 'adam@adamrobinson.tech:~$';
</script>

<div
	class="terminal"
	class:drawer={!fullscreen}
	class:open={isOpen}
	class:fullscreen
	role="region"
	aria-label="Terminal"
>
	{#if !fullscreen}
		<div class="terminal-bar">
			<span class="terminal-bar-title">{PROMPT.split(':')[0]}</span>
			{#if mode === 'rpg'}
				<span class="rpg-badge">RPG</span>
			{/if}
			<button class="close-btn" onclick={close} aria-label="Close terminal">×</button>
		</div>
	{/if}

	<div class="terminal-output" bind:this={scrollEl}>
		{#if fullscreen && history.length === 0}
			<div class="terminal-line output muted">type 'help' for available commands.</div>
		{/if}
		{#each history as entry (entry)}
			{#if entry.type === 'input'}
				<div class="terminal-line"><span class="prompt">{PROMPT}</span>&nbsp;{entry.text}</div>
			{:else}
				{#each entry.lines as line}
					<div class="terminal-line output">{line || '\u00a0'}</div>
				{/each}
			{/if}
		{/each}
	</div>

	<div class="terminal-input-row">
		<span class="prompt">{PROMPT}</span>
		<input
			bind:this={inputEl}
			bind:value={input}
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
