<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import ContactForm from '../../components/contact-form.svelte';
	import JsonLd from '../../components/json-ld.svelte';
	import { breadcrumbList } from '$lib/utils';
	import { SITE_URL, EMAIL } from '$lib/constants';
</script>

<SeoHead
	title="Let's Talk — Adam Robinson"
	description="Get in touch with Adam Robinson — senior software engineer in Providence, RI. Available for contract and full-time roles in Rails, Node.js, and TypeScript."
	path="/contact"
/>

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
	<section class="pt-20 sm:pt-28">
		<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Let's Talk</h1>
		<p class="page-description leading-relaxed mb-8">
			Whether you're hiring, have a project, or just want to connect — reach out and I'll get back
			to you within 24 hours.
		</p>

		<ContactForm />
	</section>
</div>
