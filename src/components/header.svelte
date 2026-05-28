<script lang="ts">
	import { page } from '$app/state';
	import { ROLE_TITLE } from '$lib/constants';
	import { getTheme, toggleTheme } from '$lib/stores/theme.svelte';
	import Icon from './icon.svelte';

	function isActive(path: string) {
		return page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);
	}
</script>

<header class="sticky top-0 z-50 site-header align-middle">
	<div class="max-w-3xl mx-auto flex items-center justify-between h-full header-inner">
		<a
			href="/"
			aria-label="Adam Robinson — Home"
			class="flex items-center gap-3 shrink-0 h-full logo-link"
		>
			<span class="header-cursor" aria-hidden="true"></span>
			<span class="header-wordmark">
				<span class="header-name">adam robinson</span>
				<span class="header-subtitle">{ROLE_TITLE}</span>
			</span>
		</a>

		<div class="flex items-center gap-6">
			<div class="hidden sm:block nav-divider" aria-hidden="true"></div>
			<nav aria-label="Main navigation" class="flex items-center gap-6">
				<a
					href="/work"
					class="nav-link link-underline"
					aria-current={isActive('/work') ? 'page' : undefined}
				>
					work
				</a>
				<a
					href="/blog"
					class="nav-link link-underline"
					aria-current={isActive('/blog') ? 'page' : undefined}
				>
					blog
				</a>
				<a
					href="/now"
					class="nav-link link-underline"
					aria-current={isActive('/now') ? 'page' : undefined}
				>
					now
				</a>
				<a
					href="/hire"
					class="nav-link link-underline hire-nav"
					aria-current={isActive('/hire') ? 'page' : undefined}
				>
					hire me
				</a>
				<a
					href="/contact"
					class="nav-link link-underline"
					aria-current={isActive('/contact') ? 'page' : undefined}
				>
					contact
				</a>
			</nav>
			<button
				onclick={toggleTheme}
				aria-label={getTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
				aria-pressed={getTheme() === 'dark'}
				class="theme-toggle"
			>
				<Icon name={getTheme() === 'dark' ? 'sun' : 'moon'} />
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

	.header-cursor {
		width: 12px;
		height: 42px;
		border-radius: 3px;
		background-color: var(--color-accent);
		flex-shrink: 0;
	}

	.header-wordmark {
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 1;
	}

	.header-name {
		font-family: var(--font-mono);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: 0;
		color: var(--color-text);
	}

	.header-subtitle {
		margin-top: 6px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 5px;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.header-cursor {
			height: 32px;
			width: 10px;
		}

		.header-name {
			font-size: 17px;
		}

		.header-subtitle {
			display: none;
		}
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
