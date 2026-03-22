<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 text-center">
	<h1 class="text-3xl font-semibold tracking-tight mb-4" style="color: var(--color-text);">
		{page.status}
	</h1>
	<p class="mb-8" style="color: var(--color-muted);">
		{#if page.status === 404}
			This page doesn't exist.
		{:else}
			Something went wrong.
		{/if}
	</p>
	<a
		href="/"
		class="text-sm inline-flex items-center gap-1 transition-colors"
		style="color: var(--color-accent);"
	>
		<span aria-hidden="true">&larr;</span>
		Back to home
	</a>
</div>
