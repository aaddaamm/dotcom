<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import { approachItems, selectedWork, services, faqItems } from '$lib/copy';
</script>

<SeoHead
	title="Adam Robinson — Freelance Developer & Software Consultant | Providence, RI"
	description="Freelance software developer helping small businesses with custom tools, website fixes, and technical consulting. Based in Providence, RI. Available for projects of any size."
	path="/"
/>

<div class="max-w-3xl mx-auto px-6">
	<!-- Hero -->
	<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-10">
		<div class="flex items-center gap-4 mb-4">
			<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
			<h1 class="hero-name font-mono">adam robinson</h1>
		</div>
		<p class="hero-subtitle font-mono" role="doc-subtitle">SOFTWARE CONSULTANT & FREELANCER</p>
		<p class="body-text">
			I help small businesses save time and money with custom software solutions. 
			From fixing broken websites to building tools that automate your daily tasks.
		</p>
		<div class="hero-stats flex flex-wrap gap-6 mt-4 mb-2">
			<div class="stat-item">
				<span class="stat-number">10+</span>
				<span class="stat-label">Years Experience</span>
			</div>
			<div class="stat-item">
				<span class="stat-number">$100-150</span>
				<span class="stat-label">Per Hour</span>
			</div>
			<div class="stat-item">
				<span class="stat-number">24hr</span>
				<span class="stat-label">Response Time</span>
			</div>
		</div>
		<div class="flex flex-col sm:flex-row gap-3 mt-6">
			<a href="#services" class="cta-button px-6 py-3 rounded-lg font-semibold text-center transition-colors">
				See How I Can Help
			</a>
			<a href="mailto:adam@adamrobinson.tech" class="contact-button px-6 py-3 rounded-lg font-semibold text-center transition-colors border">
				Get In Touch
			</a>
		</div>
	</section>

	<!-- About -->
	<section id="about" aria-labelledby="about-heading" class="py-14 section-border">
		<h2 id="about-heading" class="section-heading">
			About
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="space-y-5 body-text">
			<p>
				With over a decade of experience, I focus on building software that actually works and solves real problems. 
				I work with small businesses, startups, and individuals who need custom solutions or help with existing systems.
			</p>
			<p>
				I specialize in taking complex technical problems and turning them into simple, reliable solutions. 
				Whether you need a custom tool built from scratch or help fixing something that's broken, I can help.
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
			{#each approachItems as item}
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

	<!-- Services -->
	<section id="services" aria-labelledby="services-heading" class="py-14 section-border">
		<h2 id="services-heading" class="section-heading" style="margin-bottom: 32px;">
			How I Can Help
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-6">
			{#each services as service}
				<div class="rounded-lg p-6 service-card">
					<h3 class="mb-3 text-lg font-semibold" style="color: var(--color-text);">{service.title}</h3>
					<p class="body-text mb-3">{service.description}</p>
					<p class="outcome-text mb-4 font-medium">{service.outcome}</p>
					<div class="flex flex-wrap gap-2">
						{#each service.examples as example}
							<span class="example-tag px-3 py-1 rounded-full text-sm">{example}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<p class="body-text mb-4">Ready to get started? Let's talk about your project.</p>
			<a href="mailto:adam@adamrobinson.tech" class="cta-button px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
				Start a Conversation
			</a>
		</div>
	</section>

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
		<h2 id="work-heading" class="section-heading" style="margin-bottom: 32px;">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each selectedWork as project}
				<div class="rounded-lg p-6 work-card">
					<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
					<p class="muted-text">{project.description}</p>
				</div>
			{/each}
		</div>
		<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
			View all work &rarr;
		</a>
	</section>

	<!-- FAQ Section -->
	<section id="faq" aria-labelledby="faq-heading" class="py-14 section-border">
		<h2 id="faq-heading" class="section-heading">
			Frequently Asked Questions
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-6">
			{#each faqItems as faq}
				<div class="faq-item">
					<h3 class="faq-question mb-3 text-lg font-semibold" style="color: var(--color-text);">{faq.question}</h3>
					<p class="body-text">{faq.answer}</p>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<p class="body-text mb-4">Have a different question?</p>
			<a href="mailto:adam@adamrobinson.tech?subject=Project Inquiry" class="cta-button px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
				Ask Me Directly
			</a>
		</div>
	</section>

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
				This means I can tackle complex problems more efficiently while keeping costs reasonable for small businesses.
			</p>
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
				<a href="mailto:adam@adamrobinson.tech?subject=Project Inquiry" class="cta-button px-8 py-4 rounded-lg font-semibold transition-colors">
					Email Me Your Idea
				</a>
				<a href="/work" class="contact-button px-8 py-4 rounded-lg font-semibold transition-colors border">
					See Past Projects
				</a>
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
				<a href="mailto:adam@adamrobinson.tech" class="contact-link link-underline">adam@adamrobinson.tech</a>
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
		<p class="text-sm mt-6 muted-text">Based in Providence, RI</p>
	</section>
</div>

<style>
	.hero-cursor {
		width: 18px;
		height: 64px;
		border-radius: 3px;
		background-color: var(--color-accent);
		flex-shrink: 0;
	}

	.hero-name {
		font-size: 52px;
		font-weight: 500;
		letter-spacing: -1.5px;
		color: var(--color-text);
		line-height: 1;
	}

	.hero-subtitle {
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 3px;
		color: var(--color-accent);
		text-transform: uppercase;
		margin-bottom: 24px;
	}

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

	.accent-bg {
		background-color: var(--color-accent);
	}

	.work-card {
		border: 1px solid var(--color-border);
		border-left: 2px solid var(--color-accent);
		transition:
			background-color 400ms ease,
			border-color 400ms ease,
			box-shadow 400ms ease,
			transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.work-card:hover {
		transform: scale(1.02);
		background-color: color-mix(in srgb, var(--color-accent) 7%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 50%, var(--color-border));
		border-left-color: var(--color-accent);
		box-shadow: 0 4px 24px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.ai-card {
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		background-color: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
	}

	.cta-button {
		background-color: var(--color-accent);
		color: white;
	}

	.cta-button:hover {
		background-color: color-mix(in srgb, var(--color-accent) 85%, white);
	}

	.contact-button {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.contact-button:hover {
		background-color: var(--color-accent);
		color: white;
	}

	.service-card {
		border: 1px solid var(--color-border);
		border-left: 3px solid var(--color-accent);
		transition: background-color 400ms ease, border-color 400ms ease, transform 300ms ease;
	}

	.service-card:hover {
		background-color: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border));
	}

	.example-tag {
		background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg));
		color: var(--color-text);
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
	}

	.outcome-text {
		color: var(--color-accent);
		font-size: 0.95em;
	}

	.faq-item {
		border-left: 3px solid var(--color-border);
		padding-left: 1.5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.faq-question {
		color: var(--color-text);
	}

	.bg-gradient {
		background: linear-gradient(135deg, 
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)) 0%, 
			color-mix(in srgb, var(--color-accent) 3%, var(--color-bg)) 100%);
		border: 1px solid color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.hero-stats {
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	.stat-item {
		text-align: center;
		min-width: 80px;
	}

	.stat-number {
		display: block;
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--color-accent);
		font-family: var(--font-mono);
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 0.25rem;
	}

</style>
