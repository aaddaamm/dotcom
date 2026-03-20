<script lang="ts">
	import Footer from '../../components/footer.svelte';
	import Books from './books.svelte';
</script>

<svelte:head>
	<title>Reading — Adam Robinson</title>
	<meta name="description" content="What Adam Robinson is currently reading and has finished." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6">
	<section class="section pt-20 sm:pt-28">
		<a
			href="/"
			class="anchor text-sm inline-flex items-center gap-1 mb-8 no-underline"
		>
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="h2 mb-3">Reading</h1>
		<p class="text-surface-400 leading-relaxed mb-12">
			A live look at my Goodreads shelves — what I'm working through and everything I've finished.
		</p>
		<Books />
	</section>
</div>

<Footer />
