<script lang="ts">
	import type { GoodreadsBook } from '$lib/types';

	let {
		book,
		compact = false,
		showSeries = false,
		showRating = false,
		priority = false
	}: {
		book: GoodreadsBook;
		compact?: boolean;
		showSeries?: boolean;
		showRating?: boolean;
		priority?: boolean;
	} = $props();
</script>

<a
	href={book.url}
	target="_blank"
	rel="noopener noreferrer"
	class="book-card rounded-lg overflow-hidden"
>
	<div class="book-cover-bg aspect-2/3 overflow-hidden">
		{#if book.cover}
			<img
				class="w-full h-full object-cover book-img"
				alt={book.title}
				src={book.cover}
				width="198"
				height="297"
				loading={priority ? 'eager' : 'lazy'}
				fetchpriority={priority ? 'high' : 'auto'}
			/>
		{/if}
	</div>
	<div class={compact ? 'p-2' : 'p-3'}>
		<h3
			class="book-title font-semibold leading-tight line-clamp-2"
			class:text-xs={compact}
			class:text-sm={!compact}
		>
			{book.title}
		</h3>
		{#if showSeries && book.series}
			<p class="text-xs muted-text mt-1 line-clamp-1">{book.series}</p>
		{/if}
		<p class="text-xs muted-text line-clamp-1 {compact ? 'mt-0.5' : 'mt-1'}">{book.author}</p>
		{#if showRating && book.rating}
			<div class="flex gap-0.5 mt-1" aria-label="{book.rating} out of 5 stars">
				{#each Array(5) as _, i (i)}
					<span
						aria-hidden="true"
						class="star text-[10px] {i < book.rating ? 'star-filled' : 'star-empty'}"
					>
						★
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>

<style>
	.book-card {
		border: 1px solid var(--color-border);
		background-color: color-mix(in srgb, var(--color-bg) 20%, transparent);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease;
	}

	.book-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
	}

	.book-card:hover .book-img {
		transform: scale(1.05);
		transition: transform 0.3s ease;
	}

	.book-cover-bg {
		background-color: color-mix(in srgb, var(--color-border) 30%, transparent);
	}

	.book-img {
		transition: transform 0.3s ease;
	}

	.book-title {
		color: var(--color-text);
	}

	.star-filled {
		color: var(--color-text);
	}

	.star-empty {
		color: color-mix(in srgb, var(--color-text) 15%, transparent);
	}
</style>
