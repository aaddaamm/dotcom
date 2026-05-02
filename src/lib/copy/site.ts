export type TechStackGroup = {
	category: string;
	items: string[];
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type HeroMessaging = {
	audienceKeywords: string[];
	availability: string;
	ctaOrder: [string, string, string];
};

export type HomepageMetric = {
	value: string;
	label: string;
};

export type TrustProofItem = {
	label: string;
	value: string;
};

export const techStack: TechStackGroup[] = [
	{
		category: 'Frontend',
		items: ['React', 'TypeScript', 'Vue', 'Next.js', 'Svelte', 'Tailwind CSS']
	},
	{
		category: 'Backend',
		items: ['Node.js', 'Ruby on Rails', 'Elixir / Phoenix', 'Express', 'Java', 'PHP', 'SQL']
	},
	{
		category: 'Infrastructure',
		items: ['AWS', 'Vercel', 'Netlify', 'GitHub Actions', 'Auth0', 'Redis', 'PostgreSQL']
	},
	{
		category: 'Tools',
		items: ['Git', 'Docker', 'Prisma', 'Contentful', 'Figma']
	},
	{
		category: 'AI',
		items: ['GitHub Copilot', 'Claude', 'AMP']
	}
];

export type ServiceIconType = 'code' | 'globe' | 'lightbulb';

export const services: Array<{
	title: string;
	icon: ServiceIconType;
	description: string;
	examples: string[];
	outcome: string;
}> = [
	{
		title: 'Embedded Engineering',
		icon: 'code',
		description:
			'Join your team and start shipping. I get up to speed without heavy hand-holding, work across the full stack, and contribute from day one.',
		examples: [
			'Feature development',
			'Legacy modernization',
			'Cross-team integration',
			'Greenfield builds'
		],
		outcome: 'A senior engineer who ships from day one'
	},
	{
		title: 'Platform & Backend Engineering',
		icon: 'globe',
		description:
			'Build or improve the systems behind your product — the infrastructure, data flow, and backend services that keep things running.',
		examples: ['API design', 'Authentication systems', 'Service architecture', 'Performance work'],
		outcome: 'Reliable, well-structured systems built to last'
	},
	{
		title: 'Technical Leadership',
		icon: 'lightbulb',
		description:
			"Lead a team, set technical direction, or help plan a complex initiative. I've led engineering teams through new builds and full platform overhauls.",
		examples: [
			'Team leadership',
			'Architecture review',
			'Technical planning',
			'Engineering culture'
		],
		outcome: 'Better decisions, faster delivery, stronger teams'
	}
];

export const faqItems: FaqItem[] = [
	{
		question: 'Are you open to full-time roles?',
		answer:
			"Yes — primarily I take on contract work, but I'm open to full-time for the right team and problem. If you're building something interesting and want someone who can operate as a senior IC or tech lead, reach out."
	},
	{
		question: 'What kinds of engagements do you take on?',
		answer:
			"Primarily contract work — embedded with an existing engineering team as a senior contributor. I'm also open to full-time roles for the right opportunity."
	},
	{
		question: 'How quickly can you get up to speed?',
		answer:
			"Quickly. I've navigated enough large, unfamiliar codebases to know how to orient fast, ask the right questions early, and start contributing without heavy ramp-up support."
	},
	{
		question: 'Do you work remotely?',
		answer:
			"Yes — all of my recent engagements have been fully remote. I'm comfortable with async communication, distributed teams, and working across time zones."
	},
	{
		question: "What's your current availability?",
		answer:
			"I'm currently available for new engagements. Reach out and I can give you a clear picture of my timeline."
	},
	{
		question: 'What size teams do you work well with?',
		answer:
			"I've worked with small product teams and large enterprise engineering organizations. I adapt to existing processes and culture rather than imposing my own."
	},
	{
		question: "What's your rate?",
		answer:
			"I don't publish rates — they vary by engagement type, scope, and duration. Happy to have a direct conversation about it."
	}
];

export const heroMessaging: HeroMessaging = {
	audienceKeywords: ['full-time', 'contract', 'Hiring manager', 'Need contract help'],
	availability: 'Actively available for full-time senior roles and select contract engagements.',
	ctaOrder: ['Start a conversation', 'See hiring fit', 'Download résumé']
};

export const homepageMetrics: {
	numbers: HomepageMetric[];
	industries: string[];
} = {
	numbers: [
		{ value: '10+', label: 'Years' },
		{ value: '15+', label: 'Projects' }
	],
	industries: ['fintech', 'healthcare', 'enterprise']
};

export const trustProofItems: TrustProofItem[] = [
	{ label: 'Experience', value: '10+ years' },
	{ label: 'Sectors', value: 'Fintech · Healthcare · Enterprise' },
	{ label: 'Engagements', value: '15+ delivered' },
	{ label: 'Mode', value: 'Embedded senior IC / tech lead' }
];

export const philosophy = {
	heading: 'How I work',
	body: "The best engineers I've worked with weren't the ones with the strongest opinions — they were the ones who listened first. When I join a team, my job isn't to replace your culture, your patterns, or your conventions. It's to slot in, read the code before I write any, ask the questions a newcomer notices but regulars have stopped asking, and then ship reliably. I'd rather land one well-scoped change than three speculative ones. I treat every codebase as something other engineers will inherit from me — including the one I'm touching right now."
};
