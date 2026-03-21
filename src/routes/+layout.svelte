<script lang="ts">
	import { dev } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '../app.css';
	import Footer from '../components/footer.svelte';

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
	<header class="sticky top-0 z-50 site-header">
		<div class="max-w-3xl mx-auto flex items-center justify-between h-full header-inner">
			<a href="/" aria-label="Adam Robinson — Home" class="flex items-center gap-3 shrink-0">
				<img src="/logo-dark.svg" alt="Adam Robinson" class="h-8 hidden sm:block logo-wordmark" />
				<img src="/icon.svg" alt="Adam Robinson" class="h-8 block sm:hidden" />
			</a>

			<div class="flex items-center gap-6">
				<div class="hidden sm:block nav-divider" aria-hidden="true"></div>
				<nav aria-label="Main navigation" class="flex items-center gap-6">
					<a href="/#about" class="nav-link">about</a>
					<a href="/#work" class="nav-link">work</a>
					<a href="/#approach" class="nav-link">approach</a>
				</nav>
			</div>
		</div>
	</header>
	<main id="main-content" class="flex-1">
		<slot />
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
	}

	.nav-link:hover {
		color: var(--color-text);
	}

	.nav-link:focus-visible {
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
