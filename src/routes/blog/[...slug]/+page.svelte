<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import { createElementObserver } from '$lib/animations';
	import { jsonLd, breadcrumbList } from '$lib/utils';
	import { SITE_URL } from '$lib/constants';
	import { onMount } from 'svelte';

	let { data } = $props();
	let proseEl: HTMLElement;

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
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd({
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
	})}</` + `script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(
		breadcrumbList([
			{ name: 'Home', path: '/' },
			{ name: 'Blog', path: '/blog' },
			{ name: data.post.title, path: `/blog/${data.post.slug}` }
		])
	)}</` + `script>`}
</svelte:head>

<article class="max-w-3xl mx-auto px-6">
	<div class="pt-20 sm:pt-28">
		<a href="/blog" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Blog
		</a>
		<div class="post-header">
			<time class="text-xs muted-text" datetime={data.post.date}>
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
</style>
