<script lang="ts">
	import { trackCTA } from '$lib/analytics';
	import { heroMessaging, homepageMetrics } from '$lib/copy';
</script>

<!-- Hero -->
<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-10">
	<div class="flex items-center gap-4 mb-4">
		<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
		<h1 class="hero-name font-mono">
			adam robinson
			<span class="sr-only">— Senior Software Engineer</span>
		</h1>
	</div>
	<p class="hero-subtitle font-mono" role="doc-subtitle">SENIOR SOFTWARE ENGINEER</p>
	<p class="body-text">
		Companies hire me when they need a senior engineer — I join the team, learn the codebase, and
		start delivering. Available for full-time leadership tracks and contract execution support.
	</p>
	<p class="audience-line">
		<span>Hiring manager? I can slot in as a senior IC/tech lead.</span>
		<span>Need contract help? I can embed fast and ship with your team.</span>
	</p>
	<p class="availability-line" aria-label="Current availability">
		<span class="availability-dot" aria-hidden="true"></span>
		{heroMessaging.availability}
	</p>
	<div class="hero-stats mt-4 mb-2">
		<div class="stats-numbers">
			{#each homepageMetrics.numbers as metric (metric.label)}
				<div class="stat-item">
					<span class="stat-number">{metric.value}</span>
					<span class="stat-label">{metric.label}</span>
				</div>
			{/each}
		</div>
		<div class="stats-industries" aria-label="Industries">
			{#each homepageMetrics.industries as industry, i (industry)}
				{#if i > 0}<span class="industry-sep" aria-hidden="true">/</span>{/if}
				<span class="industry-tag">{industry}</span>
			{/each}
		</div>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 mt-3">
		<a
			href="/contact"
			class="btn-primary text-center"
			onclick={() => trackCTA('Start a conversation', 'home-hero-primary')}
		>
			Start a conversation
		</a>
		<a
			href="/hire"
			class="btn-secondary text-center"
			onclick={() => trackCTA('See hiring fit', 'home-hero-secondary')}
		>
			See hiring fit
		</a>
		<a
			href="/adam_robinson.pdf"
			class="btn-secondary text-center"
			onclick={() => trackCTA('Download résumé', 'home-hero-secondary')}
		>
			Download résumé
		</a>
	</div>
</section>

<style>
	.hero-cursor {
		width: 18px;
		height: 64px;
		border-radius: 3px;
		background-color: var(--color-accent);
		flex-shrink: 0;
	}

	.hero-name {
		font-size: 52px;
		font-weight: 500;
		letter-spacing: -1.5px;
		color: var(--color-text);
		line-height: 1;
	}

	.hero-subtitle {
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 3px;
		color: var(--color-accent);
		text-transform: uppercase;
		margin-bottom: 24px;
	}

	.hero-stats {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: flex-start;
	}

	.stats-numbers {
		display: flex;
		gap: 32px;
	}

	.stat-item {
		text-align: left;
	}

	.stat-number {
		display: block;
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--color-accent);
		font-family: var(--font-mono);
	}

	.stat-label {
		display: block;
		font-size: 0.7rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 2px;
	}

	.stats-industries {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	.industry-sep {
		color: color-mix(in srgb, var(--color-muted) 40%, transparent);
	}

	.industry-tag {
		color: var(--color-muted);
	}

	.audience-line {
		display: grid;
		gap: 0.5rem;
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: var(--color-muted);
	}

	.availability-line {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--color-text);
	}

	.availability-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--color-accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
	}
</style>
