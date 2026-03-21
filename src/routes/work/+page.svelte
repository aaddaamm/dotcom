<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '$lib/helpers';
	import { renderElements, renderElement } from '$lib/text';
	import { workCopy } from '$lib/copy';
	import type { Element } from '$lib/types';

	let animated = $state(false);

	onMount(async () => {
		const staticContent = document.getElementById('work-static');
		if (staticContent) staticContent.remove();

		animated = true;

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
	<meta
		name="description"
		content="Professional experience and technical skills of Adam Robinson."
	/>
	<meta property="og:title" content="Work — Adam Robinson" />
	<meta
		property="og:description"
		content="Professional experience and technical skills of Adam Robinson."
	/>
	<meta property="og:image" content="https://adamrobinson.tech/og-card.png" />
	<meta property="og:url" content="https://adamrobinson.tech/work" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://adamrobinson.tech/work" />
</svelte:head>

{#if !animated}
	<div id="work-static">
		{#each workCopy as node}
			{#if typeof node.children === 'string'}
				<svelte:element this={node.type} {...node.props}>{node.children}</svelte:element>
			{:else if Array.isArray(node.children)}
				<svelte:element this={node.type} {...node.props}>
					{#each node.children as child}
						{#if typeof child === 'string'}
							{child}
						{:else}
							<svelte:element this={child.type} {...(child.props || {})}>{typeof child.children === 'string' ? child.children : ''}</svelte:element>
						{/if}
					{/each}
				</svelte:element>
			{/if}
		{/each}
	</div>
{/if}

<div>
	<div id="work-render-target"></div>
	{#if animated}
		<span>&gt;</span>
		<span id="command"></span>
		<span class="blinking-cursor">|</span>
	{/if}
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
