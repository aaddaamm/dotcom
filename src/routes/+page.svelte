<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import HeroSection from '../components/hero-section.svelte';
	import Card from '../components/card.svelte';
	import { selectedWork } from '$lib/copy';
	import { setupScrollAnimations } from '$lib/animations';
	import { onMount } from 'svelte';

	let mainContainer: HTMLElement;

	onMount(() => {
		const cleanup = setupScrollAnimations(mainContainer);
		return cleanup;
	});
</script>

<SeoHead
	title="Adam Robinson — Senior Software Engineer"
	description="Senior software engineer with ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning."
	path="/"
/>

<div class="max-w-3xl mx-auto px-6" bind:this={mainContainer}>
	<HeroSection />

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
		<h2 id="work-heading" class="section-heading" style="margin-bottom: 32px;">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each selectedWork as project (project.title)}
				<Card variant="work" class="p-6">
					<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
					<p class="muted-text">{project.description}</p>
				</Card>
			{/each}
		</div>
		<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
			View all work &rarr;
		</a>
	</section>
</div>

<style>
	.section-border {
		border-top: 1px solid var(--color-border);
	}

	.section-heading {
		color: var(--color-text);
		margin-bottom: 24px;
	}

	.accent-dot {
		color: var(--color-accent);
	}
</style>
