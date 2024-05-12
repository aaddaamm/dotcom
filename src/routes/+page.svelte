<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '$lib';
	import { renderLine, renderLines } from '$lib/text';

	const copy = [
		"Building software for more than 15 years. I've worked on everything from Insurance Software to commercial power grid planning software.",
		"I enjoy gaming and reading fantasy books. I'm a father of 4 and the proud owner of a mini Berna-doodle"
	];

	onMount(async () => {
		await sleep(1000);

		// render the command text
		const commandRenderTarget = document.getElementById('command') || document.createElement('div');
		const classes = 'inline pb-4';
		await renderLine('site --info', commandRenderTarget, classes);

		await sleep(500);

		// remove the command text
		commandRenderTarget.remove();

		// render the copy text
		const copyRenderTarget =
			document.getElementById('copy-render-target') || document.createElement('div');
		await renderLines(copy, copyRenderTarget);
	});
</script>

<div>
	<div id="copy-render-target" />
	<span>{'>'}</span>
	<span id="command" />
	<span class="blinking-cursor">|</span>
</div>

<style>
	.blinking-cursor {
		animation: blink 1s steps(2, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
