<script lang="ts">
	let {
		title,
		description,
		path = ''
	}: { title: string; description: string; path?: string } = $props();

	const base = 'https://adamrobinson.tech';
	let url = $derived(`${base}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{base}/og-card.png" />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={url} />
</svelte:head>
