<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let proseEl: HTMLElement;

	onMount(() => {
		const headings = proseEl.querySelectorAll('h2, h3');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animated');
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: '0px 0px -30% 0px', threshold: 0 }
		);
		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<SeoHead
	title="{data.post.title} — Adam Robinson"
	description={data.post.description}
	path="/blog/{data.post.slug}"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.post.title,
		description: data.post.description,
		datePublished: data.post.date,
		author: {
			'@type': 'Person',
			name: 'Adam Robinson',
			url: 'https://adamrobinson.tech'
		},
		url: `https://adamrobinson.tech/blog/${data.post.slug}`,
		keywords: data.post.tags
	})}</` + `script>`}
</svelte:head>

<article class="max-w-3xl mx-auto px-6">
	<div class="pt-20 sm:pt-28">
		<a href="/blog" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Blog
		</a>
		<div class="post-header">
			<time class="text-xs muted-text">
				{new Date(data.post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			<h1 class="page-title text-3xl font-semibold tracking-tight mt-2 mb-3">{data.post.title}</h1>
			{#if data.post.tags.length > 0}
				<div class="flex gap-2 mb-0">
					{#each data.post.tags as tag (tag)}
						<span class="tag text-xs px-2 py-0.5 rounded-full">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
		<div class="prose" bind:this={proseEl}>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.post.content}
		</div>
	</div>
</article>

<style>
	.post-header {
		border-left: 2px solid var(--color-accent);
		padding-left: 20px;
		margin-bottom: 48px;
	}

	.tag {
		color: var(--color-accent);
		background-color: color-mix(in srgb, var(--color-accent) 10%, transparent);
	}

	.prose {
		color: var(--color-text);
		line-height: 1.8;
	}

	.prose :global(h2) {
		font-size: 20px;
		font-weight: 500;
		margin-top: 48px;
		margin-bottom: 16px;
		color: var(--color-text);
		font-family: var(--font-mono);
		letter-spacing: -0.3px;
		position: relative;
		padding-bottom: 10px;
	}

	.prose :global(h2::after) {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 1px;
		background-color: var(--color-accent);
		transition: width 500ms ease-out;
	}

	.prose :global(h2.animated::after) {
		width: 100%;
	}

	.prose :global(h3) {
		font-size: 16px;
		font-weight: 500;
		margin-top: 32px;
		margin-bottom: 12px;
		color: var(--color-text);
		font-family: var(--font-mono);
		position: relative;
		padding-bottom: 6px;
	}

	.prose :global(h3::after) {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 1px;
		background-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
		transition: width 400ms ease-out;
	}

	.prose :global(h3.animated::after) {
		width: 100%;
	}

	.prose :global(p) {
		margin-bottom: 20px;
		color: var(--color-text);
	}

	.prose :global(strong) {
		font-weight: 600;
		color: var(--color-text);
	}

	.prose :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.prose :global(a:hover) {
		color: var(--color-text);
	}

	/* Inline code */
	.prose :global(code) {
		font-family: var(--font-mono);
		font-size: 13px;
		background-color: #111111;
		color: #e8e8e8;
		padding: 2px 6px;
		border-radius: 4px;
		border: 1px solid #1a1a1a;
	}

	/* Code blocks — terminal dark regardless of theme */
	.prose :global(pre) {
		background-color: #111111;
		border: 1px solid #1a1a1a;
		border-radius: 6px;
		padding: 20px;
		overflow-x: auto;
		margin-bottom: 24px;
	}

	.prose :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: 13px;
		line-height: 1.6;
		color: #e8e8e8;
	}

	.prose :global(ul) {
		list-style: none;
		padding-left: 0;
		margin-bottom: 20px;
	}

	.prose :global(ul li) {
		position: relative;
		padding-left: 20px;
		margin-bottom: 8px;
	}

	.prose :global(ul li::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 10px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--color-accent);
	}

	.prose :global(ol) {
		padding-left: 20px;
		margin-bottom: 20px;
	}

	.prose :global(ol li) {
		margin-bottom: 8px;
	}

	.prose :global(blockquote) {
		border-left: 2px solid var(--color-accent);
		padding-left: 20px;
		color: var(--color-muted);
		margin-bottom: 20px;
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: 48px 0;
	}
</style>
