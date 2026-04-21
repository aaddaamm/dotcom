<script lang="ts">
	import Card from './card.svelte';
	import CaseStudy from './case-study.svelte';
	import { getFilter, toggle } from '$lib/stores/work-filter.svelte';

	interface CaseStudyData {
		situation: string;
		work: string;
		outcome: string;
	}

	interface WorkItem {
		slug?: string;
		title: string;
		period: string;
		role: string;
		description?: string;
		seoDescription?: string;
		stack: string[];
		outcome?: string;
		caseStudy?: CaseStudyData;
	}

	let { project, variant = 'full' }: { project: WorkItem; variant?: 'preview' | 'full' } = $props();
</script>

<Card variant="work" class="p-6">
	<div class="header">
		<h3 class="title">{project.title}</h3>
		<span class="period">{project.period}</span>
	</div>

	<div class="meta-row">
		<span class="meta-role">{project.role}</span>
		{#if project.slug && variant === 'full'}
			<a href="/work/{project.slug}" class="case-study-link">full case study →</a>
		{/if}
	</div>

	<div class="meta-stack">
		{#each project.stack as tag (tag)}
			{#if variant === 'full'}
				<button
					class="stack-tag"
					class:active={getFilter() === tag}
					aria-pressed={getFilter() === tag}
					onclick={() => toggle(tag)}
				>
					{tag}
				</button>
			{:else}
				<span class="stack-tag muted">{tag}</span>
			{/if}
		{/each}
	</div>

	{#if variant === 'preview' && project.description}
		<p class="body-text">{project.description}</p>
	{/if}

	{#if project.caseStudy && variant === 'full'}
		<CaseStudy
			situation={project.caseStudy.situation}
			work={project.caseStudy.work}
			outcome={project.caseStudy.outcome}
		/>
	{/if}
</Card>

<style>
	.header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}

	.title {
		color: var(--color-text);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.period {
		font-size: 0.8rem;
		color: var(--color-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.meta-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.meta-role {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.meta-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 1.25rem;
	}

	.body-text {
		font-size: 0.9rem;
		color: var(--color-text);
		line-height: 1.7;
		margin: 0 0 1rem;
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

	.stack-tag.muted {
		border-color: var(--color-border);
		color: var(--color-muted);
	}

	button.stack-tag {
		cursor: pointer;
		line-height: inherit;
		appearance: none;
	}

	button.stack-tag:hover {
		background-color: color-mix(in srgb, var(--color-accent) 15%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
	}

	.stack-tag.active {
		background-color: color-mix(in srgb, var(--color-accent) 20%, var(--color-bg));
		border-color: var(--color-accent);
	}

	.case-study-link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
		white-space: nowrap;
	}

	.case-study-link:hover {
		color: var(--color-accent);
	}
</style>
