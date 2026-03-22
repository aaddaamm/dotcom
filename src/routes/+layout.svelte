<script lang="ts">
	import type { Snippet } from 'svelte';
	import { dev, browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '../app.css';
	import Footer from '../components/footer.svelte';

	let { children }: { children: Snippet } = $props();

	let isDark = $state(true);

	onMount(() => {
		const stored = localStorage.getItem('theme');
		isDark = stored ? stored === 'dark' : true;
	});

	function toggleTheme() {
		isDark = !isDark;
		const theme = isDark ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	setTimeout(() => {
		injectSpeedInsights();
		inject({ mode: dev ? 'development' : 'production' });
	}, 0);

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
	<header class="sticky top-0 z-50 site-header align-middle">
		<div class="max-w-3xl mx-auto flex items-center justify-between h-full header-inner">
			<a href="/" aria-label="Adam Robinson — Home" class="flex items-center gap-3 shrink-0">
				<img
					src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
					alt="Adam Robinson"
					class="h-10 hidden sm:block logo-wordmark"
				/>
				<img src="/icon.svg" alt="Adam Robinson" class="h-10 block sm:hidden" />
			</a>

			<div class="flex items-center gap-6">
				<div class="hidden sm:block nav-divider" aria-hidden="true"></div>
				<nav aria-label="Main navigation" class="flex items-center gap-6">
					<a href="/#about" class="nav-link">about</a>
					<a href="/#work" class="nav-link">work</a>
					<a href="/#approach" class="nav-link">approach</a>
					<a href="/blog" class="nav-link">blog</a>
					<a href="/play" class="nav-link">reading</a>
					<a href="/teach" class="nav-link">teach</a>
				</nav>
				<button
					onclick={toggleTheme}
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					class="theme-toggle"
				>
					{#if isDark}
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
					{/if}
				</button>
			</div>
		</div>
	</header>
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.site-header {
		height: 56px;
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
	}

	.header-inner {
		padding: 0 24px;
	}

	.logo-wordmark {
		min-width: 240px;
	}

	.nav-divider {
		width: 1px;
		height: 24px;
		background-color: var(--color-border);
	}

	.nav-link {
		font-size: 12px;
		color: var(--color-muted);
		transition: color 150ms ease;
		text-decoration: none;
		background-image: linear-gradient(var(--color-accent), var(--color-accent));
		background-size: 0% 1.5px;
		background-position: left bottom;
		background-repeat: no-repeat;
		padding-bottom: 2px;
		transition:
			color 150ms ease,
			background-size 300ms ease;
	}

	.nav-link:hover {
		color: var(--color-text);
		background-size: 100% 1.5px;
	}

	.nav-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.theme-toggle {
		color: var(--color-muted);
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		transition: color 150ms ease;
	}

	.theme-toggle:hover {
		color: var(--color-text);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}

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
