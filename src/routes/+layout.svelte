<script lang="ts">
	import type { Component, Snippet } from 'svelte';
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
	import JsonLd from '../components/json-ld.svelte';
	import { EMAIL, SITE_URL } from '$lib/constants';
	import { socialLinks } from '$lib/social-links';
	import { initTheme } from '$lib/stores/theme.svelte';
	import { getTerminalOpen } from '$lib/stores/terminal.svelte';
	import { getSeveranceMode, initSeveranceMode } from '$lib/stores/severance';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();
	let TerminalComponent = $state<Component | null>(null);

	onMount(() => {
		initTheme();
		initSeveranceMode();
		injectSpeedInsights();
		inject({ mode: dev ? 'development' : 'production' });

		void import('../components/terminal.svelte').then((module) => {
			TerminalComponent = module.default;
		});

		// In dev only, clear old service workers to avoid stale-cache confusion.
		if (dev && 'serviceWorker' in navigator) {
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
	const sameAs = socialLinks.map((social) => social.url);

	afterNavigate((navigation) => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const hash = navigation.to?.url.hash;
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
				return;
			}
		}
		window.scrollTo({ top: 0, behavior: 'auto' });

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

<JsonLd
	data={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Adam Robinson',
		jobTitle: 'Senior Software Engineer',
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Senior Software Engineer',
			skills:
				'TypeScript, SvelteKit, React, Node.js, Ruby on Rails, backend engineering, platform modernization'
		},
		description:
			'Senior software engineer with ten-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning.',
		url: SITE_URL,
		email: EMAIL,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Providence',
			addressRegion: 'RI',
			addressCountry: 'US'
		},
		knowsAbout: [
			'TypeScript',
			'SvelteKit',
			'React',
			'Node.js',
			'Ruby on Rails',
			'Vue',
			'Next.js',
			'Full-stack development',
			'Backend engineering',
			'Software architecture',
			'Technical leadership',
			'Staff augmentation',
			'Platform modernization',
			'AI developer tools'
		],
		sameAs
	}}
/>

<JsonLd
	data={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Adam Robinson',
		url: SITE_URL,
		description:
			'Senior software engineer with ten-plus years across fintech, healthcare, and enterprise.',
		inLanguage: 'en-US',
		author: {
			'@type': 'Person',
			name: 'Adam Robinson'
		}
	}}
/>

<div class="min-h-screen flex flex-col" class:severed={getSeveranceMode() === 'innie'}>
	<a href="#main-content" class="skip-link">Skip to content</a>
	<Header />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

{#if page.url.pathname !== '/terminal' && TerminalComponent}
	<TerminalComponent />
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

	.severed {
		filter: saturate(0.94) contrast(1.03);
	}
</style>
