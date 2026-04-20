<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';

	let { data } = $props();
</script>

<SeoHead
	title="Blog — Adam Robinson"
	description="Writing on backend engineering, Rails, Node.js, and TypeScript — practical insights from ten-plus years across fintech, healthcare, and enterprise."
	path="/blog"
/>

<div class="max-w-3xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Blog</h1>
		<p class="page-description leading-relaxed mb-12">
			Writing about systems, tools, and how software gets built.
		</p>

		{#if data.posts.length === 0}
			<p class="muted-text">Nothing here yet — check back soon.</p>
		{:else}
			<div class="space-y-6">
				{#each data.posts as post (post.slug)}
					<a href="/blog/{post.slug}" class="post-card block rounded-lg p-6">
						<time class="text-xs muted-text" datetime={post.date}>
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						<h2 class="text-lg font-semibold mt-1 flex items-center gap-2 post-title">
							{post.title}
							{#if !post.published}
								<span class="draft-badge text-xs font-normal px-2 py-0.5 rounded">draft</span>
							{/if}
						</h2>
						<p class="muted-text mt-2 text-sm">{post.description}</p>
						{#if post.tags.length > 0}
							<div class="flex gap-2 mt-3">
								{#each post.tags as tag (tag)}
									<span class="tag text-xs px-2 py-0.5 rounded-full">{tag}</span>
								{/each}
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.post-title {
		color: var(--color-text);
	}

	.post-card {
		border: 1px solid var(--color-border);
		border-left: 2px solid var(--color-accent);
		text-decoration: none;
		transition:
			background-color 400ms ease,
			border-color 400ms ease,
			box-shadow 400ms ease,
			transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.post-card:hover {
		transform: scale(1.02);
		background-color: color-mix(in srgb, var(--color-accent) 7%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 50%, var(--color-border));
		border-left-color: var(--color-accent);
		box-shadow: 0 4px 24px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.post-card:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 8px;
	}

	.tag {
		color: var(--color-accent);
		background-color: color-mix(in srgb, var(--color-accent) 10%, transparent);
	}

	.draft-badge {
		color: var(--color-muted, #888);
		background-color: color-mix(in srgb, currentColor 12%, transparent);
		border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
	}
</style>
