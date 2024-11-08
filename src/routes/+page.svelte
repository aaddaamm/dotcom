<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '$lib/helpers';
	import { renderElements, renderElement } from '$lib/text';
	import { introCopy } from '$lib/copy';
	import type { Element } from '$lib/types';

	onMount(async () => {
		sleep(80);
		// render the command text
		const commandRenderTarget = document.getElementById('command') || document.createElement('div');
		const element: Element = {
			type: 'span',
			children: 'site --intro',
			props: {
				className: 'inline pb-4'
			}
		};

		await renderElement(element, commandRenderTarget);

		await sleep(200);

		// remove the command text
		commandRenderTarget.remove();

		// render the copy text
		const copyRenderTarget =
			document.getElementById('copy-render-target') || document.createElement('div');
		await renderElements(introCopy, copyRenderTarget);
	});
</script>

<div class="w-full">
	<div id="copy-render-target"></div>
	<span>&gt;</span>
	<span id="command"></span>
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
