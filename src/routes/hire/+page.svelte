<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import FaqSection from '../../components/faq-section.svelte';
	import { techStack } from '$lib/copy';
</script>

<SeoHead
	title="Work With Me — Adam Robinson"
	description="Senior software engineer available for contract engagements. Ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning."
	path="/hire"
/>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	})}</script>`}
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work With Me"
		description="Available for contract work. Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise."
	/>

	<ServicesSection />

	<section aria-labelledby="stack-heading" class="py-14 section-border">
		<h2 id="stack-heading" class="section-heading">
			Technologies
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="stack-list">
			{#each techStack as group (group.category)}
				<div class="stack-row">
					<span class="stack-category">{group.category}</span>
					<span class="stack-items">{group.items.join(', ')}</span>
				</div>
			{/each}
		</div>
	</section>

	<FaqSection />

	<div class="py-14 section-border">
		<div class="text-center">
			<a href="/contact" class="btn-primary px-8 py-4" onclick={() => window.va?.track('CTA Clicked', { label: 'Get In Touch', location: 'hire' })}>Get In Touch</a>
		</div>
	</div>
</div>

<style>
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
		font-size: 0.75rem;
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
