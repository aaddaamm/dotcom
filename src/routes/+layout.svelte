<script lang="ts">
	import type { Snippet } from 'svelte';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '@fontsource/jetbrains-mono/latin-400.css';
	import '@fontsource/jetbrains-mono/latin-500.css';
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import { themeStore } from '$lib/stores/theme';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		themeStore.init();
		injectSpeedInsights();
		inject({ mode: dev ? 'development' : 'production' });
		
		// Register service worker in production
		if ('serviceWorker' in navigator && !dev) {
			navigator.serviceWorker.register('/sw.js').catch((error) => {
				console.warn('Service Worker registration failed:', error);
			});
		}
	});

	afterNavigate((navigation) => {
		const hash = navigation.to?.url.hash;
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
				return;
			}
		}
		window.scrollTo({ top: 0 });
	});
</script>

<div class="min-h-screen flex flex-col">
	<a href="#main-content" class="skip-link">Skip to content</a>
	<Header />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.skip-link {
		position: absolute;
		top: -100%;
		left: 16px;
		z-index: 100;
		padding: 8px 16px;
		font-size: 14px;
		background-color: var(--color-accent);
		color: #fff;
		border-radius: 4px;
		text-decoration: none;
	}

	.skip-link:focus {
		top: 8px;
	}
</style>
