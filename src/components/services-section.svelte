<script lang="ts">
	import ServiceIcon from './service-icon.svelte';
	import { services } from '$lib/copy';
</script>

<!-- Services -->
<section id="services" aria-labelledby="services-heading" class="py-14 section-border">
	<h2 id="services-heading" class="section-heading" style="margin-bottom: 32px;">
		How I Can Help
		<span class="accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="grid gap-8">
		{#each services as service (service.title)}
			<div class="rounded-lg p-6 sm:p-8 card-base card-accent-border card-hover-lift">
				<div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
					<div class="service-icon-wrapper self-center sm:self-start">
						<ServiceIcon type={service.icon} size={40} />
					</div>
					<div class="flex-1 text-center sm:text-left">
						<h3 class="mb-2 text-xl font-semibold" style="color: var(--color-text);">
							{service.title}
						</h3>
						<p class="body-text mb-3">{service.description}</p>
					</div>
				</div>
				<div class="outcome-highlight mb-4 accent-bg-8 accent-border-15">
					<span class="outcome-icon">✓</span>
					<span class="outcome-text font-medium">{service.outcome}</span>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each service.examples as example (example)}
						<span class="example-tag accent-bg-10 accent-border-20 px-3 py-1 rounded-full text-sm">
							{example}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Consultation Guarantee -->
	<div
		class="consultation-guarantee mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
	>
		<div class="flex items-start gap-4">
			<div class="consultation-icon text-accent-500 mt-1" aria-hidden="true">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
					/>
				</svg>
			</div>
			<div>
				<h3 class="font-semibold mb-2">Risk-Free Consultation</h3>
				<p class="text-sm text-muted leading-relaxed">
					Not sure if I'm the right fit? Book a free 15-minute consultation call. If you're not
					completely satisfied with the value I provide, I'll refund the full cost of any paid
					consultation.
				</p>
			</div>
		</div>
	</div>

	<div class="mt-8 text-center">
		<p class="body-text mb-4">Ready to get started? Let's talk about your project.</p>
		<a href="/contact" class="btn-primary">Start a Conversation</a>
	</div>
</section>

<style>
	.service-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg));
		border-radius: var(--radius-lg);
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		flex-shrink: 0;
	}

	.outcome-highlight {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-radius: var(--radius-md);
	}

	.outcome-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background-color: var(--color-accent);
		color: white;
		border-radius: 50%;
		font-size: 12px;
		font-weight: bold;
		flex-shrink: 0;
	}

	.outcome-text {
		color: var(--color-accent);
		font-size: 0.95em;
	}

	.example-tag {
		color: var(--color-text);
	}
</style>
