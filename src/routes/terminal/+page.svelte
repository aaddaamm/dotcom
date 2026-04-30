<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import Terminal from '../../components/terminal.svelte';
	import { pageSeo } from '$lib/seo';
</script>

<SeoHead {...pageSeo.terminal} />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="terminal-page max-w-3xl mx-auto px-6 py-8">
	<Terminal fullscreen />
</div>

<style>
	.terminal-page {
		display: flex;
		flex-direction: column;
	}
</style>
