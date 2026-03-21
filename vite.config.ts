import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		sourcemap: process.env.NODE_ENV === 'development'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
