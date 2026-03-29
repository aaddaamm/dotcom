import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('dark');

	return {
		subscribe,
		init: () => {
			if (!browser) return;

			const stored = localStorage.getItem('theme') as Theme | null;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = stored || (prefersDark ? 'dark' : 'light');

			set(theme);
			applyTheme(theme);
		},
		toggle: () => {
			if (!browser) return;

			update((current) => {
				const newTheme = current === 'dark' ? 'light' : 'dark';
				applyTheme(newTheme);
				localStorage.setItem('theme', newTheme);
				return newTheme;
			});
		}
	};
}

function applyTheme(theme: Theme) {
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', theme);
}

export const themeStore = createThemeStore();
