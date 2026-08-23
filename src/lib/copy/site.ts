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

export const positioning = {
	headline: 'Senior software engineer for teams with consequential work to ship.',
	summary:
		'I take ownership of unfamiliar, high-leverage product and platform work: learn the system, create momentum, and leave it easier to maintain.',
	consultingNote:
		'I also take select longer-term embedded consulting engagements where the scope, duration, and terms support real senior-level ownership.',
	workingStyle:
		'I mentor engineers, make room for good ideas, and step into leadership gaps when a team needs someone to create clarity and momentum.',
	aiPractice:
		'I use AI-assisted tools pragmatically, with the same—or more—review and accountability I bring to any contributor output.'
} as const;

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
		items: ['Codex', 'Claude', 'Pi', 'GitHub Copilot']
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
		title: 'Difficult Roadmap Ownership',
		icon: 'code',
		description:
			'Take ownership of unfamiliar product and platform work as an embedded senior engineer or technical lead, from context-building through production handoff.',
		examples: [
			'Full-stack product delivery',
			'Complex codebase context-building',
			'Production-ready handoff',
			'Cross-team delivery'
		],
		outcome: 'Senior ownership for consequential roadmap work'
	},
	{
		title: 'Platform Modernization',
		icon: 'globe',
		description:
			'Modernize production platforms through focused, maintainable changes that preserve delivery while improving the systems a team inherits.',
		examples: [
			'Publishing workflow modernization',
			'Infrastructure and framework updates',
			'Authentication unification',
			'Rails and React delivery'
		],
		outcome: 'A more maintainable platform with delivery momentum'
	},
	{
		title: 'Team Delivery and Mentorship',
		icon: 'lightbulb',
		description:
			'Contribute hands-on across complex delivery work while mentoring engineers and creating clarity when a team needs technical leadership.',
		examples: [
			'Embedded senior IC work',
			'Technical-lead delivery',
			'Engineer mentorship',
			'Production release support'
		],
		outcome: 'Hands-on senior contribution with stronger team delivery'
	}
];

export const faqItems: FaqItem[] = [
	{
		question: 'Are you open to full-time roles?',
		answer:
			'Yes. I am open to full-time senior or staff roles with meaningful product and platform ownership.'
	},
	{
		question: 'What kinds of engagements do you take on?',
		answer:
			'I am a fit for senior or staff roles where I can own difficult product and platform work. I also take select longer-term embedded consulting engagements as a senior contributor or technical lead.'
	},
	{
		question: 'How quickly can you get up to speed?',
		answer:
			'I start with the code paths tied to the problem and the team’s existing conventions, then contribute with the context needed to make maintainable changes.'
	},
	{
		question: 'Do you work remotely?',
		answer:
			'Yes — recent engagements have been fully remote. I am comfortable with async communication, distributed teams, and working across time zones.'
	},
	{
		question: "What's your current availability?",
		answer:
			'I am open to senior or staff roles and select longer-term embedded consulting engagements. Reach out and I can give you a clear picture of my timeline.'
	},
	{
		question: 'What size teams do you work well with?',
		answer:
			'I have worked with small product teams and large enterprise engineering organizations, adapting to existing processes and culture rather than imposing my own.'
	},
	{
		question: "What's your rate?",
		answer:
			'I do not publish rates. They vary by engagement type, scope, duration, and terms, and I am happy to discuss them directly.'
	}
];

export const heroMessaging: HeroMessaging = {
	audienceKeywords: ['Full-time', 'product teams', 'Contract engagements'],
	availability:
		'Available for senior/staff roles and select longer-term embedded consulting engagements.',
	ctaOrder: ['Start a conversation', 'See how I work', 'Download résumé']
};

export const homepageMetrics: {
	numbers: HomepageMetric[];
	industries: string[];
} = {
	numbers: [
		{ value: '15+', label: 'Years' },
		{ value: '15+', label: 'Engagements' }
	],
	industries: ['fintech', 'healthcare', 'industrial technology', 'enterprise']
};

export const trustProofItems: TrustProofItem[] = [
	{ label: 'Experience', value: '15+ years in production software' },
	{ label: 'Sectors', value: 'Fintech · Healthcare · Industrial technology · Enterprise' },
	{ label: 'Engagements', value: '15+ embedded engagements' },
	{ label: 'Mode', value: 'Embedded senior IC / technical lead' }
];

export const philosophy = {
	heading: 'How I work',
	body: 'I build context before proposing solutions: read the code, learn the team’s conventions, and focus on the paths closest to the problem. Then I make well-scoped changes that ship, leave the system easier to maintain, and support a clear handoff to the next engineer.'
};
