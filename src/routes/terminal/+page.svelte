<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import { pageSeo } from '$lib/seo';
	import { onMount } from 'svelte';
	import { trackTerminalCommand, trackTerminalOpen } from '$lib/analytics';

	type Entry = {
		type: 'input' | 'output';
		text: string;
	};

	let input = $state('');
	let history = $state<Entry[]>([
		{ type: 'output', text: "type 'help' for available commands." }
	]);
	let inputEl: HTMLInputElement;
	let scrollEl: HTMLDivElement;

	const prompt = 'adam@dotcom:~$';

	onMount(() => {
		trackTerminalOpen('page');
		inputEl?.focus();
	});

	$effect(() => {
		if (!history.length) return;
		scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'auto' });
	});

	function runCommand(raw: string) {
		const cmd = raw.trim().toLowerCase();
		if (!cmd) return '';
		switch (cmd) {
			case 'help':
				return 'commands: help, whoami, ls, cat services.txt, contact, clear';
			case 'whoami':
				return 'adam robinson — freelance engineer for startups and agencies';
			case 'ls':
				return 'services.txt  work/  blog/  contact';
			case 'cat services.txt':
				return 'startup delivery | agency delivery partner | platform stabilization';
			case 'contact':
				return 'book a project call: /contact';
			case 'clear':
				history = [];
				return '';
			default:
				return `command not found: ${cmd}`;
		}
	}

	function submit() {
		const value = input;
		history = [...history, { type: 'input', text: value }];
		const output = runCommand(value);
		if (output) history = [...history, { type: 'output', text: output }];
		trackTerminalCommand(value || '(empty)', 'lite');
		input = '';
	}
</script>

<SeoHead {...pageSeo.terminal} />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-8">
	<div
		style="
			font-family: var(--font-mono);
			background: var(--color-bg);
			border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
			border-radius: 8px;
			min-height: 65vh;
			display: flex;
			flex-direction: column;
		"
		role="region"
		aria-label="Terminal"
	>
		<div style="flex: 1; overflow: auto; padding: 1rem;" bind:this={scrollEl}>
			{#each history as entry, i (`${entry.type}-${i}-${entry.text}`)}
				{#if entry.type === 'input'}
					<div style="font-size: 0.82rem; line-height: 1.55; word-break: break-word; color: var(--color-text);">
						<span style="color: var(--color-accent);">{prompt}</span> {entry.text}
					</div>
				{:else}
					<div style="font-size: 0.82rem; line-height: 1.55; word-break: break-word; color: var(--color-muted);">
						{entry.text}
					</div>
				{/if}
			{/each}
		</div>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
			style="
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.85rem 1rem;
				border-top: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
			"
		>
			<span style="color: var(--color-accent);">{prompt}</span>
			<input
				bind:this={inputEl}
				bind:value={input}
				style="
					flex: 1;
					background: transparent;
					border: 0;
					outline: none;
					font-family: inherit;
					font-size: 0.82rem;
					color: var(--color-text);
				"
				aria-label="Terminal input"
			/>
		</form>
	</div>
</div>
