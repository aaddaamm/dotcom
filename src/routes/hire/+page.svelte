<script lang="ts">
	import { trackCTA } from '$lib/analytics';
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import PhilosophySection from '../../components/philosophy-section.svelte';
	import FaqSection from '../../components/faq-section.svelte';
	import PublicActivitySection from '../../components/public-activity-section.svelte';
	import { techStack, faqItems } from '$lib/copy';
	import { jsonLd, breadcrumbList } from '$lib/utils';
</script>

<SeoHead
	title="Work With Me — Adam Robinson"
	description="Senior software engineer open to contract engagements and full-time roles. Ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning."
	path="/hire"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd({
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
	})}</` + `script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(
		breadcrumbList([
			{ name: 'Home', path: '/' },
			{ name: 'Hire', path: '/hire' }
		])
	)}</` + `script>`}
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work With Me"
		description="Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise. Open to contract engagements and full-time roles for the right opportunity."
	/>

	<ServicesSection />

	<PhilosophySection />

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

	<PublicActivitySection />

	<FaqSection />

	<div class="py-14 section-border">
		<div class="text-center">
			<a
				href="/contact"
				class="btn-primary px-8 py-4"
				onclick={() => trackCTA('Get In Touch', 'hire')}
			>
				Get In Touch
			</a>
			<p class="resume-link-row">
				<a href="/adam_robinson.pdf" target="_blank" rel="noopener" class="resume-link">
					Download resume (PDF) ↓
				</a>
			</p>
		</div>
	</div>
</div>

<style>
	.resume-link-row {
		margin-top: 1rem;
	}

	.resume-link {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.resume-link:hover {
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
