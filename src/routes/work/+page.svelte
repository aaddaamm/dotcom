<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '$lib/helpers';
	import { renderElements, renderElement } from '$lib/text';
	import { workCopy } from '$lib/copy';
	import type { Element } from '$lib/types';

	onMount(async () => {
		await sleep(80);
		const commandRenderTarget = document.getElementById('command') || document.createElement('div');
		const element: Element = {
			type: 'span',
			children: 'site --work',
			props: {
				class: 'inline pb-4'
			}
		};

		await renderElement(element, commandRenderTarget);

		await sleep(200);

		// remove the command text
		commandRenderTarget.remove();

		const workRenderTarget =
			document.getElementById('work-render-target') || document.createElement('div');
		await renderElements(workCopy, workRenderTarget);
	});
</script>

<svelte:head>
	<title>Work — Adam Robinson</title>
	<meta name="description" content="Professional experience and technical skills of Adam Robinson." />
	<meta property="og:title" content="Work — Adam Robinson" />
	<meta property="og:description" content="Professional experience and technical skills of Adam Robinson." />
	<meta property="og:url" content="https://adamrobinson.tech/work" />
	<link rel="canonical" href="https://adamrobinson.tech/work" />
</svelte:head>

<div>
	<div id="work-render-target"></div>
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
