<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import PageHeader from '../../../components/page-header.svelte';
	import { jsonLd, breadcrumbList } from '$lib/utils';

	let { data } = $props();

	let project = $derived(data.project);
	let prev = $derived(data.prev);
	let next = $derived(data.next);

	function companyName(title: string) {
		return title.split('—')[0].trim();
	}

	let projectCompany = $derived(companyName(project.title));
	let seoDescription = $derived(
		project.seoDescription ?? project.description
	);
</script>

<SeoHead
	title="{projectCompany} Case Study — Adam Robinson"
	description={seoDescription}
	path="/work/{project.slug}"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(
		breadcrumbList([
			{ name: 'Home', path: '/' },
			{ name: 'Work', path: '/work' },
			{ name: projectCompany, path: `/work/${project.slug}` }
		])
	)}</` + `script>`}
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title={project.title}
		description="{project.role} · {project.period}"
		backHref="/work"
		backLabel="back to work"
	/>

	<div class="stack-tags">
		{#each project.stack as tag (tag)}
			<span class="stack-tag">{tag}</span>
		{/each}
	</div>

	{#if project.caseStudy}
		<div class="case-study">
			<div class="cs-section">
				<span class="cs-label">situation</span>
				<p class="cs-body">{project.caseStudy.situation}</p>
			</div>
			<div class="cs-section">
				<span class="cs-label">work</span>
				<p class="cs-body">{project.caseStudy.work}</p>
			</div>
			<div class="cs-section">
				<span class="cs-label">outcome</span>
				<p class="cs-body">{project.caseStudy.outcome}</p>
			</div>
		</div>
	{/if}

	<div class="cs-cta">
		<a href="/contact" class="btn-primary">Get In Touch</a>
		<a href="/hire" class="btn-secondary">See How I Work</a>
	</div>

	<nav class="case-study-nav" aria-label="Case study navigation">
		<div class="nav-prev">
			{#if prev}
				<a href="/work/{prev.slug}" class="nav-link">
					<span class="nav-arrow">←</span>
					<span class="nav-label">{companyName(prev.title)}</span>
				</a>
			{/if}
		</div>
		<div class="nav-next">
			{#if next}
				<a href="/work/{next.slug}" class="nav-link">
					<span class="nav-label">{companyName(next.title)}</span>
					<span class="nav-arrow">→</span>
				</a>
			{/if}
		</div>
	</nav>
</div>

<style>
	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2.5rem;
	}

	.stack-tag {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background-color: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-muted);
	}

	.case-study {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.cs-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.cs-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
	}

	.cs-body {
		font-size: 1rem;
		color: var(--color-text);
		line-height: 1.8;
		margin: 0;
	}

	.cs-cta {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 3rem;
	}

	.case-study-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4rem;
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		border-top: 1px solid var(--color-border);
	}

	.nav-prev {
		flex: 1;
	}

	.nav-next {
		flex: 1;
		text-align: right;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.nav-link:hover {
		color: var(--color-accent);
	}

	.nav-arrow {
		flex-shrink: 0;
	}
</style>
