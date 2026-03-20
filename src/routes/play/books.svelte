<script lang="ts">
	import { onMount } from 'svelte';
	import type { GoodreadsBook } from '$lib/types';

	let currentlyReading: GoodreadsBook[] = [];
	let readBooks: GoodreadsBook[] = [];
	let isFetchingCurrent = false;
	let isFetchingRead = false;
	let showAllRead = false;

	const READ_PREVIEW_COUNT = 12;

	onMount(async () => {
		isFetchingCurrent = true;
		isFetchingRead = true;

		fetch('/api/goodreads/currently-reading')
			.then((r) => r.json())
			.then((books) => {
				currentlyReading = books;
				isFetchingCurrent = false;
			});

		fetch('/api/goodreads/read')
			.then((r) => r.json())
			.then((books) => {
				readBooks = books;
				isFetchingRead = false;
			});
	});

	$: visibleReadBooks = showAllRead ? readBooks : readBooks.slice(0, READ_PREVIEW_COUNT);
</script>

<div class="space-y-16">
	<!-- Currently Reading -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="h3">Currently Reading</h2>
			{#if !isFetchingCurrent && currentlyReading.length > 0}
				<span class="badge variant-soft-primary">{currentlyReading.length}</span>
			{/if}
		</div>
		<p class="text-sm text-surface-500 mb-6">What I'm working through right now.</p>

		{#if isFetchingCurrent}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each Array(4) as _}
					<div class="card p-0 overflow-hidden animate-pulse">
						<div class="aspect-[2/3] bg-surface-800"></div>
						<div class="p-3 space-y-2">
							<div class="placeholder w-3/4"></div>
							<div class="placeholder w-1/2"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if currentlyReading.length === 0}
			<div class="card variant-soft-surface p-8 text-center">
				<p class="text-surface-400">
					Not reading anything right now. Probably playing video games.
				</p>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each currentlyReading as book}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card card card-hover p-0 overflow-hidden"
					>
						<div class="aspect-[2/3] overflow-hidden bg-surface-800">
							{#if book.cover}
								<img
									class="w-full h-full object-cover book-img"
									alt={book.title}
									src={book.cover}
									loading="lazy"
								/>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="font-semibold text-sm leading-tight line-clamp-2">
								{book.title}
							</h3>
							{#if book.series}
								<p class="text-xs text-surface-500 mt-1 line-clamp-1">{book.series}</p>
							{/if}
							<p class="text-xs text-surface-400 mt-1">{book.author}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Read -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="h3">Read</h2>
			{#if !isFetchingRead && readBooks.length > 0}
				<span class="badge variant-soft-secondary">{readBooks.length}</span>
			{/if}
		</div>
		<p class="text-sm text-surface-500 mb-6">Everything I've finished — rated and shelved.</p>

		{#if isFetchingRead}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each Array(6) as _}
					<div class="card p-0 overflow-hidden animate-pulse">
						<div class="aspect-[2/3] bg-surface-800"></div>
						<div class="p-2 space-y-1">
							<div class="placeholder w-3/4"></div>
							<div class="placeholder w-1/2"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if readBooks.length === 0}
			<div class="card variant-soft-surface p-8 text-center">
				<p class="text-surface-400">No books on the read shelf yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each visibleReadBooks as book}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card card card-hover p-0 overflow-hidden"
					>
						<div class="aspect-[2/3] overflow-hidden bg-surface-800">
							{#if book.cover}
								<img
									class="w-full h-full object-cover book-img"
									alt={book.title}
									src={book.cover}
									loading="lazy"
								/>
							{/if}
						</div>
						<div class="p-2">
							<h3 class="font-semibold text-xs leading-tight line-clamp-2">
								{book.title}
							</h3>
							<p class="text-xs text-surface-500 mt-0.5 line-clamp-1">{book.author}</p>
							{#if book.rating}
								<div class="flex gap-0.5 mt-1">
									{#each Array(5) as _, i}
										<span class="text-[10px] {i < book.rating ? 'text-primary-400' : 'text-surface-700'}">★</span>
									{/each}
								</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>
			{#if readBooks.length > READ_PREVIEW_COUNT}
				<div class="flex justify-center pt-8">
					<button
						class="btn variant-ghost-surface"
						on:click={() => (showAllRead = !showAllRead)}
					>
						{showAllRead ? 'Show less' : `Show all ${readBooks.length} books`}
					</button>
				</div>
			{/if}
		{/if}
	</section>
</div>

<style>
	.book-card {
		transition: transform 0.2s ease;
	}

	.book-card:hover {
		transform: translateY(-3px);
	}

	.book-card:hover .book-img {
		transform: scale(1.05);
		transition: transform 0.3s ease;
	}

	.book-img {
		transition: transform 0.3s ease;
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
