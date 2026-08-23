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
		headline: 'iCapital — bulk processing for thousands of investments',
		detail:
			'Co-designed a Rails service that consolidated fragmented nominee processing, expanded localization, and led a component-library migration.',
		href: '/work/icapital'
	},
	{
		headline: 'Healthcasts — publishing moved from weeks to days',
		detail:
			'Led a Strapi + React publishing pipeline, platform modernization, and Auth0 unification across products during an 18-month technical-lead engagement.',
		href: '/work/healthcasts'
	},
	{
		headline: 'Angi — production delivery across 3 post-merger codebases',
		detail:
			'Shipped in Vue/Java, Rails/React, and Next.js/Contentful while mentoring interns through their first production release.',
		href: '/work/angi'
	}
];

export const recentShipped: RecentShippedItem[] = [
	{
		title: 'iCapital — bulk nominee investment processing + localization',
		href: '/work/icapital',
		type: 'Work'
	},
	{
		title: 'Healthcasts — weeks-to-days publishing + auth modernization',
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
