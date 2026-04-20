import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

let current = $state<Theme>('dark');

function applyTheme(theme: Theme) {
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', theme);
}

export function getTheme() {
	return current;
}

export function initTheme() {
	if (!browser) return;
	const stored = localStorage.getItem('theme') as Theme | null;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = stored || (prefersDark ? 'dark' : 'light');
	current = theme;
	applyTheme(theme);
}

export function toggleTheme() {
	if (!browser) return;
	const newTheme = current === 'dark' ? 'light' : 'dark';
	current = newTheme;
	applyTheme(newTheme);
	localStorage.setItem('theme', newTheme);
}
