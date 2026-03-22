<script lang="ts">
	import Books from './books.svelte';
	import SeoHead from '../../components/seo-head.svelte';
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
		<Books />
	</section>
</div>

