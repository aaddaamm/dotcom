export type OutcomeProofPoint = {
	headline: string;
	detail: string;
	href: string;
};

export type RecentShippedItem = {
	title: string;
	href: string;
	type: 'Work' | 'Writing';
};

export const outcomeProofPoints: OutcomeProofPoint[] = [
	{
		headline: 'iCapital — bulk processing designed for thousands of investments',
		detail:
			'Co-designed a Rails bulk-processing service for nominee investments and expanded i18n coverage across both static UI copy and database-backed content.',
		href: '/work/icapital'
	},
	{
		headline: 'Healthcasts — MVP modernization that grew into a 4-year engagement',
		detail:
			'Led a Strapi + React publishing pipeline and Auth0 unification across platforms, reducing publishing friction and creating a stronger identity foundation.',
		href: '/work/healthcasts'
	},
	{
		headline: 'Angi — shipped across 3 product codebases in one engagement',
		detail:
			'Delivered production work in Vue/Java, Rails/React, and Next.js/Contentful while mentoring interns through their first real launch.',
		href: '/work/angi'
	}
];

export const recentShipped: RecentShippedItem[] = [
	{
		title: 'iCapital — bulk nominee investment processing + i18n rollout',
		href: '/work/icapital',
		type: 'Work'
	},
	{
		title: 'Healthcasts — publishing pipeline + auth modernization',
		href: '/work/healthcasts',
		type: 'Work'
	},
	{
		title: 'Why I switched to Pi for coding agent work',
		href: '/blog/why-i-switched-to-pi',
		type: 'Writing'
	},
	{
		title: 'Claude has more context than you think',
		href: '/blog/claude-has-more-context-than-you-think',
		type: 'Writing'
	}
];
