import { defineConfig } from '@unlighthouse/core';

const site = process.env.SITE_URL || 'https://www.adamrobinson.tech';
const performanceBudget = Number(process.env.UNLIGHTHOUSE_MIN_PERFORMANCE || 65);
const accessibilityBudget = Number(process.env.UNLIGHTHOUSE_MIN_ACCESSIBILITY || 96);
const bestPracticesBudget = Number(process.env.UNLIGHTHOUSE_MIN_BEST_PRACTICES || 90);
const seoBudget = Number(process.env.UNLIGHTHOUSE_MIN_SEO || 100);

export default defineConfig({
	site,
	scanner: {
		device: 'desktop',
		samples: 1
	},
	ci: {
		budget: {
			performance: performanceBudget,
			accessibility: accessibilityBudget,
			'best-practices': bestPracticesBudget,
			seo: seoBudget
		}
	}
});
