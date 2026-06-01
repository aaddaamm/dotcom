<script lang="ts">
	import BackLink from './back-link.svelte';

	let {
		title,
		description,
		showBackLink = true,
		backHref = '/',
		backLabel = 'Back',
		descriptionClass = 'mb-12'
	}: {
		title: string;
		description?: string;
		showBackLink?: boolean;
		backHref?: string;
		backLabel?: string;
		descriptionClass?: string;
	} = $props();
</script>

<section class="pt-20 sm:pt-28">
	{#if showBackLink}
		<BackLink href={backHref} label={backLabel} />
	{/if}
	<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">{title}</h1>
	{#if description}
		<p class={`page-description leading-relaxed ${descriptionClass}`}>
			{description}
		</p>
	{/if}
</section>
