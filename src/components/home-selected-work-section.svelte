<script lang="ts">
	import WorkCard from './work-card.svelte';
	import { selectedWork } from '$lib/copy';
</script>

<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
	<h2 id="work-heading" class="section-heading mb-8">
		Selected Work
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="grid gap-4">
		{#each selectedWork as project (project.title)}
			<WorkCard {project} variant="preview" />
		{/each}
	</div>
	<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
		View all work &rarr;
	</a>
</section>
