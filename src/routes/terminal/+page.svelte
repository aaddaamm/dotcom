<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import Terminal from '../../components/terminal.svelte';
</script>

<SeoHead
	title="Terminal — Adam Robinson"
	description="An interactive terminal for the curious. Try whoami, ls /work, or sudo hire adam."
	path="/terminal"
/>

<div class="terminal-page max-w-3xl mx-auto px-6 py-8">
	<Terminal fullscreen />
</div>

<style>
	.terminal-page {
		display: flex;
		flex-direction: column;
	}
</style>
