export const availability = {
	available: true,
	label: 'Available for new engagements — can typically start within a week or two'
};

export const selectedWork = [
	{
		slug: 'icapital',
		title: 'iCapital — Fintech Platform Engineering',
		period: '2024–present',
		role: 'Staff Augmentation / Senior Engineer',
		description:
			'Embedded senior engineer on an alternative investment platform. Full-stack delivery across a large, complex enterprise codebase.',
		stack: ['React', 'TypeScript', 'Node.js', 'Rails'],
		outcome: 'Ongoing contributor across multiple subdomains of an enterprise fintech platform',
		caseStudy: {
			situation:
				"iCapital's platform handles alternative investment transactions for wealth managers at scale — a large, complex codebase with many specialized teams. Joined as a staff aug senior engineer, embedded with one of those teams and contributing across the full stack.",
			work: "Expanded translation support across the platform — covering both static UI copy and dynamic, database-backed content using the Mobility gem for Rails. On the Nominee Investments project — a high-visibility initiative to unify several disparate nominee investment flows — co-designed and built a new Rails service to consolidate bulk processing for thousands of investments, with a clean API surface for frontend consumption. Also drove the team's migration from v1 to v2 of Supernova, their internal React component library — navigating breaking changes and coordinating back-and-forth with the library team when components needed fixes or new releases before the upgrade could proceed.",
			outcome:
				'Still engaged — trusted with backend service design, a cross-stack i18n rollout, and a component library migration on one of the more complex fintech platforms in the alternatives space.'
		}
	},
	{
		slug: 'angi',
		title: 'Angi — Multi-Platform Engineering',
		period: '2021–2022',
		role: 'Staff Augmentation / Senior Engineer',
		description:
			'Contributed across three separate product codebases inside a single engagement. Also mentored a team of interns through their first real shipped feature.',
		stack: ['Vue', 'Java', 'Ruby on Rails', 'Next.js', 'Contentful'],
		outcome:
			'Cross-product delivery and intern mentorship across a newly merged home services platform',
		caseStudy: {
			situation:
				"Angi was in the middle of a merger — HomeAdvisor, Handy, and Angie's List operating as separate products under one roof, each with its own codebase, stack, and team.",
			work: "On HomeAdvisor, worked in Vue and Java to unify the user quiz flow across the merging brands into a single Angi experience. On Handy, worked in Rails and React on professional assignment logic and job ingestion for Handy partner stores. On Angie's List, built out a CMS-driven content experience in Next.js — blog-style project descriptions with varied visual layouts. Along the way, found myself in a position to take on a team of interns: coached them through real development workflows using a live use case — a Careers page revamp — and by the end they had something real to demo. Brought in a colleague to help carry the work across the finish line before rotating off.",
			outcome:
				'Delivered across three separate products and stacks inside a single engagement — and left a cleaner codebase and a team of interns who shipped something they could be proud of.'
		}
	},
	{
		slug: 'shell',
		title: 'Shell — Oil Platform Decommissioning',
		period: '2018–2019',
		role: 'Software Engineer',
		description:
			'Built decommissioning tooling for Shell Techworks in Boston. MVP delivered onsite using the Google Design Sprint process.',
		stack: ['React', 'Node.js', 'Ant Design'],
		outcome:
			'MVP delivered on schedule using Design Sprint methodology with Shell engineering in Boston',
		caseStudy: {
			situation:
				'Brought in to build tooling for Shell Techworks to support the decommissioning of end-of-life offshore oil platforms — a domain with real cost and logistical complexity.',
			work: 'Built a full-stack application that ingested oil platform data and processed it to determine the optimal, least-cost decommissioning path. Frontend in React with Ant Design, backend in Node. Worked onsite with the Shell Techworks team in Boston, using the Google Design Sprint process to rapidly iterate and arrive at a clear MVP scope — compressing what could have been months of back-and-forth into focused, structured sessions.',
			outcome:
				'MVP delivered on schedule, with the Design Sprint process doing real work — not just ceremony.'
		}
	},
	{
		slug: 'healthcasts',
		title: 'Healthcasts — Platform Modernization',
		period: '2022–2024',
		role: 'Team Lead',
		description:
			'Tech lead on a platform modernization that grew into a four-year collaboration. New CMS, custom rendering layer, and a full authentication overhaul — all shipped to production.',
		stack: ['React', 'Express', 'Auth0', 'AWS', 'Strapi', 'PHP (legacy)'],
		outcome: 'Successful MVP delivery that led to a four-year continued engagement',
		caseStudy: {
			situation:
				"Brought in as tech lead to modernize Healthcasts' core publication workflow and platform infrastructure.",
			work: 'Built a new publishing pipeline around a headless CMS (Strapi) and a custom React rendering layer, dramatically reducing time-to-publish for their medical consensus deliverable — a structured question posed to their user base, condensed into a published document for readers. Updated their AWS infrastructure and migrated frameworks to current, supported versions. Then led a full authentication overhaul — unifying login across all their platforms with Auth0, moving to a single secure flow that also unblocked a parallel AI initiative dependent on a cleaner identity layer.',
			outcome:
				'The MVP engagement grew into a four-year collaboration — a rare signal that the work held up under real production conditions.'
		}
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

export const faqItems = [
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

export const homepageMetrics = {
	numbers: [
		{ value: '10+', label: 'Years' },
		{ value: '15+', label: 'Projects' }
	],
	industries: ['fintech', 'healthcare', 'enterprise']
};

export const philosophy = {
	heading: 'How I work',
	body: "The best engineers I've worked with weren't the ones with the strongest opinions — they were the ones who listened first. When I join a team, my job isn't to replace your culture, your patterns, or your conventions. It's to slot in, read the code before I write any, ask the questions a newcomer notices but regulars have stopped asking, and then ship reliably. I'd rather land one well-scoped change than three speculative ones. I treat every codebase as something other engineers will inherit from me — including the one I'm touching right now."
};
