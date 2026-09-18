<script lang="ts">
	import { selectedWork } from '$lib/copy';
	const featuredWork = ['healthcasts', 'shell', 'icapital'].flatMap((slug) =>
		selectedWork.filter((project) => project.slug === slug)
	);
</script>

<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
	<h2 id="work-heading" class="section-heading">Featured Work</h2>
	<div class="projects">
		{#each featuredWork as project (project.slug)}
			<article>
				<p class="meta">{project.role} · {project.period} · via {project.employer}</p>
				<h3><a href="/work/{project.slug}" class="link-underline">{project.title}</a></h3>
				<p class="description">{project.description}</p>
				<p class="stack">{project.stack.join(' · ')}</p>
				<a href="/work/{project.slug}" class="case-link link-underline">
					Read the {project.title.split(' — ')[0]} case study →
				</a>
			</article>
		{/each}
	</div>
	<a href="/work" class="inline-flex text-sm mt-8 accent-link link-underline">
		View all work, including Angi and earlier engagements →
	</a>
</section>

<style>
	section {
		scroll-margin-top: 80px;
	}
	.projects {
		display: grid;
		gap: 32px;
	}
	article {
		border-left: 1px solid var(--color-border);
		padding-left: 24px;
	}
	.meta,
	.stack {
		color: var(--color-muted);
		font: 12px/1.8 var(--font-mono);
	}
	h3 {
		font-size: 22px;
		line-height: 1.4;
		font-weight: 500;
		margin: 8px 0 16px;
	}
	h3 a {
		color: var(--color-text);
	}
	.description {
		line-height: 1.8;
		margin-bottom: 16px;
	}
	.stack {
		margin-bottom: 16px;
	}
	.case-link {
		font-size: 14px;
		color: var(--color-text);
	}
</style>
