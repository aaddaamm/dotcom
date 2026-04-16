<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'} — Adam Robinson</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 text-center">
	<h1 class="error-heading text-3xl font-semibold tracking-tight mb-4">
		{page.status}
	</h1>
	<p class="error-message mb-8">
		{#if page.status === 404}
			This page doesn't exist.
		{:else}
			Something went wrong.
		{/if}
	</p>
	<a href="/" class="error-back text-sm inline-flex items-center gap-1 transition-colors">
		<span aria-hidden="true">&larr;</span>
		Back to home
	</a>
</div>

<style>
	.error-heading {
		color: var(--color-text);
	}

	.error-message {
		color: var(--color-muted);
	}

	.error-back {
		color: var(--color-accent);
	}
</style>
