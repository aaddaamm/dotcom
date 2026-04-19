<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import Icon from './icon.svelte';
</script>

<header class="sticky top-0 z-50 site-header align-middle">
	<div class="max-w-3xl mx-auto flex items-center justify-between h-full header-inner">
		<a
			href="/"
			aria-label="Adam Robinson — Home"
			class="flex items-center gap-3 shrink-0 h-full logo-link"
		>
			<img
				src="/logo-dark.svg"
				alt="Adam Robinson"
				width="240"
				height="40"
				class="h-10 hidden sm:block logo-wordmark"
				loading="eager"
			/>
			<img
				src="/icon.svg"
				alt="Adam Robinson"
				width="40"
				height="40"
				class="h-10 block sm:hidden"
				loading="eager"
			/>
		</a>

		<div class="flex items-center gap-6">
			<div class="hidden sm:block nav-divider" aria-hidden="true"></div>
			<nav aria-label="Main navigation" class="flex items-center gap-6">
				<a href="/work" class="nav-link link-underline">work</a>
				<a href="/blog" class="nav-link link-underline">blog</a>
				<a href="/hire" class="nav-link link-underline hire-nav">hire me</a>
				<a href="/contact" class="nav-link link-underline">contact</a>
			</nav>
			<button
				onclick={themeStore.toggle}
				aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
				class="theme-toggle"
			>
				<Icon name={$themeStore === 'dark' ? 'sun' : 'moon'} />
			</button>
		</div>
	</div>
</header>

<style>
	.site-header {
		height: 56px;
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
	}

	.header-inner {
		padding: 0 24px;
	}

	.logo-link {
		padding: 0 8px;
		margin: 0 -8px;
		cursor: pointer;
	}

	.logo-wordmark {
		min-width: 240px;
	}

	:global([data-theme='light']) .logo-wordmark {
		content: url('/logo-light.svg');
	}

	.nav-divider {
		width: 1px;
		height: 24px;
		background-color: var(--color-border);
	}

	.theme-toggle {
		color: var(--color-muted);
		background: none;
		border: none;
		cursor: pointer;
		padding: 10px;
		margin: -10px;
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

	.hire-nav {
		color: var(--color-accent);
		font-weight: 500;
	}
</style>
