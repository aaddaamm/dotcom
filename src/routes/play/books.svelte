<script lang="ts">
	import { onMount } from 'svelte';
	import type { Book } from '../api/goodreads/types';
	let books: Book[] = [];
	let isFetching = false;

	onMount(async () => {
		isFetching = true;
		const response = await fetch('/api/goodreads/currently-reading', { method: 'GET' });
		books = await response.json();
		isFetching = false;
	});
</script>

<div>
	<h3 class="h3 pb-4">Books</h3>
	<p class="pb-4">
		I do enjoy reading and wrote out this small interaction with my goodreads account. I'm currently
		reading:
	</p>
	{#if isFetching}
		<section class="card w-full h-auto">
			<div class="p-4 space-y-4">
				<div class="placeholder" />
				<div class="grid grid-cols-3 gap-8">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
				<div class="grid grid-cols-4 gap-4">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
			</div>
		</section>
	{:else if !isFetching && books.length === 0}
		<p class="pb-8">I'm not currently reading anything. I'm probably playing video games.</p>
	{:else}
		<ul
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 pb-4"
		>
			{#each books as book}
				<li class="snap-start shrink-0 card max-w-80 text-center">
					<a
						class="flex flex-row h-full w-full justify-center items-center"
						href={book.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="w-24 overflow-hidden mr-4">
							<img class="w-full h-auto" alt={book.title} src={book.cover} />
						</div>
						<div class="flex flex-col h-full w-full justify-center text-center pr-4">
							<p class="font-bold">
								{book.title}
							</p>
							{#if book.series}
								<p class="font-thin text-sm">
									{book.series}
								</p>
							{/if}
							<p class="font-thin text-sm">
								{book.author}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		<p class="pb-8">I'm currently reading {books.length} books. I'm easily distracted I guess.</p>
	{/if}
</div>
