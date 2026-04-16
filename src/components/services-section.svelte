<script lang="ts">
	import ServiceIcon from './service-icon.svelte';
	import { services } from '$lib/copy';
</script>

<!-- Services -->
<section id="services" aria-labelledby="services-heading" class="py-14 section-border">
	<h2 id="services-heading" class="section-heading mb-8">
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
						<h3 class="service-title mb-2 text-xl font-semibold">
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

	<div class="mt-8 text-center">
		<p class="body-text mb-4">
			Interested in working together? You'll deal directly with me — no middlemen, no ramp-up
			delays. Most engagements can start within a week or two.
		</p>
		<a href="/contact" class="btn-primary" onclick={() => window.va?.track('CTA Clicked', { label: 'Get In Touch', location: 'services' })}>Get In Touch</a>
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
