<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import Card from '../../components/card.svelte';
	import { selectedWork } from '$lib/copy';
</script>

<SeoHead
	title="Portfolio — Adam Robinson | Custom Software & Web Development"
	description="See examples of custom software solutions, website improvements, and business tools I've built for small businesses and individuals."
	path="/work"
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Portfolio"
		description="Examples of custom software and tools I've built for small businesses and individuals."
	/>

	<div class="grid gap-4">
		{#each selectedWork as project (project.title)}
			<Card variant="work" class="p-6">
				<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
				<p class="muted-text">{project.description}</p>
			</Card>
		{/each}
	</div>
</div>
