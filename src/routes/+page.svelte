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

	<!-- About -->
	<section id="about" class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">About<span class="text-accent-500">.</span></h2>
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

	<!-- Approach -->
	<section id="approach" class="py-16 border-t border-white/[0.06]">
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
	<section class="py-16 border-t border-white/[0.06]">
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">Outside of Work<span class="text-accent-500">.</span></h2>
		<div class="space-y-4 text-slate-300 leading-relaxed">
			<p>
				I spend time working with 3D printing and interactive systems, and I have a deep appreciation for art and visual design.
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
		<h2 class="text-2xl font-semibold tracking-tight text-slate-50 mb-6">Contact<span class="text-accent-500">.</span></h2>
		<ul class="space-y-3">
			<li>
				<a
					href="mailto:arobinson109@icloud.com"
					class="text-slate-300 hover:text-accent-400 transition-colors"
				>
					arobinson109@icloud.com
				</a>
			</li>
			<li>
				<a
					href="https://github.com/aaddaamm"
					target="_blank"
					rel="noopener noreferrer"
					class="text-slate-300 hover:text-accent-400 transition-colors"
				>
					github.com/aaddaamm
				</a>
			</li>
			<li>
				<a
					href="https://linkedin.com/in/adam-robinson-software"
					target="_blank"
					rel="noopener noreferrer"
					class="text-slate-300 hover:text-accent-400 transition-colors"
				>
					linkedin.com/in/adam-robinson-software
				</a>
			</li>
		</ul>
	</section>
</div>

<Footer />
