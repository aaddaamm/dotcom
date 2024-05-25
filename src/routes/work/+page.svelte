<script lang="ts">
	import { onMount } from 'svelte';
	import { renderElements } from '$lib/text';
	import { workCopy } from '$lib/copy';

	onMount(async () => {
		const workRenderTarget =
			document.getElementById('work-render-target') || document.createElement('div');
		await renderElements(workCopy, workRenderTarget);
	});
</script>

<div>
	<div id="work-render-target" />
</div>
