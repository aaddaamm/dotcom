<script lang="ts">
	let {
		title,
		description,
		showBackLink = true,
		backHref = '/',
		backLabel = 'Back'
	}: {
		title: string;
		description?: string;
		showBackLink?: boolean;
		backHref?: string;
		backLabel?: string;
	} = $props();
</script>

<section class="pt-20 sm:pt-28">
	{#if showBackLink}
		<a
			href={backHref}
			class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors"
		>
			<span aria-hidden="true">&larr;</span>
			{backLabel}
		</a>
	{/if}
	<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">{title}</h1>
	{#if description}
		<p class="page-description leading-relaxed mb-12">
			{description}
		</p>
	{/if}
</section>
