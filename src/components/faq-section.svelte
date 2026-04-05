<script lang="ts">
	import { faqItems } from '$lib/copy';
</script>

<!-- FAQ Section -->
<section id="faq" aria-labelledby="faq-heading" class="py-14 section-border">
	<h2 id="faq-heading" class="section-heading">
		Frequently Asked Questions
		<span class="accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="grid gap-6">
		{#each faqItems as faq (faq.question)}
			<div class="faq-item">
				<h3 class="faq-question mb-3 text-lg font-semibold" style="color: var(--color-text);">
					{faq.question}
				</h3>
				<p class="body-text">{faq.answer}</p>
			</div>
		{/each}
	</div>
	<div class="mt-8 text-center">
		<p class="body-text mb-4">Have a different question?</p>
		<a href="mailto:adam@adamrobinson.tech?subject=Project Inquiry" class="btn-primary">
			Ask Me Directly
		</a>
	</div>
</section>

<style>
	.faq-item {
		border-left: 3px solid var(--color-border);
		padding-left: 1.5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.faq-question {
		color: var(--color-text);
	}
</style>
