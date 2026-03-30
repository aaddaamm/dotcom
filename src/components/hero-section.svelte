<script lang="ts">
	import { TRANSFORMS } from '$lib/design-tokens';
</script>

<!-- Hero -->
<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-10">
	<div class="flex items-center gap-4 mb-4">
		<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
		<h1 class="hero-name font-mono">adam robinson</h1>
	</div>
	<p class="hero-subtitle font-mono" role="doc-subtitle">SOFTWARE CONSULTANT & FREELANCER</p>
	<p class="body-text">
		I work directly with small local businesses to solve software problems that matter to you. Get
		personalized attention and solutions built to fit your actual budget and timeline.
	</p>
	<div class="hero-stats flex flex-wrap gap-6 mt-4 mb-2">
		<div class="stat-item">
			<span class="stat-number">10+</span>
			<span class="stat-label">Years Experience</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">Project</span>
			<span class="stat-label">Based Rates</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">24hr</span>
			<span class="stat-label">Response Time</span>
		</div>
	</div>
	
	<!-- Satisfaction Guarantee Badge -->
	<div class="guarantee-badge accent-bg-5 accent-border-20 flex items-center gap-3 mt-6 p-4 rounded-lg">
		<div class="guarantee-icon text-accent-500" aria-hidden="true">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2L3 7L12 12L21 7L12 2Z" opacity="0.5" />
				<path d="M3 17L12 22L21 17" />
				<path d="M3 12L12 17L21 12" />
			</svg>
		</div>
		<div class="guarantee-text">
			<div class="font-semibold text-sm">100% Satisfaction Guarantee</div>
			<div class="text-xs text-muted">Unlimited revisions until you're completely satisfied</div>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 mt-6">
		<a href="/contact" class="btn-primary text-center">
			Start Your Project
		</a>
		<a href="#services" class="btn-secondary text-center">
			See How I Can Help
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
</style>