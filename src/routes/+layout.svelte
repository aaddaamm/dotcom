<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { trackCTA, trackScrollDepth } from '$lib/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '@fontsource/jetbrains-mono/latin-400.css';
	import '@fontsource/jetbrains-mono/latin-500.css';
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Terminal from '../components/terminal.svelte';
	import { initTheme } from '$lib/stores/theme.svelte';
	import { getTerminalOpen } from '$lib/stores/terminal.svelte';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
		injectSpeedInsights();
		inject({ mode: dev ? 'development' : 'production' });

		// Unregister any previously installed service worker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.getRegistrations().then((registrations) => {
				for (const registration of registrations) {
					registration.unregister();
				}
			});
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const firedDepths = new SvelteSet<number>();

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

		// Reset scroll depth tracking on each navigation
		firedDepths.clear();
	});

	function onScroll() {
		if (firedDepths.size === 4) return;
		const scrolled = window.scrollY + window.innerHeight;
		const total = document.documentElement.scrollHeight;
		const pct = (scrolled / total) * 100;
		for (const milestone of [25, 50, 75, 100]) {
			if (pct >= milestone && !firedDepths.has(milestone)) {
				firedDepths.add(milestone);
				trackScrollDepth(`${milestone}%`, window.location.pathname);
			}
		}
	}
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Adam Robinson — Blog"
		href="/blog/rss.xml"
	/>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<a href="#main-content" class="skip-link">Skip to content</a>
	<Header />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

{#if page.url.pathname !== '/terminal'}
	<Terminal />
{/if}

{#if page.url.pathname !== '/contact' && !getTerminalOpen()}
	<a
		href="/contact"
		class="mobile-fab sm:hidden"
		aria-label="Get In Touch"
		onclick={() => trackCTA('Get In Touch', 'mobile-fab')}
	>
		Get In Touch
	</a>
{/if}

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

	.mobile-fab {
		position: fixed;
		bottom: 24px;
		right: 20px;
		z-index: 50;
		padding: 12px 20px;
		border-radius: 999px;
		background-color: var(--color-accent);
		color: var(--color-on-accent);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
		box-shadow: 0 4px 16px color-mix(in srgb, var(--color-accent) 40%, transparent);
		transition:
			opacity 150ms ease,
			transform 150ms ease;
	}

	.mobile-fab:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}
</style>
