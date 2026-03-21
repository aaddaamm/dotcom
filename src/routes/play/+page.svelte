<script lang="ts">
	import Books from './books.svelte';
</script>

<svelte:head>
	<title>Reading — Adam Robinson</title>
	<meta name="description" content="Books Adam Robinson is currently reading and recently finished — a curated reading list spanning software engineering, design, and more." />
	<meta property="og:title" content="Reading — Adam Robinson" />
	<meta
		property="og:description"
		content="Books Adam Robinson is currently reading and recently finished — a curated reading list spanning software engineering, design, and more."
	/>
	<meta property="og:image" content="https://adamrobinson.tech/og-card.png" />
	<meta property="og:url" content="https://adamrobinson.tech/play" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://adamrobinson.tech/play" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a
			href="/"
			class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors"
		>
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Reading</h1>
		<p class="page-description leading-relaxed mb-12">
			A live look at my Goodreads shelves — what I'm working through and everything I've finished.
		</p>
		<Books />
	</section>
</div>

<style>
	.back-link {
		color: var(--color-muted);
	}
	.back-link:hover {
		color: var(--color-accent);
	}
	.page-title {
		color: var(--color-text);
	}
	.page-description {
		color: var(--color-muted);
	}
</style>
