<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import FaqSection from '../../components/faq-section.svelte';
	import { techStack } from '$lib/copy';
</script>

<SeoHead
	title="Work With Me — Adam Robinson"
	description="Senior software engineer available for staff augmentation and contract engagements. Ten-plus years across fintech, healthcare, and enterprise."
	path="/hire"
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work With Me"
		description="Available for contract and staff augmentation engagements. Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise."
	/>

	<ServicesSection />

	<section aria-labelledby="stack-heading" class="py-14 section-border">
		<h2 id="stack-heading" class="section-heading">
			Technologies
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="stack-list">
			{#each techStack as group}
				<div class="stack-row">
					<span class="stack-category">{group.category}</span>
					<span class="stack-items">{group.items.join(', ')}</span>
				</div>
			{/each}
		</div>
	</section>

	<FaqSection />

	<div class="py-14" style="border-top: 1px solid var(--color-border);">
		<div class="text-center">
			<a href="/contact" class="btn-primary px-8 py-4">Get In Touch</a>
		</div>
	</div>
</div>

<style>
	.section-border {
		border-top: 1px solid var(--color-border);
	}

	.section-heading {
		color: var(--color-text);
		margin-bottom: 20px;
	}

	.accent-dot {
		color: var(--color-accent);
	}

	.stack-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.stack-row {
		display: flex;
		gap: 16px;
		align-items: baseline;
	}

	.stack-category {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-accent);
		min-width: 90px;
		flex-shrink: 0;
	}

	.stack-items {
		font-size: 0.875rem;
		color: var(--color-muted);
	}
</style>
