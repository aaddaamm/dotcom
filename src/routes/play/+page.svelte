<script lang="ts">
	import Books from './books.svelte';
	import SeoHead from '../../components/seo-head.svelte';
	import type { PageData } from './$types';
	import { pageSeo } from '$lib/seo';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead {...pageSeo.play} />

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
		<Books currentlyReading={data.currentlyReading} readBooks={data.readBooks} />
	</section>
</div>
