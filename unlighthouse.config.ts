import { defineConfig } from '@unlighthouse/core';

const site = process.env.SITE_URL || 'https://www.adamrobinson.tech';

export default defineConfig({
	site,
	scanner: {
		device: 'desktop',
		samples: 1
	},
	ci: {
		budget: {
			performance: 90,
			accessibility: 96,
			'best-practices': 90,
			seo: 100
		}
	}
});
