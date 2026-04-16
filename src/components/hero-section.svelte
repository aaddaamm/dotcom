<script lang="ts">
	import { availability } from '$lib/copy';
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
	<div class="hero-stats flex flex-wrap gap-6 mt-4 mb-2">
		<div class="stat-item">
			<span class="stat-number">10+</span>
			<span class="stat-label">Years Experience</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">Full</span>
			<span class="stat-label">Stack</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">Team</span>
			<span class="stat-label">Lead</span>
		</div>
	</div>

	{#if availability.available}
		<div class="availability-badge mt-6 mb-1">
			<span class="availability-dot" aria-hidden="true"></span>
			<span>{availability.label}</span>
		</div>
	{/if}

	<div class="flex flex-col sm:flex-row gap-3 mt-3">
		<a
			href="/work"
			class="btn-primary text-center"
			onclick={() => window.va?.track('CTA Clicked', { label: 'See My Work', location: 'hero' })}
		>
			See My Work
		</a>
		<a
			href="/contact"
			class="btn-secondary text-center"
			onclick={() => window.va?.track('CTA Clicked', { label: 'Get In Touch', location: 'hero' })}
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
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	.stat-item {
		text-align: center;
		min-width: 80px;
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
		font-size: 0.75rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 0.25rem;
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
