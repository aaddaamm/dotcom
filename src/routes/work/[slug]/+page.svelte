<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import PageHeader from '../../../components/page-header.svelte';
	import CaseStudy from '../../../components/case-study.svelte';
	import JsonLd from '../../../components/json-ld.svelte';
	import { breadcrumbList } from '$lib/utils';

	let { data } = $props();

	let project = $derived(data.project);
	let prev = $derived(data.prev);
	let next = $derived(data.next);

	function companyName(title: string) {
		return title.split('—')[0].trim();
	}

	let projectCompany = $derived(companyName(project.title));
	let seoDescription = $derived(project.seoDescription ?? project.description);
</script>

<SeoHead
	title="{projectCompany} Case Study — Adam Robinson"
	description={seoDescription}
	path="/work/{project.slug}"
/>

<JsonLd
	data={breadcrumbList([
		{ name: 'Home', path: '/' },
		{ name: 'Work', path: '/work' },
		{ name: projectCompany, path: `/work/${project.slug}` }
	])}
/>

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
		<CaseStudy
			situation={project.caseStudy.situation}
			work={project.caseStudy.work}
			outcome={project.caseStudy.outcome}
		/>
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
