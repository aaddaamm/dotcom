<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import HeroSection from '../components/hero-section.svelte';
	import Card from '../components/card.svelte';
	import { selectedWork, techStack } from '$lib/copy';
	import { setupScrollAnimations } from '$lib/animations';
	import { onMount } from 'svelte';

	let mainContainer: HTMLElement;

	onMount(() => {
		const cleanup = setupScrollAnimations(mainContainer);
		return cleanup;
	});
</script>

<SeoHead
	title="Adam Robinson — Senior Software Engineer"
	description="Senior software engineer with ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning."
	path="/"
/>

<div class="max-w-3xl mx-auto px-6" bind:this={mainContainer}>
	<HeroSection />

	<!-- Tech Stack -->
	<section aria-labelledby="stack-heading" class="py-14 section-border">
		<h2 id="stack-heading" class="section-heading">
			Stack
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="stack-grid">
			{#each techStack as group}
				<div class="stack-group">
					<p class="stack-category">{group.category}</p>
					<ul class="stack-items">
						{#each group.items as item}
							<li>
								<button
									class="stack-item"
									onclick={(e) => {
										e.currentTarget.animate(
											[
												{ transform: 'scale(1)    translateY(0)',    color: 'var(--color-muted)' },
												{ transform: 'scale(1.3)  translateY(-6px)', color: 'var(--color-accent)', offset: 0.35 },
												{ transform: 'scale(1.15) translateY(-3px)',                              offset: 0.65 },
												{ transform: 'scale(1)    translateY(0)',    color: 'var(--color-text)' }
											],
											{ duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
										);
									}}
								>{item}</button>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
		<h2 id="work-heading" class="section-heading" style="margin-bottom: 32px;">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each selectedWork as project (project.title)}
				<Card variant="work" class="p-6">
					<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
						<h3 style="color: var(--color-text);">{project.title}</h3>
						<span class="project-period">{project.period}</span>
					</div>
					<p class="project-role mb-3">{project.role}</p>
					<p class="muted-text mb-4">{project.description}</p>
					<div class="flex flex-wrap gap-2">
						{#each project.stack as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
		<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
			View all work &rarr;
		</a>
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

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 24px;
	}

	.stack-group {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)),
			var(--color-bg)
		);
		border-radius: 4px;
		padding: 16px;
	}

	.stack-category {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-accent);
		margin-bottom: 10px;
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.stack-items li {
		font-size: 0.875rem;
	}

	.stack-item {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		font-size: 0.875rem;
		font-family: inherit;
		color: var(--color-muted);
		transition: color 150ms ease;
		display: inline-block;
		text-align: left;
		position: relative;
	}

	.stack-item::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 0;
		height: 1px;
		background-color: var(--color-accent);
		transition: width 400ms ease;
	}

	.stack-item:hover {
		color: var(--color-text);
	}

	.stack-item:hover::after {
		width: 100%;
	}


	.project-period {
		font-size: 0.75rem;
		color: var(--color-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.project-role {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--color-accent);
		font-family: var(--font-mono);
	}

	.tech-tag {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		padding: 2px 8px;
		border-radius: 3px;
		background-color: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
		color: var(--color-muted);
		border: 1px solid var(--color-border);
	}
</style>
