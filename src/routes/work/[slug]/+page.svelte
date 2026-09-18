<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import PageHeader from '../../../components/page-header.svelte';
	import JsonLd from '../../../components/json-ld.svelte';
	import { breadcrumbList } from '$lib/utils';

	type CaseStudyProject = {
		title: string;
		slug: string;
		employer: string;
		role: string;
		period: string;
		description: string;
		seoDescription?: string;
		stack: string[];
		impactMetric?: string;
		caseStudy?: {
			situation: string;
			work: string;
			outcome: string;
		};
		constraints?: string[];
		decisions?: string[];
		tradeoffs?: string[];
		results?: string[];
	};

	let { data } = $props();

	let project = $derived(data.project as CaseStudyProject);
	let prev = $derived(data.prev as CaseStudyProject | null);
	let next = $derived(data.next as CaseStudyProject | null);

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
		description="{project.role} · via {project.employer} · {project.period}"
		backHref="/work"
		backLabel="back to work"
	/>

	<p class="case-intro">{project.description}</p>
	{#if project.impactMetric}
		<p class="impact-metric">{project.impactMetric}</p>
	{/if}
	{#if project.caseStudy}
		<section class="detail-block" aria-labelledby="problem-heading">
			<h2 id="problem-heading" class="detail-heading">The problem and my role</h2>
			<p class="case-copy">{project.caseStudy.situation}</p>
		</section>
	{/if}

	{#if project.constraints?.length}
		<section class="detail-block" aria-labelledby="constraints-heading">
			<h2 id="constraints-heading" class="detail-heading">Constraints</h2>
			<ul class="detail-list">
				{#each project.constraints as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if project.decisions?.length}
		<section class="detail-block" aria-labelledby="decisions-heading">
			<h2 id="decisions-heading" class="detail-heading">Technical approach</h2>
			<ul class="detail-list">
				{#each project.decisions as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if project.tradeoffs?.length}
		<section class="detail-block" aria-labelledby="tradeoffs-heading">
			<h2 id="tradeoffs-heading" class="detail-heading">Tradeoffs</h2>
			<ul class="detail-list">
				{#each project.tradeoffs as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if project.caseStudy}
		<section class="detail-block" aria-labelledby="built-heading">
			<h2 id="built-heading" class="detail-heading">What I built</h2>
			<p class="case-copy">{project.caseStudy.work}</p>
		</section>
		<section class="detail-block" aria-labelledby="outcome-heading">
			<h2 id="outcome-heading" class="detail-heading">Outcome</h2>
			<p class="case-copy">{project.caseStudy.outcome}</p>
		</section>
	{/if}
	<div class="stack-tags" aria-label="Technologies used">
		{#each project.stack as tag (tag)}
			<span class="stack-tag">{tag}</span>
		{/each}
	</div>

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
	.case-intro,
	.case-copy {
		line-height: 1.8;
	}
	.case-intro {
		margin-bottom: 24px;
		font-size: 18px;
	}
	.stack-tags {
		margin-top: 32px;
	}
	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.impact-metric {
		font-size: 0.82rem;
		font-family: var(--font-mono);
		color: var(--color-accent);
		margin: 0 0 2rem;
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

	.detail-block {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.detail-heading {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		margin-bottom: 0.6rem;
	}

	.detail-list {
		margin: 0;
		padding-left: 1rem;
		display: grid;
		gap: 0.4rem;
		font-size: 0.9rem;
		color: var(--color-text);
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
