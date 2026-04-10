<script lang="ts">
	import Card from './card.svelte';

	interface WorkItem {
		title: string;
		period: string;
		role: string;
		description: string;
		stack: string[];
		outcome: string;
	}

	let { project, variant = 'full' }: { project: WorkItem; variant?: 'preview' | 'full' } = $props();
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
</style>
