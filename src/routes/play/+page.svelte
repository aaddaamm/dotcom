<script lang="ts">
	import Footer from '../../components/footer.svelte';
	import Books from './books.svelte';
</script>

<svelte:head>
	<title>Reading — Adam Robinson</title>
	<meta name="description" content="What Adam Robinson is currently reading and has finished." />
	<meta property="og:title" content="Reading — Adam Robinson" />
	<meta
		property="og:description"
		content="What Adam Robinson is currently reading and has finished."
	/>
	<meta property="og:url" content="https://adamrobinson.tech/play" />
	<link rel="canonical" href="https://adamrobinson.tech/play" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6">
	<section class="pt-20 sm:pt-28">
		<a
			href="/"
			class="text-sm inline-flex items-center gap-1 mb-8 text-slate-500 hover:text-accent-400 transition-colors"
		>
			<span aria-hidden="true">&larr;</span>
			Back
		</a>
		<h1 class="text-3xl font-semibold tracking-tight text-slate-50 mb-3">Reading</h1>
		<p class="text-slate-400 leading-relaxed mb-12">
			A live look at my Goodreads shelves — what I'm working through and everything I've finished.
		</p>
		<Books />
	</section>
</div>

<Footer />
