<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import ContactForm from '../../components/contact-form.svelte';
	import { jsonLd } from '$lib/utils';
</script>

<SeoHead
	title="Let's Talk — Adam Robinson"
	description="Get in touch with Adam Robinson. Open to full-time roles, contract work, and technical consulting."
	path="/contact"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd({
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Adam Robinson',
		url: 'https://adamrobinson.tech/contact',
		mainEntity: {
			'@type': 'Person',
			name: 'Adam Robinson',
			email: 'adam@adamrobinson.tech',
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'professional inquiries',
				email: 'adam@adamrobinson.tech',
				availableLanguage: 'English'
			}
		}
	})}</` + `script>`}
</svelte:head>

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

		<div class="mt-12 pt-8 border-t border-[var(--color-border)]">
			<h2 class="text-xl font-semibold mb-4">Additional Information</h2>
			<div class="space-y-3">
				<p class="body-text">
					<strong>Response time:</strong>
					Typically within 24 hours
				</p>
			</div>
		</div>
	</section>
</div>
