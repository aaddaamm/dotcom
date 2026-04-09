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
	<meta
		name="keywords"
		content="senior software engineer, full-stack engineer, staff augmentation, backend systems, TypeScript, React, Node.js, fintech, technical leadership"
	/>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{base}/og-card.png" />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{base}/og-card.png" />
	<link rel="canonical" href={url} />
	<meta name="author" content="Adam Robinson" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Adam Robinson",
			"jobTitle": "Senior Software Engineer",
			"description": "Senior software engineer with ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning.",
			"url": "https://adamrobinson.tech",
			"email": "adam@adamrobinson.tech",
			"knowsAbout": [
				"Software Engineering",
				"Backend Systems",
				"TypeScript",
				"React",
				"Node.js",
				"System Architecture",
				"Technical Leadership",
				"Staff Augmentation"
			]
		}
	</script>
</svelte:head>
