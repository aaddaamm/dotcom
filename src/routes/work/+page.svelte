<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import WorkCard from '../../components/work-card.svelte';
	import { selectedWork, earlierWork, gitLog } from '$lib/copy';
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

	<dl class="work-stats">
		<div class="work-stat-row">
			<dt class="work-stat-key">
				experience
				<span class="colon">:</span>
			</dt>
			<dd class="work-stat-val">10+ years</dd>
		</div>
		<div class="work-stat-row">
			<dt class="work-stat-key">
				sectors
				<span class="colon">:</span>
			</dt>
			<dd class="work-stat-val">
				fintech <span class="dot">·</span>
				healthcare
				<span class="dot">·</span>
				 enterprise
			</dd>
		</div>
		<div class="work-stat-row">
			<dt class="work-stat-key">
				clients
				<span class="colon">:</span>
			</dt>
			<dd class="work-stat-val">
				iCapital <span class="dot">·</span>
				Healthcasts
				<span class="dot">·</span>
				Angi
				<span class="dot">·</span>
				 Shell
			</dd>
		</div>
	</dl>

	<div class="grid gap-6">
		{#each selectedWork as project (project.title)}
			<WorkCard {project} />
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

	<section class="git-log" aria-labelledby="log-heading">
		<h2 id="log-heading" class="log-heading">git log --oneline</h2>
		<ol class="log-list">
			{#each gitLog as entry (entry.sha)}
				<li class="log-entry">
					<span class="log-sha">{entry.sha}</span>
					<span class="log-ref" class:log-ref-head={entry.ref.startsWith('HEAD')}>{entry.ref}</span>
					<span class="log-message">{entry.message}</span>
					<span class="log-period">{entry.period}</span>
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.work-stats {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.work-stat-row {
		display: flex;
		gap: 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
	}

	.work-stat-key {
		color: var(--color-accent);
		min-width: 8rem;
		flex-shrink: 0;
	}

	.work-stat-val {
		color: var(--color-text);
		margin: 0;
	}

	.colon {
		color: var(--color-muted);
	}

	.dot {
		color: var(--color-accent);
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

	.git-log {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
		padding-bottom: 3rem;
	}

	.log-heading {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
		margin-bottom: 1rem;
	}

	.log-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.log-entry {
		display: flex;
		align-items: baseline;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		flex-wrap: wrap;
	}

	.log-sha {
		color: var(--color-muted);
		flex-shrink: 0;
	}

	.log-ref {
		color: var(--color-muted);
		flex-shrink: 0;
	}

	.log-ref-head {
		color: var(--color-accent);
	}

	.log-message {
		color: var(--color-text);
		flex: 1;
		min-width: 0;
	}

	.log-period {
		color: var(--color-muted);
		flex-shrink: 0;
		margin-left: auto;
	}
</style>
