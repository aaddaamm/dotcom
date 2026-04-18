<script lang="ts">
	import { trackCTA } from '$lib/analytics';
	import { availability, homepageMetrics } from '$lib/copy';
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
		start delivering. Full-stack, backend-leaning, ten-plus years across fintech, healthcare, and
		enterprise. You work directly with me, not an agency.
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

	{#if availability.available}
		<div class="availability-badge mt-6 mb-1">
			<span class="availability-dot" aria-hidden="true"></span>
			<span>{availability.label}</span>
		</div>
	{/if}

	<div class="flex flex-col sm:flex-row gap-3 mt-3">
		<a href="/work" class="btn-primary text-center" onclick={() => trackCTA('See My Work', 'hero')}>
			See My Work
		</a>
		<a
			href="/contact"
			class="btn-secondary text-center"
			onclick={() => trackCTA('Get In Touch', 'hero')}
		>
			Get In Touch
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

	.availability-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--color-muted);
	}

	.availability-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color-available);
		flex-shrink: 0;
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-available) 25%, transparent);
	}
</style>
