<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import { selectedWork } from '$lib/copy';
</script>

<SeoHead
	title="Portfolio — Adam Robinson | Custom Software & Web Development"
	description="See examples of custom software solutions, website improvements, and business tools I've built for small businesses and individuals."
	path="/work"
/>

<div class="max-w-3xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Portfolio</h1>
		<p class="page-description leading-relaxed mb-12">
			Examples of custom software and tools I've built for small businesses and individuals.
		</p>
		<div class="grid gap-4">
			{#each selectedWork as project}
				<div class="rounded-lg p-6 work-card">
					<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
					<p class="muted-text">{project.description}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.work-card {
		border: 1px solid var(--color-border);
		border-left: 2px solid var(--color-accent);
		transition:
			background-color 400ms ease,
			border-color 400ms ease,
			box-shadow 400ms ease,
			transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.work-card:hover {
		transform: scale(1.02);
		background-color: color-mix(in srgb, var(--color-accent) 7%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 50%, var(--color-border));
		border-left-color: var(--color-accent);
		box-shadow: 0 4px 24px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}
</style>
