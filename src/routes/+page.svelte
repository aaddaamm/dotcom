<script lang="ts">
	import Footer from '../components/footer.svelte';
</script>

<svelte:head>
	<title>Adam Robinson — Lead Software Engineer</title>
	<meta name="description" content="Lead Software Engineer building backend systems and workflow-driven platforms." />
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<!-- Hero -->
	<section class="pt-20 sm:pt-28 pb-12">
		<p class="text-sm font-medium tracking-widest uppercase text-accent-400/70 mb-4">Adam Robinson</p>
		<h1 class="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-slate-50 mb-6">
			I build backend systems and workflow-driven platforms that support complex, real-world applications.
		</h1>
		<p class="text-lg text-slate-400">Lead Software Engineer</p>
		<div class="mt-8 h-px w-16 bg-accent-500/40"></div>
	</section>

	<!-- Intro -->
	<section class="py-16 border-t border-white/[0.06]">
		<div class="space-y-5 text-slate-300 leading-relaxed">
			<p>
				With over 10 years of experience, I focus on designing systems that are reliable,
				maintainable, and adaptable to evolving requirements. My work spans internal tools,
				financial systems, and full-stack applications across a variety of domains.
			</p>
			<p>
				I'm particularly interested in software that enables teams—tools that help people
				design, create, and operate more effectively.
			</p>
		</div>
	</section>

	<!-- How I Think -->
	<section class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">How I Think About Systems<span class="text-accent-500">.</span></h2>
		<p class="text-slate-300 leading-relaxed mb-6">
			I approach software as something that needs to live and evolve over time. That means focusing on:
		</p>
		<ul class="space-y-3">
			{#each [
				'Clear system boundaries and responsibilities',
				'Flexibility for changing requirements',
				'Simplicity where possible, structure where necessary',
				'Supporting the people who use and maintain the system'
			] as item}
				<li class="flex items-start gap-3 text-slate-300">
					<span class="mt-2 block h-1.5 w-1.5 rounded-full bg-accent-500 flex-shrink-0"></span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
		<p class="text-slate-500 mt-6 leading-relaxed">
			The goal isn't just to build something that works today, but something that continues
			to work as the problem changes.
		</p>
	</section>

	<!-- Selected Work -->
	<section id="work" class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-8">Selected Work<span class="text-accent-500">.</span></h2>
		<div class="grid gap-4">
			{#each [
				{
					title: 'Workflow & Internal Tooling Systems',
					description: 'Designed backend systems that support flexible, user-defined workflows and dynamic data models. These systems allow teams to adapt processes without constant redevelopment.'
				},
				{
					title: 'Serverless Content Platform',
					description: 'Re-architected a legacy CMS into a modern serverless platform. Reduced operational overhead while improving performance and simplifying content management.'
				},
				{
					title: 'Financial & Transactional Systems',
					description: 'Built systems handling payments, policy data, and document generation. Focused on correctness, data integrity, and long-term reliability.'
				}
			] as project}
				<div class="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 border-l-2 border-l-accent-500/30">
					<h3 class="font-semibold text-slate-100 mb-2">{project.title}</h3>
					<p class="text-slate-400 leading-relaxed">{project.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- AI Section -->
	<section class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">AI-Assisted Development<span class="text-accent-500">.</span></h2>
		<div class="rounded-lg border border-accent-500/20 bg-accent-950/30 p-6 space-y-4">
			<p class="text-slate-200 leading-relaxed">
				I actively use AI-assisted development tools as part of my daily workflow, including
				GitHub Copilot and Claude-based integrations.
			</p>
			<p class="text-slate-400 leading-relaxed">
				These tools help accelerate iteration and exploration while maintaining strong
				engineering judgment and code quality.
			</p>
		</div>
	</section>

	<!-- Outside of Work -->
	<section id="reading" class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">Outside of Work<span class="text-accent-500">.</span></h2>
		<div class="space-y-4 text-slate-300 leading-relaxed">
			<p>
				I spend time working with 3D printing, interactive systems, and digital art.
				I'm also a lifelong gamer — the Legend of Zelda series holds a special place,
				along with Final Fantasy and whatever else pulls me in on the Switch or PS5.
			</p>
			<p class="text-slate-500">
				These interests influence how I think about software—not just as systems, but as
				tools that enable real-world and creative outcomes.
			</p>
			<a
				href="/play"
				class="inline-flex items-center gap-1 text-sm text-accent-400 hover:text-accent-300 transition-colors mt-2"
			>
				See what I'm reading &rarr;
			</a>
		</div>
	</section>

	<!-- Contact -->
	<section id="contact" class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">Get in Touch<span class="text-accent-500">.</span></h2>
		<div class="flex flex-col sm:flex-row gap-3">
			<a
				href="https://github.com/aaddaamm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm text-slate-300 hover:border-accent-500/30 hover:text-accent-400 transition-colors"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
				</svg>
				github.com/aaddaamm
			</a>
			<a
				href="mailto:arobinson109@icloud.com"
				class="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm text-slate-300 hover:border-accent-500/30 hover:text-accent-400 transition-colors"
			>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
				</svg>
				arobinson109@icloud.com
			</a>
		</div>
	</section>
</div>

<Footer />
