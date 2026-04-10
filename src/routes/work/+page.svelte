<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import Card from '../../components/card.svelte';
	import { selectedWork, earlierWork } from '$lib/copy';
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

	<div class="work-stats">
		<div class="work-stat">
			<span class="work-stat-value">10+</span>
			<span class="work-stat-label">Years</span>
		</div>
		<span class="work-stat-divider" aria-hidden="true">·</span>
		<div class="work-stat">
			<span class="work-stat-value">Fintech</span>
			<span class="work-stat-label">iCapital</span>
		</div>
		<span class="work-stat-divider" aria-hidden="true">·</span>
		<div class="work-stat">
			<span class="work-stat-value">Healthcare</span>
			<span class="work-stat-label">Healthcasts</span>
		</div>
		<span class="work-stat-divider" aria-hidden="true">·</span>
		<div class="work-stat">
			<span class="work-stat-value">Enterprise</span>
			<span class="work-stat-label">Angi · Shell</span>
		</div>
	</div>

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

	<section class="earlier-work" aria-labelledby="earlier-heading">
		<h2 id="earlier-heading" class="earlier-heading">Earlier work</h2>
		<ul class="earlier-list">
			{#each earlierWork as engagement (engagement.name)}
				<li class="earlier-item">
					<span class="earlier-name">{engagement.name}</span>
					<span class="earlier-meta">
						<span class="earlier-industry">{engagement.industry}</span>
						<span class="earlier-period">{engagement.period}</span>
					</span>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.work-stats {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem 1.25rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.work-stat {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.work-stat-value {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text);
		font-family: var(--font-mono);
	}

	.work-stat-label {
		font-size: 0.7rem;
		color: var(--color-muted);
		letter-spacing: 0.3px;
	}

	.work-stat-divider {
		color: var(--color-border);
		font-size: 1rem;
		line-height: 1;
		align-self: center;
	}

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

	.earlier-work {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.earlier-heading {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
		margin-bottom: 1rem;
	}

	.earlier-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.earlier-item {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.earlier-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	.earlier-name {
		font-size: 0.9rem;
		color: var(--color-text);
	}

	.earlier-meta {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		flex-shrink: 0;
	}

	.earlier-industry {
		font-size: 0.75rem;
		color: var(--color-muted);
	}

	.earlier-period {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		color: var(--color-muted);
	}
</style>
