<script lang="ts">
import { trackCTA, trackResumeDownload } from "$lib/analytics";
import { faqItems, techStack } from "$lib/copy";
import { breadcrumbList } from "$lib/utils";
import FaqSection from "../../components/faq-section.svelte";
import JsonLd from "../../components/json-ld.svelte";
import OutcomeProof from "../../components/outcome-proof.svelte";
import PageHeader from "../../components/page-header.svelte";
import PhilosophySection from "../../components/philosophy-section.svelte";
import PublicActivitySection from "../../components/public-activity-section.svelte";
import RecentlyShipped from "../../components/recently-shipped.svelte";
import SeoHead from "../../components/seo-head.svelte";
import ServicesSection from "../../components/services-section.svelte";
import TrustStrip from "../../components/trust-strip.svelte";
</script>

<SeoHead
	title="Hire Adam Robinson — Senior Software Engineer for Product Teams"
	description="Senior software engineer in Providence, RI. I help product teams ship reliable web products faster through contract and advisory engagements."
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
	<p class="eyebrow">Senior Software Engineer • SvelteKit / TypeScript</p>

	<PageHeader
		title="I help teams ship reliable web products faster."
		description="I partner with founders and product teams to design, build, and stabilize high-impact web experiences. From new features to legacy cleanup, I focus on measurable outcomes: faster delivery, fewer regressions, and better performance."
	/>

	<div class="cta-row">
		<a
			href="/contact"
			class="btn-primary"
			onclick={() => trackCTA('Start a project', 'hire-top-primary')}
		>
			Start a project
		</a>
		<a
			href="/work"
			class="secondary-link link-underline"
			onclick={() => trackCTA('View selected work', 'hire-top-secondary')}
		>
			View selected work
		</a>
	</div>
	<p class="availability-note">Available for contract and advisory engagements.</p>

	<TrustStrip />
	<OutcomeProof />

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
				onclick={() => trackCTA('Start a project', 'hire-bottom-primary')}
			>
				Start a project
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
