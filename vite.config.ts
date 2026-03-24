import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		sourcemap: process.env.NODE_ENV === 'development',
		target: 'es2022'
	},
	server: {
		hmr: {
			overlay: false
		}
	},
	define: {
		__DEV__: process.env.NODE_ENV === 'development'
	}
});
