<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import Card from '../../components/card.svelte';
	import { selectedWork } from '$lib/copy';
</script>

<SeoHead
	title="Work — Adam Robinson"
	description="Selected engineering engagements across fintech, enterprise, and platform work. Full-stack, backend-leaning, ten-plus years."
	path="/work"
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work"
		description="Selected engagements. Each one different — different stack, different problem, different team dynamic."
	/>

	<div class="grid gap-6">
		{#each selectedWork as project (project.title)}
			<Card variant="work" class="p-6">
				<div class="case-study-header">
					<h3 class="case-study-title">{project.title}</h3>
					<span class="case-study-period">{project.period}</span>
				</div>
				<p class="case-study-role">{project.role}</p>
				<p class="body-text mt-3">{project.description}</p>
				<div class="case-study-footer">
					<div class="stack-tags">
						{#each project.stack as tag (tag)}
							<span class="stack-tag">{tag}</span>
						{/each}
					</div>
					<p class="outcome-text">↳ {project.outcome}</p>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style>
	.case-study-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.25rem;
	}

	.case-study-title {
		color: var(--color-text);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.case-study-period {
		font-size: 0.8rem;
		color: var(--color-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.case-study-role {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.case-study-footer {
		margin-top: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.stack-tag {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background-color: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		color: var(--color-accent);
	}

	.outcome-text {
		font-size: 0.85rem;
		color: var(--color-muted);
		font-style: italic;
	}
</style>
