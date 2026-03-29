import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		sourcemap: process.env.NODE_ENV === 'development',
		target: 'es2022',
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Group analytics libraries together
					if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
						return 'analytics';
					}
					// Group node_modules into vendor chunk
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
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
