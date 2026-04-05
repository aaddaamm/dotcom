<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import HeroSection from '../components/hero-section.svelte';
	import ServicesSection from '../components/services-section.svelte';
	import FaqSection from '../components/faq-section.svelte';
	import Card from '../components/card.svelte';
	import { approachItems, selectedWork } from '$lib/copy';
	import { setupScrollAnimations } from '$lib/animations';
	import { onMount } from 'svelte';

	let mainContainer: HTMLElement;

	onMount(() => {
		const cleanup = setupScrollAnimations(mainContainer);
		return cleanup;
	});
</script>

<SeoHead
	title="Adam Robinson — Freelance Developer & Software Consultant | Cranston, RI"
	description="Freelance software developer helping small businesses with custom tools, website fixes, and technical consulting. Based in Cranston, RI. Available for projects of any size."
	path="/"
/>

<div class="max-w-3xl mx-auto px-6" bind:this={mainContainer}>
	<HeroSection />

	<!-- About -->
	<section id="about" aria-labelledby="about-heading" class="py-14 section-border">
		<h2 id="about-heading" class="section-heading">
			About
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="space-y-5 body-text">
			<p>
				With over a decade of experience, I focus on building software that actually works and
				solves real problems. I work directly with local business owners who need reliable solutions
				without the complexity or cost of big development firms.
			</p>
			<p>
				Living in Cranston with my family, I understand what it's like to run a local business and
				manage a budget. Whether you need a simple website fix, a custom business tool, or ongoing
				technical support, I provide the same level of expertise you'd get elsewhere, but with
				personal attention and pricing that makes sense for small businesses.
			</p>
		</div>
	</section>

	<!-- Approach -->
	<section id="approach" aria-labelledby="approach-heading" class="py-14 section-border">
		<h2 id="approach-heading" class="section-heading">
			How I Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<p class="body-text mb-6">
			I believe software should make your life easier, not harder. That means:
		</p>
		<ul class="space-y-3">
			{#each approachItems as item (item)}
				<li class="flex items-start gap-3 body-text">
					<span
						class="mt-2 block h-1.5 w-1.5 rounded-full shrink-0 accent-bg"
						aria-hidden="true"
					></span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
		<p class="muted-text mt-6">
			I focus on creating solutions that work reliably and can adapt as your business grows.
		</p>
	</section>

	<ServicesSection />

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
		<h2 id="work-heading" class="section-heading" style="margin-bottom: 32px;">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each selectedWork as project (project.title)}
				<Card variant="work" class="p-6">
					<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
					<p class="muted-text">{project.description}</p>
				</Card>
			{/each}
		</div>
		<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
			View all work &rarr;
		</a>
	</section>

	<FaqSection />

	<!-- AI Section -->
	<section aria-labelledby="ai-heading" class="py-14 section-border">
		<h2 id="ai-heading" class="section-heading">
			AI-Assisted Development
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="rounded-lg p-6 space-y-4 ai-card">
			<p class="body-text">
				I use modern AI tools to work faster and deliver better results for clients.
			</p>
			<p class="muted-text">
				This means I can tackle complex problems more efficiently while keeping costs reasonable for
				small businesses.
			</p>
		</div>
	</section>

	<!-- Why Local -->
	<section aria-labelledby="local-heading" class="py-14 section-border">
		<h2 id="local-heading" class="section-heading">
			Why Work With a Local Developer?
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="benefit-card p-6 rounded-lg">
				<div class="benefit-icon mb-3">💬</div>
				<h3 class="font-semibold mb-3 text-lg">Direct Communication</h3>
				<p class="body-text">
					No project managers or middlemen. You work directly with me, in your timezone, speaking
					your language.
				</p>
			</div>
			<div class="benefit-card p-6 rounded-lg">
				<div class="benefit-icon mb-3">🎯</div>
				<h3 class="font-semibold mb-3 text-lg">Right-Sized Solutions</h3>
				<p class="body-text">
					I understand small business needs and build solutions that fit your actual budget and
					requirements.
				</p>
			</div>
			<div class="benefit-card p-6 rounded-lg">
				<div class="benefit-icon mb-3">🏡</div>
				<h3 class="font-semibold mb-3 text-lg">Local & Invested</h3>
				<p class="body-text">
					I live here with my family and care about our local business community. I'm here for the
					long term when you need updates, fixes, or want to grow.
				</p>
			</div>
		</div>
	</section>

	<!-- Get Started -->
	<section aria-labelledby="started-heading" class="py-14 section-border">
		<h2 id="started-heading" class="section-heading">
			Ready to Get Started?
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="bg-gradient rounded-lg p-8 text-center">
			<p class="body-text mb-6 text-lg">
				Most projects start with a simple conversation about what you need.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
				<a href="/contact" class="btn-primary px-8 py-4">Get Started Today</a>
				<a href="/work" class="btn-secondary px-8 py-4">See Past Projects</a>
			</div>
			<p class="muted-text text-sm">
				I typically respond within 24 hours with next steps and a rough timeline.
			</p>
		</div>
	</section>

	<!-- Contact -->
	<section id="contact" aria-labelledby="contact-heading" class="py-14 section-border">
		<h2 id="contact-heading" class="section-heading">
			Contact
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<ul class="space-y-3">
			<li>
				<a href="mailto:adam@adamrobinson.tech" class="contact-link link-underline">
					adam@adamrobinson.tech
				</a>
			</li>
			<li>
				<a
					href="https://github.com/aaddaamm"
					target="_blank"
					rel="noopener noreferrer me"
					class="contact-link link-underline"
				>
					github.com/aaddaamm
				</a>
			</li>
			<li>
				<a
					href="https://linkedin.com/in/adam-robinson-software"
					target="_blank"
					rel="noopener noreferrer me"
					class="contact-link link-underline"
				>
					linkedin.com/in/adam-robinson-software
				</a>
			</li>
		</ul>
		<div class="mt-6 pt-4 border-t border-[var(--color-border)]">
			<p class="text-sm font-medium mb-3">More from me:</p>
			<div class="flex flex-wrap gap-4">
				<a href="/play" class="text-sm accent-link link-underline">📚 Current Reading</a>
				<a href="/teach" class="text-sm accent-link link-underline">🎯 Learning Resources</a>
			</div>
		</div>
		<p class="text-sm mt-6 muted-text">Based in Cranston, RI</p>
	</section>
</div>

<style>
	.section-border {
		border-top: 1px solid var(--color-border);
	}

	.section-heading {
		color: var(--color-text);
		margin-bottom: 24px;
	}

	.accent-dot {
		color: var(--color-accent);
	}

	.ai-card {
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		background-color: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
	}

	.bg-gradient {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)) 0%,
			color-mix(in srgb, var(--color-accent) 3%, var(--color-bg)) 100%
		);
		border: 1px solid color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.benefit-card {
		border: 1px solid var(--color-border);
		transition:
			background-color var(--transition-normal) ease,
			border-color var(--transition-normal) ease,
			transform var(--transition-normal) ease;
	}

	.benefit-card:hover {
		background-color: color-mix(in srgb, var(--color-accent) 3%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 20%, var(--color-border));
		transform: var(--lift-sm);
	}

	.benefit-card h3 {
		color: var(--color-text);
	}

	.benefit-icon {
		font-size: 2rem;
		line-height: 1;
		opacity: 0.8;
	}
</style>
