<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (page.status === 404) {
			goto('/', { replaceState: true });
		}
	});
</script>

<div class="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 text-center">
	<h1 class="text-3xl font-semibold tracking-tight mb-4" style="color: var(--color-text);">
		{page.status}
	</h1>
	<p style="color: var(--color-muted);">Redirecting home&hellip;</p>
</div>
