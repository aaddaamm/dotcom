<script lang="ts">
	import { trackCTA } from '$lib/analytics';
	import { EMAIL, SITE_URL } from '$lib/constants';
	import { breadcrumbList } from '$lib/utils';
	import ContactForm from '../../components/contact-form.svelte';
	import ContactProcess from '../../components/contact-process.svelte';
	import JsonLd from '../../components/json-ld.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import OutcomeProof from '../../components/outcome-proof.svelte';
	import SeoHead from '../../components/seo-head.svelte';
	import { pageSeo } from '$lib/seo';
</script>

<SeoHead {...pageSeo.contact} />

<JsonLd
	data={{
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Adam Robinson',
		url: `${SITE_URL}/contact`,
		mainEntity: {
			'@type': 'Person',
			name: 'Adam Robinson',
			email: EMAIL,
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'professional inquiries',
				email: EMAIL,
				availableLanguage: 'English'
			}
		}
	}}
/>

<JsonLd
	data={breadcrumbList([
		{ name: 'Home', path: '/' },
		{ name: 'Contact', path: '/contact' }
	])}
/>

<div class="max-w-3xl mx-auto px-6">
	<section>
		<PageHeader
			title="Start a project"
			description="Tell me what you're building, what's blocked, and the timeline you have in mind. I review every message personally and reply within 24 hours with clear next steps."
			descriptionClass="mb-6"
		/>

		<div class="cta-row" aria-label="Contact page actions">
			<a
				href="/hire"
				class="btn-secondary"
				onclick={() => trackCTA('See how I work', 'contact-top-secondary')}
			>
				See how I work
			</a>
			<a
				href="/work"
				class="btn-secondary"
				onclick={() => trackCTA('View selected work', 'contact-top-secondary-work')}
			>
				View selected work
			</a>
		</div>

		<ContactProcess />

		<OutcomeProof />

		<ContactForm />
	</section>
</div>

<style>
	.cta-row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}
</style>
