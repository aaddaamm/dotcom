<script lang="ts">
	import { onMount } from 'svelte';
	import type { GoodreadsBook } from '$lib/types';
	let books: GoodreadsBook[] = [];
	let isFetching = false;

	onMount(async () => {
		isFetching = true;
		const response = await fetch('/api/goodreads/currently-reading', { method: 'GET' });
		books = await response.json();
		isFetching = false;
	});
</script>

<div>
	<div class="flex items-baseline gap-3 pb-2">
		<h3 class="h3">Currently Reading</h3>
		{#if !isFetching && books.length > 0}
			<span class="badge variant-soft-primary">{books.length} books</span>
		{/if}
	</div>
	<p class="pb-6 opacity-70">
		A live look at my Goodreads shelf — what I'm working through right now.
	</p>

	{#if isFetching}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{#each Array(4) as _}
				<div class="card p-0 overflow-hidden animate-pulse">
					<div class="aspect-[2/3] bg-surface-700"></div>
					<div class="p-3 space-y-2">
						<div class="placeholder w-3/4"></div>
						<div class="placeholder w-1/2"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if books.length === 0}
		<div class="card variant-soft p-8 text-center">
			<p class="text-lg">📺🎮</p>
			<p class="pt-2 opacity-70">
				Guess I'm not reading anything right now. Probably playing video games.
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{#each books as book}
				<a
					href={book.url}
					target="_blank"
					rel="noopener noreferrer"
					class="book-card card p-0 overflow-hidden"
				>
					<div class="aspect-[2/3] overflow-hidden bg-surface-800">
						{#if book.cover}
							<img
								class="w-full h-full object-cover"
								alt={book.title}
								src={book.cover}
								loading="lazy"
							/>
						{/if}
					</div>
					<div class="p-3">
						<h4 class="font-bold text-sm leading-tight line-clamp-2">
							{book.title}
						</h4>
						{#if book.series}
							<p class="text-xs opacity-50 mt-1 line-clamp-1">
								{book.series}
							</p>
						{/if}
						<p class="text-xs opacity-70 mt-1">
							{book.author}
						</p>
						{#if book.rating}
							<div class="flex gap-0.5 mt-2">
								{#each Array(5) as _, i}
									<span class="text-xs {i < book.rating ? 'opacity-100' : 'opacity-20'}">★</span>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.book-card {
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.book-card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 12px 24px -8px rgba(0, 0, 0, 0.4),
			0 0 0 1px rgba(255, 255, 255, 0.05);
	}

	.book-card img {
		transition: transform 0.3s ease;
	}

	.book-card:hover img {
		transform: scale(1.05);
	}

	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
