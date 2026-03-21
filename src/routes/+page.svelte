<svelte:head>
	<title>Adam Robinson — Lead Software Engineer</title>
	<meta
		name="description"
		content="Lead Software Engineer building backend systems and workflow-driven platforms."
	/>
	<meta property="og:title" content="Adam Robinson — Lead Software Engineer" />
	<meta
		property="og:description"
		content="I build backend systems and workflow-driven platforms that support complex, real-world applications."
	/>
	<meta property="og:image" content="https://adamrobinson.tech/og-card.png" />
	<meta property="og:url" content="https://adamrobinson.tech" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://adamrobinson.tech" />
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<!-- Hero -->
	<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-10">
		<div class="flex items-center gap-4 mb-4">
			<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
			<h1 class="hero-name font-mono">adam robinson</h1>
		</div>
		<p class="hero-subtitle font-mono" role="doc-subtitle">LEAD SOFTWARE ENGINEER</p>
		<p class="body-text">
			I build backend systems and workflow-driven platforms that support complex, real-world
			applications.
		</p>
	</section>

	<!-- About -->
	<section id="about" aria-labelledby="about-heading" class="py-14 section-border">
		<h2 id="about-heading" class="section-heading">
			About
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="space-y-5 body-text">
			<p>
				With over a decade of experience, I focus on designing systems that are reliable,
				maintainable, and adaptable to evolving requirements. My work spans internal tools,
				financial systems, and full-stack applications across a variety of domains.
			</p>
			<p>
				I'm particularly drawn to software that enables creative and cross-disciplinary teams —
				tools that connect how people think and work with the systems that support them.
			</p>
		</div>
	</section>

	<!-- Approach -->
	<section id="approach" aria-labelledby="approach-heading" class="py-16 section-border">
		<h2 id="approach-heading" class="section-heading">
			How I Think About Systems
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<p class="body-text mb-6">
			I approach software as something that needs to live and evolve over time. That means focusing
			on:
		</p>
		<ul class="space-y-3">
			{#each ['Clear system boundaries and responsibilities', 'Flexibility for changing requirements', 'Simplicity where possible, structure where necessary', 'Supporting the people who use and maintain the system'] as item}
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
			The goal isn't just to build something that works today, but something that continues to work
			as the problem changes.
		</p>
	</section>

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-16 section-border">
		<h2 id="work-heading" class="section-heading" style="margin-bottom: 32px;">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each [{ title: 'Workflow & Internal Tooling Systems', description: 'Designed backend systems that support flexible, user-defined workflows and dynamic data models. These systems allow teams to adapt processes without constant redevelopment.' }, { title: 'Serverless Content Platform', description: 'Re-architected a legacy CMS into a modern serverless platform. Reduced operational overhead while improving performance and simplifying content management.' }, { title: 'Financial & Transactional Systems', description: 'Built systems handling payments, policy data, and document generation. Focused on correctness, data integrity, and long-term reliability.' }] as project}
				<div class="rounded-lg p-6 work-card">
					<h3 class="mb-2" style="color: var(--color-text);">{project.title}</h3>
					<p class="muted-text">{project.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- AI Section -->
	<section aria-labelledby="ai-heading" class="py-16 section-border">
		<h2 id="ai-heading" class="section-heading">
			AI-Assisted Development
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="rounded-lg p-6 space-y-4 ai-card">
			<p class="body-text">
				I actively use AI-assisted development tools as part of my daily workflow, including GitHub
				Copilot and Claude-based integrations.
			</p>
			<p class="muted-text">
				These tools help accelerate iteration and exploration while maintaining strong engineering
				judgment and code quality.
			</p>
		</div>
	</section>

	<!-- Outside of Work -->
	<section aria-labelledby="outside-heading" class="py-16 section-border">
		<h2 id="outside-heading" class="section-heading">
			Outside of Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="space-y-4">
			<p class="body-text">
				I spend time working with 3D printing and interactive systems, and I have a deep
				appreciation for art and visual design.
			</p>
			<p class="muted-text">
				These interests influence how I think about software—not just as systems, but as tools that
				enable real-world and creative outcomes.
			</p>
			<a href="/play" class="inline-flex items-center gap-1 text-sm mt-2 accent-link">
				See what I'm reading &rarr;
			</a>
		</div>
	</section>

	<!-- Contact -->
	<section id="contact" aria-labelledby="contact-heading" class="py-16 section-border">
		<h2 id="contact-heading" class="section-heading">
			Contact
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<ul class="space-y-3">
			<li>
				<a href="mailto:adam@adamrobinson.tech" class="contact-link">adam@adamrobinson.tech</a>
			</li>
			<li>
				<a
					href="https://github.com/aaddaamm"
					target="_blank"
					rel="noopener noreferrer me"
					class="contact-link"
				>
					github.com/aaddaamm
				</a>
			</li>
			<li>
				<a
					href="https://linkedin.com/in/adam-robinson-software"
					target="_blank"
					rel="noopener noreferrer me"
					class="contact-link"
				>
					linkedin.com/in/adam-robinson-software
				</a>
			</li>
		</ul>
		<p class="text-sm mt-6 muted-text">Based in Providence, RI — open to relocation.</p>
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

	.body-text {
		color: var(--color-text);
	}

	.muted-text {
		color: var(--color-muted);
	}

	.work-card {
		border: 1px solid var(--color-border);
		border-left: 2px solid var(--color-accent);
	}

	.ai-card {
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		background-color: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
	}

	.accent-link {
		color: var(--color-accent);
		transition: color 150ms ease;
	}

	.accent-link:hover {
		color: var(--color-text);
	}

	.contact-link {
		color: var(--color-muted);
		transition: color 150ms ease;
	}

	.contact-link:hover {
		color: var(--color-text);
	}

	.contact-link:focus-visible,
	.accent-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}
</style>
