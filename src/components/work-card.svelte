<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Card from './card.svelte';

	interface CaseStudy {
		situation: string;
		work: string;
		outcome: string;
	}

	interface WorkItem {
		title: string;
		period: string;
		role: string;
		description: string;
		stack: string[];
		outcome: string;
		caseStudy?: CaseStudy;
	}

	let { project, variant = 'full' }: { project: WorkItem; variant?: 'preview' | 'full' } = $props();

	let expanded = $state(false);
</script>

<Card variant="work" class="p-6">
	<div class="header">
		<h3 class="title">{project.title}</h3>
		<span class="period">{project.period}</span>
	</div>
	<p class="role">{project.role}</p>
	<p class="body-text mt-3">{project.description}</p>
	<div class="footer">
		<div class="stack-tags">
			{#each project.stack as tag (tag)}
				<span class="stack-tag" class:muted={variant === 'preview'}>{tag}</span>
			{/each}
		</div>
		{#if variant === 'full'}
			<p class="outcome">↳ {project.outcome}</p>
		{/if}
	</div>

	{#if project.caseStudy && variant === 'full'}
		<div class="toggle-row">
			<button class="toggle" onclick={() => (expanded = !expanded)}>
				{expanded ? '↑ collapse' : '↓ case study'}
			</button>
		</div>

		{#if expanded}
			<div class="case-study" transition:slide={{ duration: 300, easing: cubicOut }}>
				<div class="cs-section" in:fly={{ y: 10, duration: 220, delay: 80, easing: cubicOut }}>
					<span class="cs-label">situation</span>
					<p class="cs-body">{project.caseStudy.situation}</p>
				</div>
				<div class="cs-section" in:fly={{ y: 10, duration: 220, delay: 160, easing: cubicOut }}>
					<span class="cs-label">work</span>
					<p class="cs-body">{project.caseStudy.work}</p>
				</div>
				<div class="cs-section" in:fly={{ y: 10, duration: 220, delay: 240, easing: cubicOut }}>
					<span class="cs-label">outcome</span>
					<p class="cs-body">{project.caseStudy.outcome}</p>
				</div>
			</div>
		{/if}
	{/if}
</Card>

<style>
	.header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.25rem;
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

	.role {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.footer {
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

	.stack-tag.muted {
		border-color: var(--color-border);
		color: var(--color-muted);
	}

	.outcome {
		font-size: 0.85rem;
		color: var(--color-muted);
		font-style: italic;
	}

	.toggle-row {
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.toggle {
		background: none;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 0.3rem 0.7rem;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text);
		transition:
			color 150ms ease,
			border-color 150ms ease;
	}

	.toggle:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	.case-study {
		margin-top: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.cs-section {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.cs-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
	}

	.cs-body {
		font-size: 0.9rem;
		color: var(--color-text);
		line-height: 1.7;
		margin: 0;
	}
</style>
