<script lang="ts">
	import Books from './books.svelte';
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import type { PageData } from './$types';
	import { pageSeo } from '$lib/seo';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead {...pageSeo.play} />

<div class="max-w-4xl mx-auto px-6">
	<section>
		<PageHeader
			title="Reading"
			description="A live look at my Goodreads shelves — what I'm working through and everything I've finished."
		/>
		<Books currentlyReading={data.currentlyReading} readBooks={data.readBooks} />
	</section>
</div>
