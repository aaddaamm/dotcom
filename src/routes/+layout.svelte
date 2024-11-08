<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import Header from '../components/header.svelte';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Footer from '../components/footer.svelte';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	initializeStores();
	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<div class="flex flex-col min-h-screen">
	<Toast />
	<Header />
	<div class="w-full flex-grow bottom-shadow">
		<div class="px-4 sm:px-8 h-auto max-w-5xl align-center">
			<slot />
		</div>
	</div>
	<Footer />
</div>

<style>
	.bottom-shadow {
		box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.2);
	}
</style>
