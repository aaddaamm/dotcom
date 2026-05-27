<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import { pageSeo } from '$lib/seo';
</script>

<SeoHead {...pageSeo.terminal} />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-16">
	<h1 class="section-heading mb-4">Terminal</h1>
	<p class="body-text">The interactive terminal is currently offline while the site is being optimized.</p>
</div>
