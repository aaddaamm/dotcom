<script lang="ts">
	import { trackCTA, trackResumeDownload } from '$lib/analytics';
	import { faqItems, positioning, techStack } from '$lib/copy';
	import { breadcrumbList } from '$lib/utils';
	import FaqSection from '../../components/faq-section.svelte';
	import JsonLd from '../../components/json-ld.svelte';
	import OutcomeProof from '../../components/outcome-proof.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import PhilosophySection from '../../components/philosophy-section.svelte';
	import PublicActivitySection from '../../components/public-activity-section.svelte';
	import RecentlyShipped from '../../components/recently-shipped.svelte';
	import SeoHead from '../../components/seo-head.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import TrustStrip from '../../components/trust-strip.svelte';
	import { EMAIL, SITE_URL } from '$lib/constants';
	import { pageSeo } from '$lib/seo';
</script>

<SeoHead {...pageSeo.hire} />

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

<JsonLd
	data={{
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${SITE_URL}/hire#software-consulting`,
		name: 'Adam Robinson Software Engineering',
		description:
			'Providence-based senior software engineer and technical lead for senior/staff roles and select longer-term embedded consulting engagements.',
		url: `${SITE_URL}/hire`,
		email: EMAIL,
		areaServed: [
			{
				'@type': 'State',
				name: 'Rhode Island'
			},
			{
				'@type': 'City',
				name: 'Providence'
			},
			{
				'@type': 'Country',
				name: 'United States'
			}
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Providence',
			addressRegion: 'RI',
			addressCountry: 'US'
		},
		founder: {
			'@id': `${SITE_URL}/#person`
		},
		knowsAbout: [
			'product and platform delivery',
			'embedded senior engineering',
			'platform modernization',
			'technical leadership',
			'engineer mentorship',
			'web application development'
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Senior engineering contribution themes',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Difficult roadmap ownership'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Platform modernization'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Team delivery and mentorship'
					}
				}
			]
		}
	}}
/>

<div class="max-w-3xl mx-auto px-6">
	<p class="eyebrow">Senior Software Engineer • React / TypeScript / Rails</p>

	<PageHeader title="Senior/staff role fit" description={positioning.summary} />

	<div class="cta-row">
		<a
			href="/contact"
			class="btn-primary"
			onclick={() => trackCTA('Start a conversation', 'hire-top-primary')}
		>
			Start a conversation
		</a>
		<a
			href="/work"
			class="secondary-link link-underline"
			onclick={() => trackCTA('View selected work', 'hire-top-secondary')}
		>
			View selected work
		</a>
	</div>
	<p class="role-statement">
		Open to full-time senior or staff roles with meaningful product and platform ownership.
	</p>
	<p class="availability-note">{positioning.consultingNote}</p>

	<TrustStrip />
	<OutcomeProof />

	<ServicesSection />

	<section aria-labelledby="location-heading" class="py-14 section-border location-availability">
		<h2 id="location-heading" class="section-heading">
			Providence and remote availability
			<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
		</h2>
		<p class="body-text">
			I am based in Providence, Rhode Island. Recent engagements have been fully remote, and I am
			comfortable with async communication, distributed teams, and working across time zones.
		</p>
	</section>

	<PhilosophySection />

	<section aria-labelledby="stack-heading" class="py-14 section-border">
		<h2 id="stack-heading" class="section-heading">
			Technologies
			<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
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
				onclick={() => trackCTA('Start a conversation', 'hire-bottom-primary')}
			>
				Start a conversation
			</a>
			<div class="resume-link-row" aria-label="Resume download options">
				<a
					href="/adam_robinson.pdf"
					target="_blank"
					rel="noopener"
					class="resume-link"
					onclick={() => trackResumeDownload('hire-page', 'pdf')}
				>
					Download resume (PDF)
				</a>
				<span class="resume-sep" aria-hidden="true">·</span>
				<a
					href="/adam_robinson.docx"
					target="_blank"
					rel="noopener"
					class="resume-link"
					onclick={() => trackResumeDownload('hire-page', 'docx')}
				>
					DOCX
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.eyebrow {
		margin-top: 5rem;
		margin-bottom: -4.5rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.resume-link-row {
		margin-top: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
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

	.resume-sep {
		color: var(--color-muted);
	}

	.cta-row {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
		margin-top: -1.5rem;
		margin-bottom: 0.75rem;
	}

	.secondary-link {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--color-muted);
	}

	.availability-note {
		margin-bottom: 2rem;
		font-size: 0.875rem;
		color: var(--color-muted);
	}

	.role-statement {
		margin: 0 0 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.location-availability {
		display: grid;
		gap: 1rem;
	}

	.location-availability p {
		margin: 0;
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
