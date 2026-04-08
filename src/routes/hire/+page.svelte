<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import ServicesSection from '../../components/services-section.svelte';
	import FaqSection from '../../components/faq-section.svelte';
</script>

<SeoHead
	title="Work With Me — Adam Robinson"
	description="Available for freelance and contract software development. Custom websites, automation, and consulting for businesses."
	path="/hire"
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Work With Me"
		description="Available for contract and freelance engagements. Let's talk about your project."
	/>

	<ServicesSection />

	<FaqSection />

	<div class="py-14" style="border-top: 1px solid var(--color-border);">
		<div class="text-center">
			<a href="/contact" class="btn-primary px-8 py-4">Get In Touch</a>
		</div>
	</div>
</div>
