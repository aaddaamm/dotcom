<script lang="ts">
	import { onMount } from 'svelte';
	import Books from './books.svelte';
	import SeoHead from '../../components/seo-head.svelte';
	import type { GoodreadsBook } from '$lib/types';

	let currentlyReading = $state<GoodreadsBook[]>([]);
	let readBooks = $state<GoodreadsBook[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			const [currentlyReadingRes, readBooksRes] = await Promise.all([
				fetch('/api/goodreads/currently-reading'),
				fetch('/api/goodreads/read')
			]);

			if (!currentlyReadingRes.ok || !readBooksRes.ok) {
				throw new Error('Failed to fetch book data');
			}

			currentlyReading = await currentlyReadingRes.json();
			readBooks = await readBooksRes.json();
		} catch (err) {
			error = 'Unable to load reading data. Please try again later.';
		} finally {
			loading = false;
		}
	});
</script>

<SeoHead
	title="Reading — Adam Robinson"
	description="Books Adam Robinson is currently reading and recently finished — a curated reading list spanning software engineering, design, and more."
	path="/play"
/>

<div class="max-w-4xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Reading</h1>
		<p class="page-description leading-relaxed mb-12">
			A live look at my Goodreads shelves — what I'm working through and everything I've finished.
		</p>
		{#if loading}
			<div class="flex items-center justify-center py-12">
				<div class="text-center">
					<div
						class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"
					></div>
					<p class="mt-2 text-sm muted-text">Loading books...</p>
				</div>
			</div>
		{:else if error}
			<div class="text-center py-12">
				<div class="error-message p-6 rounded-lg" role="alert">
					<h2 class="text-lg font-semibold mb-2">Unable to Load Reading Data</h2>
					<p class="text-red-600 mb-4">{error}</p>
					<button
						class="px-4 py-2 bg-accent-600 text-white rounded hover:bg-accent-700 transition-colors"
						onclick={() => window.location.reload()}
						aria-label="Reload page to try loading books again"
					>
						Try Again
					</button>
				</div>
			</div>
		{:else}
			<Books {currentlyReading} {readBooks} />
		{/if}
	</section>
</div>
