<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isSeveredUnlocked } from '$lib/stores/severance';

	onMount(() => {
		if (!isSeveredUnlocked()) {
			goto('/');
		}
	});
</script>

<section class="severed max-w-2xl mx-auto px-6 py-16">
	<p class="eyebrow">LUMON INDUSTRIES</p>
	<h1>Severed Floor</h1>
	<p>
		Welcome, refiner. Your outie granted provisional badge access. The work remains mysterious and
		important.
	</p>
	<p class="hint">
		Try <code>innie</code>
		, then
		<code>macrodata</code>
		in the terminal.
	</p>
</section>

<style>
	.severed {
		font-family: var(--font-mono);
	}

	.eyebrow {
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 12px;
	}

	h1 {
		margin: 0 0 14px;
	}

	.hint {
		margin-top: 20px;
		color: var(--color-muted);
	}
</style>
