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
	<meta name="keywords" content="freelance developer, software consultant, custom software, small business technology, web development, Rhode Island developer" />
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
	<meta name="geo.region" content="US-RI" />
	<meta name="geo.placename" content="Cranston, Rhode Island" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			"name": "Adam Robinson - Freelance Developer",
			"description": "Custom software development and technical consulting for small businesses in Cranston, RI",
			"url": "https://adamrobinson.tech",
			"telephone": "",
			"email": "adam@adamrobinson.tech",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Cranston",
				"addressRegion": "RI",
				"addressCountry": "US"
			},
			"areaServed": ["Rhode Island", "New England", "Remote"],
			"serviceType": ["Custom Software Development", "Website Development", "Technical Consulting"],
			"priceRange": "Project-based pricing"
		}
	</script>
</svelte:head>
