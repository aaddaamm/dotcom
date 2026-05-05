<script lang="ts">
	import { onMount } from 'svelte';
	import { createElementObserver } from '$lib/animations';
	import { SITE_URL } from '$lib/constants';
	import { breadcrumbList, formatPostDate } from '$lib/utils';
	import JsonLd from '../../../components/json-ld.svelte';
	import SeoHead from '../../../components/seo-head.svelte';
	import ShareLinks from '../../../components/share-links.svelte';

	let { data } = $props();
	let proseEl: HTMLElement;
	let postUrl = $derived(`${SITE_URL}/blog/${data.post.slug}`);

	onMount(() => {
		const observer = createElementObserver({
			className: 'animated',
			threshold: 0,
			rootMargin: '0px 0px -30% 0px'
		});
		proseEl.querySelectorAll('h2, h3').forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<SeoHead
	title="{data.post.title} — Adam Robinson"
	description={data.post.description}
	path="/blog/{data.post.slug}"
	image={data.post.image}
	type="article"
	publishedTime={data.post.date}
	modifiedTime={data.post.updated ?? data.post.date}
	tags={data.post.tags}
/>

<JsonLd
	data={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.post.title,
		description: data.post.description,
		datePublished: data.post.date,
		dateModified: data.post.updated ?? data.post.date,
		inLanguage: 'en-US',
		wordCount: data.post.wordCount,
		image: data.post.image ?? `${SITE_URL}/og-card.png`,
		author: {
			'@type': 'Person',
			name: 'Adam Robinson',
			url: SITE_URL
		},
		publisher: {
			'@type': 'Person',
			name: 'Adam Robinson',
			url: SITE_URL
		},
		url: `${SITE_URL}/blog/${data.post.slug}`,
		keywords: data.post.tags
	}}
/>

<JsonLd
	data={breadcrumbList([
		{ name: 'Home', path: '/' },
		{ name: 'Blog', path: '/blog' },
		{ name: data.post.title, path: `/blog/${data.post.slug}` }
	])}
/>

<article class="max-w-3xl mx-auto px-6">
	<div class="pt-20 sm:pt-28">
		<a href="/blog" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Blog
		</a>
		<div class="post-header">
			<time class="text-xs muted-text" datetime={data.post.date}>
				{formatPostDate(data.post.date)}
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

		<ShareLinks title={data.post.title} url={postUrl} />

		<section class="related-section" aria-labelledby="related-posts-heading">
			<h2 id="related-posts-heading" class="related-heading">Related posts</h2>
			<ul class="related-list">
				{#each data.relatedPosts as post (post.slug)}
					<li class="related-item">
						<a href="/blog/{post.slug}" class="related-link link-underline">{post.title}</a>
						<span class="related-meta">{formatPostDate(post.date)}</span>
					</li>
				{/each}
			</ul>
		</section>

		{#if data.relatedWork.length > 0}
			<section class="related-section" aria-labelledby="related-work-heading">
				<h2 id="related-work-heading" class="related-heading">Related work</h2>
				<ul class="related-list">
					{#each data.relatedWork as project (project.slug)}
						<li class="related-item">
							<a href="/work/{project.slug}" class="related-link link-underline">{project.title}</a>
							<span class="related-meta">{project.role}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
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

	.related-section {
		margin-top: 2.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-border);
	}

	.related-heading {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
		margin-bottom: 0.9rem;
	}

	.related-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.related-item {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: baseline;
		padding: 0.55rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.related-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	.related-link {
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.95rem;
	}

	.related-meta {
		color: var(--color-muted);
		font-size: 0.75rem;
		font-family: var(--font-mono);
		flex-shrink: 0;
	}
</style>
