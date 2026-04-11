export const availability = {
	available: true,
	label: 'Available for new engagements — can typically start within a week or two'
};

export const approachItems = [
	'Clear documentation and maintainable code',
	'Building solutions that grow with your needs',
	'Simple tools that solve real problems',
	'Supporting you and your team long-term'
];

export const selectedWork = [
	{
		title: 'iCapital — Fintech Platform Engineering',
		period: '2024–present',
		role: 'Staff Augmentation / Senior Engineer',
		description:
			"Embedded with an engineering team building a subdomain of iCapital's alternative investment platform. Navigating a large, complex codebase independently to deliver full-stack solutions, while also contributing to communication practices and engineering culture.",
		stack: ['React', 'TypeScript', 'Node.js'],
		outcome: 'Ongoing contributor across multiple subdomains of an enterprise fintech platform'
	},
	{
		title: 'Angi — Multi-Platform Engineering',
		period: '2021–2022',
		role: 'Staff Augmentation / Senior Engineer',
		description:
			"Moved across three separate products — HomeAdvisor (Vue/Java), Handy (Ruby on Rails), and Angie's List (Next.js) — contributing to each on its own terms. Took engineering interns under my wing, exposing them to sound practices and involving them in meaningful domain design work.",
		stack: ['Vue', 'Java', 'Ruby on Rails', 'Next.js', 'Contentful'],
		outcome:
			'Cross-product delivery and intern mentorship across a newly merged home services platform'
	},
	{
		title: 'Shell — Oil Platform Decommissioning',
		period: '2018–2019',
		role: 'Software Engineer',
		description:
			'Built software to support the decommissioning of end-of-life oil platforms for Shell Techworks in Boston. Fast-paced MVP delivery with React and Node, structured around the Google Design Sprint process, including onsite collaboration sessions.',
		stack: ['React', 'Node.js'],
		outcome:
			'MVP delivered on schedule using Design Sprint methodology with Shell engineering in Boston'
	},
	{
		title: 'Healthcasts — Platform Modernization',
		period: '2022–2024',
		role: 'Team Lead',
		description:
			'Team lead debut: worked with the client to plan an MVP that modernized their core business deliverables. Dove into a legacy PHP application to surface business logic, then rebuilt around a new CMS, review workflow, and custom rendering layer. Completely overhauled authentication — ripping out a brittle custom solution and replacing it with OAuth via Auth0 — which required a full backend redesign and careful coordination across engineering teams to propagate the change between the legacy system and the new one without breaking production. Navigated tight deadlines and an AWS crash course throughout. The engagement succeeded and grew into a four-year collaboration.',
		stack: ['React', 'Express', 'Auth0', 'AWS', 'PHP (legacy)'],
		outcome: 'Successful MVP delivery that led to a four-year continued engagement'
	}
];

export const earlierWork = [
	{ name: 'School of Motion', industry: 'Edtech', period: '2020' },
	{ name: 'Amica Mutual', industry: 'Insurance', period: '2017–2018' },
	{ name: 'AutoRaptor', industry: 'Automotive CRM', period: '2015' },
	{ name: 'Beacon Mutual Insurance', industry: 'Insurance', period: '2013–2016' }
];

function sha(seed: string): string {
	let h = 0x811c9dc5;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 0x01000193) >>> 0;
	}
	return h.toString(16).slice(0, 7);
}

export const gitLog = [
	{
		sha: sha('icapital-2024'),
		ref: 'HEAD → main',
		message: 'feat(icapital): embed with fintech platform engineering team',
		period: '2024–'
	},
	{
		sha: sha('healthcasts-2022'),
		ref: 'feat/healthcasts',
		message: 'feat(healthcasts): lead platform modernization from legacy PHP',
		period: '2022–2024'
	},
	{
		sha: sha('angi-2021'),
		ref: 'feat/angi',
		message: 'feat(angi): deliver across three merged product codebases',
		period: '2021–2022'
	},
	{
		sha: sha('school-of-motion-2020'),
		ref: 'feat/school-of-motion',
		message: 'feat(school-of-motion): build edtech platform features',
		period: '2020'
	},
	{
		sha: sha('shell-2018'),
		ref: 'feat/shell',
		message: 'feat(shell): build decommissioning tooling for oil platforms',
		period: '2018–2019'
	},
	{
		sha: sha('amica-2017'),
		ref: 'chore/amica',
		message: 'chore(amica): maintain insurance backend systems',
		period: '2017–2018'
	},
	{
		sha: sha('autoraptor-2015'),
		ref: 'feat/autoraptor',
		message: 'feat(autoraptor): build automotive crm features',
		period: '2015'
	},
	{
		sha: sha('beacon-2013'),
		ref: 'feat/beacon',
		message: 'feat(beacon): build claims and policy management systems',
		period: '2013–2016'
	}
];

export const techStack = [
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

export const services = [
	{
		title: 'Embedded Engineering',
		icon: 'code',
		description:
			'Join your team as a senior contributor. I navigate complex, unfamiliar codebases independently, deliver across the stack, and ramp up without heavy hand-holding.',
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
			'Build or evolve the systems that power your product — APIs, authentication, data pipelines, and service architecture.',
		examples: ['API design', 'Authentication systems', 'Service architecture', 'Performance work'],
		outcome: 'Reliable, well-structured systems built to last'
	},
	{
		title: 'Technical Leadership',
		icon: 'lightbulb',
		description:
			"Lead a team, review architecture, or help plan a complex initiative. I've led engineering teams through greenfield builds and legacy modernizations.",
		examples: [
			'Team leadership',
			'Architecture review',
			'Technical planning',
			'Engineering culture'
		],
		outcome: 'Better decisions, faster delivery, stronger teams'
	}
];

export const faqItems = [
	{
		question: 'What kinds of engagements do you take on?',
		answer:
			"Primarily contract staff augmentation — embedded with an existing engineering team, contributing as a senior engineer. I'm also open to full-time roles for the right opportunity."
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
