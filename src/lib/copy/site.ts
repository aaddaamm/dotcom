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
		title: 'Startup Product Delivery',
		icon: 'code',
		description:
			'Join your product team as a senior engineer and take ownership of roadmap work without adding another management layer.',
		examples: [
			'MVP feature delivery',
			'Full-stack execution',
			'Tech debt cleanup',
			'Ship-ready handoff'
		],
		outcome: 'Senior ownership for work already on the roadmap'
	},
	{
		title: 'Agency Delivery Partner',
		icon: 'globe',
		description:
			'Support your agency team with technical scoping and hands-on production work for client projects.',
		examples: [
			'Client project support',
			'Technical discovery',
			'Backend/API work',
			'Launch support'
		],
		outcome: 'Senior engineering support for client delivery'
	},
	{
		title: 'Platform Stabilization & Modernization',
		icon: 'lightbulb',
		description:
			'Stabilize fragile systems and modernize legacy code so your team can maintain and extend the platform after the engagement.',
		examples: [
			'Legacy modernization',
			'Architecture guidance',
			'Performance and reliability',
			'Cross-team enablement'
		],
		outcome: 'A platform your team can maintain and extend'
	}
];

export const faqItems: FaqItem[] = [
	{
		question: 'Are you open to full-time roles?',
		answer:
			"Yes. I'm actively open to full-time senior or staff roles with strong product ownership. I also consider select contract engagements where I can embed with an existing team and ship quickly."
	},
	{
		question: 'What kinds of engagements do you take on?',
		answer:
			'Full-time senior or staff roles are a strong fit, particularly where I can own complex product and platform work. For contract work, I embed with an existing engineering team as a senior contributor or technical lead.'
	},
	{
		question: 'How quickly can you get up to speed?',
		answer:
			"I've worked in large, unfamiliar codebases throughout my career. I begin with the code paths tied to the task and the team's existing conventions, then start contributing."
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
	audienceKeywords: ['Full-time', 'product teams', 'Contract engagements'],
	availability: 'Available for full-time senior/staff roles and select contract engagements.',
	ctaOrder: ['Start a conversation', 'See how I work', 'Download résumé']
};

export const homepageMetrics: {
	numbers: HomepageMetric[];
	industries: string[];
} = {
	numbers: [
		{ value: '15+', label: 'Years' },
		{ value: '15+', label: 'Projects' }
	],
	industries: ['fintech', 'healthcare', 'enterprise']
};

export const trustProofItems: TrustProofItem[] = [
	{ label: 'Experience', value: '15+ years' },
	{ label: 'Sectors', value: 'Fintech · Healthcare · Enterprise' },
	{ label: 'Engagements', value: '15+ delivered' },
	{ label: 'Mode', value: 'Embedded senior IC / tech lead' }
];

export const philosophy = {
	heading: 'How I work',
	body: "The best engineers I've worked with listened before offering an opinion. I try to do the same. When I join a team, I read the code before I write any, learn its conventions, and ask the questions a newcomer notices but regulars have stopped asking. Then I ship reliably. I'd rather land one well-scoped change than three speculative ones. I treat every codebase as something another engineer will inherit from me."
};
