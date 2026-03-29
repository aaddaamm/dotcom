<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';

	let { data } = $props();
</script>

<SeoHead
	title="{data.post.title} — Adam Robinson"
	description={data.post.description}
	path="/blog/{data.post.slug}"
/>

<svelte:head>
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
	})}</script>`}
</svelte:head>

<article class="max-w-3xl mx-auto px-6">
	<div class="pt-20 sm:pt-28">
		<a href="/blog" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Blog
		</a>
		<time class="text-xs muted-text">
			{new Date(data.post.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</time>
		<h1 class="page-title text-3xl font-semibold tracking-tight mt-2 mb-3">{data.post.title}</h1>
		{#if data.post.tags.length > 0}
			<div class="flex gap-2 mb-10">
				{#each data.post.tags as tag}
					<span class="tag text-xs px-2 py-0.5 rounded-full">{tag}</span>
				{/each}
			</div>
		{/if}
		<div class="prose">
			{@html data.post.content}
		</div>
	</div>
</article>

<style>
	.tag {
		color: var(--color-accent);
		background-color: color-mix(in srgb, var(--color-accent) 10%, transparent);
	}

	.prose {
		color: var(--color-text);
		line-height: 1.8;
	}

	.prose :global(h2) {
		font-size: 22px;
		font-weight: 500;
		margin-top: 40px;
		margin-bottom: 16px;
		color: var(--color-text);
	}

	.prose :global(h3) {
		font-size: 18px;
		font-weight: 500;
		margin-top: 32px;
		margin-bottom: 12px;
		color: var(--color-text);
	}

	.prose :global(p) {
		margin-bottom: 20px;
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

	.prose :global(code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		background-color: color-mix(in srgb, var(--color-border) 50%, var(--color-bg));
		padding: 2px 6px;
		border-radius: 4px;
	}

	.prose :global(pre) {
		background-color: color-mix(in srgb, var(--color-border) 30%, var(--color-bg));
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 20px;
		overflow-x: auto;
		margin-bottom: 24px;
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
		font-size: 13px;
		line-height: 1.6;
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
		margin: 40px 0;
	}
</style>
