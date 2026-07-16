<script lang="ts">
	import { trackCTA, trackResumeDownload } from '$lib/analytics';
	import { faqItems, techStack } from '$lib/copy';
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
			'Providence, Rhode Island software engineering consultant for startups, agencies, and product teams that need senior engineering experience across product delivery, platform modernization, and production reliability.',
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
			'product engineering',
			'web application development',
			'platform modernization',
			'production reliability',
			'technical leadership',
			'staff augmentation',
			'startup delivery'
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Software engineering services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Startup product delivery'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Agency development partner'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Platform stabilization and modernization'
					}
				}
			]
		}
	}}
/>

<div class="max-w-3xl mx-auto px-6">
	<p class="eyebrow">Senior Software Engineer • React / TypeScript / Rails</p>

	<PageHeader
		title="Senior engineering ownership for teams that need to ship."
		description="I'm open to full-time senior or staff roles and select contract engagements. I take ownership of production software, from new product work to platform stabilization."
	/>

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
	<p class="availability-note">
		Available for full-time senior/staff roles and select contract/advisory engagements.
	</p>

	<TrustStrip />
	<OutcomeProof />

	<ServicesSection />

	<section aria-labelledby="local-service-heading" class="py-14 section-border local-service">
		<h2 id="local-service-heading" class="section-heading">
			Providence software consulting for practical delivery
			<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
		</h2>
		<p class="body-text">
			I work with Rhode Island startups, agencies, and local businesses that need a senior software
			engineer who can step into real production constraints: unfinished product ideas, legacy
			systems, fragile integrations, slow internal tools, or a small team that needs more delivery
			capacity without adding process overhead.
		</p>
		<ul class="local-service-list">
			<li>Build or stabilize web applications across whatever stack the business already uses.</li>
			<li>Help agencies ship client work without hiding behind vague technical language.</li>
			<li>Modernize brittle platforms while preserving the workflows the business depends on.</li>
		</ul>
		<p class="body-text muted-text local-service-note">
			Most work is remote, with Providence and Rhode Island availability when local context or
			in-person planning helps the project move faster.
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

	.local-service {
		display: grid;
		gap: 1rem;
	}

	.local-service-list {
		display: grid;
		gap: 0.6rem;
		margin: 0;
		padding-left: 1.1rem;
		color: var(--color-text);
	}

	.local-service-note {
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
