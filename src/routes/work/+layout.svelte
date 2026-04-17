<script lang="ts">
	import { onDestroy } from 'svelte'
	import { reset } from '$lib/stores/work-filter.svelte'

	let { children } = $props()

	onDestroy(reset)
</script>

{@render children()}
