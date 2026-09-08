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
		headline: 'iCapital — backend services and full-stack features',
		detail:
			'Helped architect and implement the Nominees backend service, worked on Mobility translations, and am migrating custom forms to a shared internal package.',
		href: '/work/icapital'
	},
	{
		headline: 'Healthcasts — publishing moved from weeks to days',
		detail:
			'Led development and helped define goals and technical approaches across a Strapi/React publishing workflow, an authentication rewrite, and AI platform development.',
		href: '/work/healthcasts'
	},
	{
		headline: 'Angi — full-stack delivery and intern management',
		detail:
			'Built features in Java/Vue, Rails/React, and Next.js/Contentful. Managed interns rebuilding Careers, then took over the remaining implementation.',
		href: '/work/angi'
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
