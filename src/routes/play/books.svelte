<script lang="ts">
	import { onMount } from 'svelte';
	import type { GoodreadsBook } from '$lib/types';

	let currentlyReading: GoodreadsBook[] = $state([]);
	let readBooks: GoodreadsBook[] = $state([]);
	let isFetchingCurrent = $state(false);
	let isFetchingRead = $state(false);
	let showAllRead = $state(false);

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

	let visibleReadBooks = $derived(showAllRead ? readBooks : readBooks.slice(0, READ_PREVIEW_COUNT));
</script>

<div class="space-y-16 pb-16">
	<!-- Currently Reading -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="section-title text-xl font-semibold tracking-tight">Currently Reading</h2>
			{#if !isFetchingCurrent && currentlyReading.length > 0}
				<span class="badge text-xs font-medium px-2 py-0.5 rounded-full">
					{currentlyReading.length}
				</span>
			{/if}
		</div>
		<p class="section-description text-sm mb-6">What I'm working through right now.</p>

		{#if isFetchingCurrent}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each Array(4) as _}
					<div class="rounded-lg overflow-hidden border border-white/[0.06] animate-pulse">
						<div class="aspect-[2/3] bg-white/[0.03]"></div>
						<div class="p-3 space-y-2">
							<div class="h-3 bg-white/[0.06] rounded w-3/4"></div>
							<div class="h-3 bg-white/[0.06] rounded w-1/2"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if currentlyReading.length === 0}
			<div class="rounded-lg border border-white/[0.06] bg-white/[0.02] p-8 text-center">
				<p class="empty-text">Not reading anything right now. Probably playing video games.</p>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each currentlyReading as book}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card group rounded-lg overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all"
					>
						<div class="aspect-[2/3] overflow-hidden bg-white/[0.03]">
							{#if book.cover}
								<img
									class="w-full h-full object-cover book-img"
									alt={book.title}
									src={book.cover}
									loading="lazy"
									width="200"
									height="300"
								/>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="book-title font-semibold text-sm leading-tight line-clamp-2">
								{book.title}
							</h3>
							{#if book.series}
								<p class="book-series text-xs mt-1 line-clamp-1">{book.series}</p>
							{/if}
							<p class="book-author text-xs mt-1">{book.author}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Read -->
	<section>
		<div class="flex items-baseline gap-3 mb-2">
			<h2 class="section-title text-xl font-semibold tracking-tight">Read</h2>
			{#if !isFetchingRead && readBooks.length > 0}
				<span class="read-badge text-xs font-medium px-2 py-0.5 rounded-full">
					{readBooks.length}
				</span>
			{/if}
		</div>
		<p class="section-description text-sm mb-6">Everything I've finished — rated and shelved.</p>

		{#if isFetchingRead}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each Array(6) as _}
					<div class="rounded-lg overflow-hidden border border-white/[0.06] animate-pulse">
						<div class="aspect-[2/3] bg-white/[0.03]"></div>
						<div class="p-2 space-y-1">
							<div class="h-2.5 bg-white/[0.06] rounded w-3/4"></div>
							<div class="h-2.5 bg-white/[0.06] rounded w-1/2"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if readBooks.length === 0}
			<div class="rounded-lg border border-white/[0.06] bg-white/[0.02] p-8 text-center">
				<p class="empty-text">No books on the read shelf yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each visibleReadBooks as book}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card group rounded-lg overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all"
					>
						<div class="aspect-[2/3] overflow-hidden bg-white/[0.03]">
							{#if book.cover}
								<img
									class="w-full h-full object-cover book-img"
									alt={book.title}
									src={book.cover}
									loading="lazy"
									width="200"
									height="300"
								/>
							{/if}
						</div>
						<div class="p-2">
							<h3 class="book-title font-semibold text-xs leading-tight line-clamp-2">
								{book.title}
							</h3>
							<p class="book-author text-xs mt-0.5 line-clamp-1">{book.author}</p>
							{#if book.rating}
								<div class="flex gap-0.5 mt-1">
									{#each Array(5) as _, i}
										<span
											class="text-[10px] {i < book.rating ? 'star-active' : 'star-inactive'}"
										>
											★
										</span>
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
						class="show-more-btn text-sm px-4 py-2 rounded-lg border border-white/[0.08] transition-colors"
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
	.section-title {
		color: var(--color-text);
	}

	.section-description {
		color: var(--color-muted);
	}

	.badge {
		background: color-mix(in srgb, var(--color-accent) 10%, transparent);
		color: var(--color-accent);
	}

	.read-badge {
		background: rgba(255, 255, 255, 0.06);
		color: var(--color-muted);
	}

	.book-card {
		transition: transform 0.2s ease;
		content-visibility: auto;
		contain-intrinsic-size: auto 200px 350px;
	}

	.book-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--color-accent) 20%, transparent);
	}

	.book-card:hover .book-img {
		transform: scale(1.05);
		transition: transform 0.3s ease;
	}

	.book-img {
		transition: transform 0.3s ease;
	}

	.book-title {
		color: var(--color-text);
	}

	.book-author {
		color: var(--color-muted);
	}

	.book-series {
		color: var(--color-muted);
	}

	.empty-text {
		color: var(--color-muted);
	}

	.star-active {
		color: var(--color-accent);
	}

	.star-inactive {
		color: rgba(255, 255, 255, 0.1);
	}

	.show-more-btn {
		color: var(--color-muted);
	}

	.show-more-btn:hover {
		border-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
		color: var(--color-accent);
	}
</style>
