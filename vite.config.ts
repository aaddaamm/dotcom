import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		sourcemap: process.env.NODE_ENV === 'development'
	},
	server: {
		hmr: {
			overlay: false
		}
	}
});
