<script lang="ts">
	import { jsonLd } from '$lib/utils';

	let { data }: { data: unknown } = $props();

	let content = $derived(jsonLd(data));
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${content}</` + `script>`}
</svelte:head>
