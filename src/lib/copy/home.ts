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
		headline: 'Weeks → days',
		detail:
			'Healthcasts · Co-designed and built a headless CMS workflow that reduced a core publishing process from weeks to a couple of days.',
		href: '/work/healthcasts'
	},
	{
		headline: 'Ambiguity → shipped MVP',
		detail:
			'Shell · Defined the scope through an onsite Design Sprint, then built and delivered the decommissioning MVP on schedule.',
		href: '/work/shell'
	},
	{
		headline: 'Complex domain → service boundary',
		detail:
			'iCapital · Helped architect and implement a Rails backend service for specialized international investment processing.',
		href: '/work/icapital'
	}
];

export const recentShipped: RecentShippedItem[] = [
	{
		title: 'iCapital — Nominees backend service + localization',
		href: '/work/icapital',
		type: 'Work'
	},
	{
		title: 'Healthcasts — publishing, authentication + AI development',
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
