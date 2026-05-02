export type CaseStudy = {
	situation: string;
	work: string;
	outcome: string;
};

export type WorkItem = {
	slug: string;
	title: string;
	period: string;
	role: string;
	description: string;
	seoDescription: string;
	stack: string[];
	outcome: string;
	caseStudy: CaseStudy;
};

export type EarlierWorkItem = {
	name: string;
	industry: string;
	period: string;
};

export type GitLogItem = {
	sha: string;
	ref: string;
	message: string;
	period: string;
};

export const selectedWork: WorkItem[] = [
	{
		slug: 'icapital',
		title: 'iCapital — Fintech Platform Engineering',
		period: '2024–present',
		role: 'Staff Augmentation / Senior Engineer',
		description:
			'Embedded senior engineer on an alternative investment platform. Full-stack delivery across a large, complex enterprise codebase.',
		seoDescription:
			"Senior staff-aug engineer on iCapital's fintech platform. Rails, React, TypeScript — i18n, bulk nominee investment processing, and a component library migration on a complex enterprise codebase.",
		stack: ['React', 'TypeScript', 'Node.js', 'Rails'],
		outcome: 'Ongoing contributor across multiple subdomains of an enterprise fintech platform',
		caseStudy: {
			situation:
				"iCapital's platform handles alternative investment transactions for wealth managers at scale — a large, complex codebase with many specialized teams. Joined as a staff aug senior engineer, embedded with one of those teams and contributing across the full stack.",
			work: "Expanded translation support across the platform, covering both static UI copy and dynamic database-backed content using the Mobility gem. On the Nominee Investments project — a high-visibility initiative to unify several disparate nominee investment flows — co-designed and built a new Rails service to consolidate bulk processing for thousands of investments. Also drove the team's migration from Supernova v1 to v2, navigating breaking changes and coordinating with the library team when components needed fixes before the upgrade could proceed.",
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
		seoDescription:
			"Senior staff-aug engineer across three merged codebases in a single engagement — Vue/Java, Rails/React, and Next.js/Contentful across HomeAdvisor, Handy, and Angie's List.",
		stack: ['Vue', 'Java', 'Ruby on Rails', 'Next.js', 'Contentful'],
		outcome:
			'Cross-product delivery and intern mentorship across a newly merged home services platform',
		caseStudy: {
			situation:
				"Angi was in the middle of a merger — HomeAdvisor, Handy, and Angie's List operating as separate products under one roof, each with its own codebase, stack, and team.",
			work: "On HomeAdvisor, worked in Vue and Java to unify the user quiz flow across the merging brands into a single Angi experience. On Handy, worked in Rails and React on professional assignment logic and job ingestion for Handy partner stores. On Angie's List, built out a CMS-driven content experience in Next.js — blog-style project descriptions with varied visual layouts. Along the way, took on a team of interns: coached them through real development workflows using a live use case — a Careers page revamp — and by the end they had something real to demo.",
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
		seoDescription:
			'Software engineer building full-stack React/Node.js decommissioning tooling for Shell Techworks. MVP scoped and delivered onsite in Boston using the Google Design Sprint process.',
		stack: ['React', 'Node.js', 'Ant Design'],
		outcome:
			'MVP delivered on schedule using Design Sprint methodology with Shell engineering in Boston',
		caseStudy: {
			situation:
				'Brought in to build tooling for Shell Techworks to support the decommissioning of end-of-life offshore oil platforms — a domain with real cost and logistical complexity.',
			work: 'Built a full-stack application that ingested oil platform data and determined the optimal, least-cost decommissioning path. Frontend in React with Ant Design, backend in Node. Worked onsite with the Shell Techworks team in Boston, using the Google Design Sprint process to rapidly iterate and arrive at a clear MVP scope — compressing months of potential back-and-forth into focused, structured sessions.',
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
		seoDescription:
			'Technical lead on a full platform modernization — headless CMS pipeline with Strapi and React, rebuilt AWS infrastructure, and Auth0 authentication overhaul unifying login across all platforms.',
		stack: ['React', 'Express', 'Auth0', 'AWS', 'Strapi', 'PHP (legacy)'],
		outcome: 'Successful MVP delivery that led to a four-year continued engagement',
		caseStudy: {
			situation:
				"Brought in as tech lead to modernize Healthcasts' core publication workflow and platform infrastructure.",
			work: 'Built a new publishing pipeline around a headless CMS (Strapi) and a custom React rendering layer, dramatically reducing time-to-publish for their core medical consensus deliverable. Updated AWS infrastructure and migrated frameworks to current, supported versions. Then led a full authentication overhaul — unifying login across all their platforms with Auth0, moving to a single secure flow that also unblocked a parallel AI initiative dependent on a cleaner identity layer.',
			outcome:
				'The MVP engagement grew into a four-year collaboration — a rare signal that the work held up under real production conditions.'
		}
	}
];

export const blogTagToWorkSlugs: Record<string, WorkItem['slug'][]> = {
	ai: ['icapital', 'healthcasts'],
	'developer-tools': ['icapital'],
	productivity: ['icapital'],
	hiring: ['angi', 'healthcasts'],
	freelancing: ['healthcasts', 'shell'],
	'small-business': ['healthcasts']
};

export const earlierWork: EarlierWorkItem[] = [
	{ name: 'School of Motion', industry: 'Edtech', period: '2020' },
	{ name: 'Amica Mutual', industry: 'Insurance', period: '2017–2018' },
	{ name: 'AutoRaptor', industry: 'Automotive CRM', period: '2015' },
	{
		name: 'Beacon Mutual Insurance',
		industry: 'Insurance',
		period: '2013–2016'
	}
];

function sha(seed: string): string {
	let h = 0x811c9dc5;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 0x01000193) >>> 0;
	}
	return h.toString(16).slice(0, 7);
}

export const gitLog: GitLogItem[] = [
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
