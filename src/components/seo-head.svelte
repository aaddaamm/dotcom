<script lang="ts">
	let {
		title,
		description,
		path = '',
		image = '/og-card.png'
	}: { title: string; description: string; path?: string; image?: string } = $props();

	const base = 'https://adamrobinson.tech';
	let url = $derived(`${base}${path}`);
	let imageUrl = $derived(image.startsWith('http') ? image : `${base}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="senior software engineer, full-stack engineer, staff augmentation, backend systems, TypeScript, React, Node.js, fintech, technical leadership"
	/>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={title} />
	<link rel="canonical" href={url} />
	<meta name="author" content="Adam Robinson" />
</svelte:head>
