<script lang="ts">
	import { trackCTA, trackResumeDownload } from '$lib/analytics';
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import PhilosophySection from '../../components/philosophy-section.svelte';
	import FaqSection from '../../components/faq-section.svelte';
	import PublicActivitySection from '../../components/public-activity-section.svelte';
	import TrustStrip from '../../components/trust-strip.svelte';
	import RecentlyShipped from '../../components/recently-shipped.svelte';
	import { techStack, faqItems } from '$lib/copy';
	import JsonLd from '../../components/json-ld.svelte';
	import { breadcrumbList } from '$lib/utils';
</script>

<SeoHead
	title="Hire Adam Robinson — Senior Software Engineer"
	description="Senior software engineer in Providence, RI. Open to contract and full-time roles. Rails, Node.js, TypeScript. Ten-plus years across fintech and healthcare."
	path="/hire"
/>

<JsonLd
	data={{
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
	}}
/>

<JsonLd
	data={breadcrumbList([
		{ name: 'Home', path: '/' },
		{ name: 'Hire', path: '/hire' }
	])}
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work With Me"
		description="Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise. Open to contract engagements and full-time roles for the right opportunity."
	/>

	<div class="cta-row">
		<a
			href="/contact"
			class="btn-primary"
			onclick={() => trackCTA('Get In Touch', 'hire-top-primary')}
		>
			Get In Touch
		</a>
		<a
			href="/work"
			class="btn-secondary"
			onclick={() => trackCTA('See My Work', 'hire-top-secondary')}
		>
			See My Work
		</a>
	</div>

	<TrustStrip />

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

	<RecentlyShipped />

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
				<a
					href="/adam_robinson.pdf"
					target="_blank"
					rel="noopener"
					class="resume-link"
					onclick={() => trackResumeDownload('hire-page', 'pdf')}
				>
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

	.cta-row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: -1.5rem;
		margin-bottom: 2rem;
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
