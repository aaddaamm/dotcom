<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { dev } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { trackCTA, trackScrollDepth } from '$lib/analytics';
	import { getReachedMilestones } from '$lib/scroll-depth';
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Terminal from '../components/terminal.svelte';
	import JsonLd from '../components/json-ld.svelte';
	import { EMAIL, ROLE_TITLE, SITE_URL } from '$lib/constants';
	import { socialLinks } from '$lib/social-links';
	import { initTheme } from '$lib/stores/theme.svelte';

	import { getSeveranceMode, initSeveranceMode } from '$lib/stores/severance';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
		initSeveranceMode();
		loadMonitoringScriptsWhenIdle();

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
	const personSchemaId = `${SITE_URL}/#person`;
	const websiteSchemaId = `${SITE_URL}/#website`;

	afterNavigate((navigation) => {
		if (!navigation.from) {
			firedDepths.clear();
			return;
		}

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const hash = navigation.to?.url.hash;
		if (hash) {
			const el = document.querySelector<HTMLElement>(hash);
			if (el) {
				el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
				focusElement(el);
				return;
			}
		}
		window.scrollTo({ top: 0, behavior: 'auto' });
		focusPageHeading();

		// Reset scroll depth tracking on each navigation
		firedDepths.clear();
	});

	async function focusPageHeading() {
		await tick();
		const heading = document.querySelector<HTMLElement>('#main-content h1');
		focusElement(heading ?? document.querySelector<HTMLElement>('#main-content'));
	}

	function focusElement(element: HTMLElement | null) {
		if (!element) return;
		if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
		element.focus({ preventScroll: true });
	}

	function loadMonitoringScriptsWhenIdle() {
		globalThis.setTimeout(() => {
			import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) => {
				injectSpeedInsights();
			});

			const script = document.createElement('script');
			script.src = '/_vercel/insights/script.js';
			script.async = true;
			document.head.append(script);
		}, 5000);
	}

	function onScroll() {
		if (firedDepths.size === 4) return;
		const scrolled = window.scrollY + window.innerHeight;
		const total = document.documentElement.scrollHeight;
		const pct = (scrolled / total) * 100;
		for (const milestone of getReachedMilestones(pct, firedDepths)) {
			firedDepths.add(milestone);
			trackScrollDepth(`${milestone}%`, window.location.pathname);
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
		'@id': personSchemaId,
		name: 'Adam Robinson',
		jobTitle: ROLE_TITLE,
		hasOccupation: {
			'@type': 'Occupation',
			name: ROLE_TITLE,
			skills:
				'TypeScript, SvelteKit, React, Node.js, Ruby on Rails, backend engineering, platform modernization'
		},
		description:
			'Senior software engineer with fifteen-plus years across fintech, healthcare, and enterprise. Full-stack, backend-leaning.',
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
		'@id': websiteSchemaId,
		name: 'Adam Robinson',
		url: SITE_URL,
		description:
			'Senior software engineer with fifteen-plus years across fintech, healthcare, and enterprise.',
		inLanguage: 'en-US',
		author: {
			'@id': personSchemaId
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
	<Terminal />
</div>

{#if page.url.pathname !== '/contact'}
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
