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
		<p class="page-description leading-relaxed mb-8">
			Ready to solve your software challenges? Let's talk about your project and how I can help.
		</p>

		<!-- Guarantee Reminder -->
		<div class="guarantee-reminder mb-8 p-4 rounded-lg bg-accent-500/5 border border-accent-500/20">
			<div class="flex items-center gap-3">
				<div class="guarantee-icon text-accent-500" aria-hidden="true">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
					</svg>
				</div>
				<div class="text-sm">
					<span class="font-semibold">100% Satisfaction Guaranteed</span> • 
					<span class="text-muted">Unlimited revisions until you're completely satisfied</span>
				</div>
			</div>
		</div>

		<ContactForm />

		<div class="mt-12 pt-8 border-t border-[var(--color-border)]">
			<h2 class="text-xl font-semibold mb-4">Additional Information</h2>
			<div class="space-y-3">
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
