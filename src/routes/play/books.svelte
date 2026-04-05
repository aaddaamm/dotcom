<script lang="ts">
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
				<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-500/10 accent-text">
					{currentlyReading.length}
				</span>
			{/if}
		</div>
		<p class="text-sm muted-text mb-6">What I'm working through right now.</p>

		{#if currentlyReading.length === 0}
			<div class="rounded-lg border border-white/6 bg-white/2 p-8 text-center">
				<p class="muted-text">Not reading anything right now. Probably playing video games.</p>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each currentlyReading as book (book.url)}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card group rounded-lg overflow-hidden border border-white/6 bg-white/2 hover:border-accent-500/20 transition-all"
					>
						<div class="aspect-2/3 overflow-hidden bg-white/3">
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
							<h3 class="book-title font-semibold text-sm leading-tight line-clamp-2">
								{book.title}
							</h3>
							{#if book.series}
								<p class="text-xs muted-text mt-1 line-clamp-1">{book.series}</p>
							{/if}
							<p class="text-xs muted-text mt-1">{book.author}</p>
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
			{#if readBooks.length > 0}
				<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-white/6 muted-text">
					{readBooks.length}
				</span>
			{/if}
		</div>
		<p class="text-sm muted-text mb-6">Everything I've finished — rated and shelved.</p>

		{#if readBooks.length === 0}
			<div class="rounded-lg border border-white/6 bg-white/2 p-8 text-center">
				<p class="muted-text">No books on the read shelf yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
				{#each visibleReadBooks as book (book.url)}
					<a
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
						class="book-card group rounded-lg overflow-hidden border border-white/6 bg-white/2 hover:border-accent-500/20 transition-all"
					>
						<div class="aspect-2/3 overflow-hidden bg-white/3">
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
							<h3 class="book-title font-semibold text-xs leading-tight line-clamp-2">
								{book.title}
							</h3>
							<p class="text-xs muted-text mt-0.5 line-clamp-1">{book.author}</p>
							{#if book.rating}
								<div class="flex gap-0.5 mt-1">
									{#each Array(5) as _, i (i)}
										<span class="text-[10px] {i < book.rating ? 'accent-text' : 'text-white/10'}">
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
						class="show-all-btn text-sm px-4 py-2 rounded-lg border border-white/8 transition-colors"
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

	.book-title {
		color: var(--color-text);
	}

	.show-all-btn {
		color: var(--color-muted);
	}

	.show-all-btn:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}
</style>
