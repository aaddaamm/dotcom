<script lang="ts">
	import BookCard from '../../components/book-card.svelte';
	import type { GoodreadsBook } from '$lib/types';

	let {
		currentlyReading,
		readBooks
	}: { currentlyReading: GoodreadsBook[]; readBooks: GoodreadsBook[] } = $props();

	let showAllRead = $state(false);

	const READ_PREVIEW_COUNT = 12;

	let visibleReadBooks = $derived(showAllRead ? readBooks : readBooks.slice(0, READ_PREVIEW_COUNT));
</script>

<div class="space-y-16 pb-16">
	<!-- Currently Reading -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="section-title text-xl font-semibold tracking-tight">Currently Reading</h2>
			{#if currentlyReading.length > 0}
				<span class="badge badge-accent text-xs font-medium px-2 py-0.5 rounded-full">
					{currentlyReading.length}
				</span>
			{/if}
		</div>
		<p class="text-sm muted-text mb-6">What I'm working through right now.</p>

		{#if currentlyReading.length === 0}
			<div class="empty-state rounded-lg p-8 text-center">
				<p class="muted-text">Not reading anything right now. Probably playing video games.</p>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each currentlyReading as book, i (book.url)}
					<BookCard {book} showSeries priority={i === 0} />
				{/each}
			</div>
		{/if}
	</section>

	<!-- Read -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="section-title text-xl font-semibold tracking-tight">Read</h2>
			{#if readBooks.length > 0}
				<span class="badge badge-muted text-xs font-medium px-2 py-0.5 rounded-full">
					{readBooks.length}
				</span>
			{/if}
		</div>
		<p class="text-sm muted-text mb-6">Everything I've finished — rated and shelved.</p>

		{#if readBooks.length === 0}
			<div class="empty-state rounded-lg p-8 text-center">
				<p class="muted-text">No books on the read shelf yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each visibleReadBooks as book, i (book.url)}
					<BookCard {book} compact showRating priority={currentlyReading.length === 0 && i === 0} />
				{/each}
			</div>
			{#if readBooks.length > READ_PREVIEW_COUNT}
				<div class="flex justify-center pt-8">
					<button
						class="show-all-btn text-sm px-4 py-2 rounded-lg border transition-colors"
						onclick={() => (showAllRead = !showAllRead)}
					>
						{showAllRead ? 'Show less' : `Show all ${readBooks.length} books`}
					</button>
				</div>
			{/if}
		{/if}
	</section>
</div>

<style>
	.badge {
		display: inline-block;
	}

	.badge-accent {
		background-color: color-mix(in srgb, var(--color-accent) 14%, var(--color-bg));
		color: var(--color-text);
	}

	.badge-muted {
		background-color: color-mix(in srgb, var(--color-border) 40%, transparent);
		color: var(--color-muted);
	}

	.empty-state {
		border: 1px solid var(--color-border);
		background-color: color-mix(in srgb, var(--color-bg) 20%, transparent);
	}

	.show-all-btn {
		color: var(--color-muted);
		border-color: var(--color-border);
	}

	.show-all-btn:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}
</style>
