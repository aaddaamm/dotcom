<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import ContactForm from '../../components/contact-form.svelte';
</script>

<SeoHead
	title="Contact — Adam Robinson | Get Started on Your Project"
	description="Ready to start your software project? Contact Adam Robinson for custom development, website help, or technical consulting. Based in Cranston, RI."
	path="/contact"
/>

<div class="max-w-3xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Get Started</h1>
		<p class="page-description leading-relaxed mb-12">
			Ready to solve your software challenges? Let's talk about your project and how I can help.
		</p>

		<ContactForm />

		<div class="mt-12 pt-8 border-t border-[var(--color-border)]">
			<h2 class="text-xl font-semibold mb-4">Prefer email?</h2>
			<div class="space-y-3">
				<p class="body-text">
					<strong>Email:</strong>
					<a href="mailto:adam@adamrobinson.tech" class="accent-link">adam@adamrobinson.tech</a>
				</p>
				<p class="body-text">
					<strong>Response time:</strong>
					 Typically within 24 hours
				</p>
				<p class="body-text">
					<strong>Location:</strong>
					 Cranston, RI (serving all of Rhode Island and remote)
				</p>
			</div>
		</div>
	</section>
</div>
