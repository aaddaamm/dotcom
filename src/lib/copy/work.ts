type CaseStudy = {
	situation: string;
	work: string;
	outcome: string;
};

export type WorkItem = {
	slug: string;
	title: string;
	employer: 'MojoTech';
	period: string;
	role: string;
	description: string;
	seoDescription: string;
	stack: string[];
	outcome: string;
	impactMetric: string;
	constraints?: string[];
	decisions?: string[];
	tradeoffs?: string[];
	results?: string[];
	caseStudy: CaseStudy;
};

export type EarlierWorkItem = {
	name: string;
	context: 'MojoTech client' | 'Employer';
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
		employer: 'MojoTech',
		period: 'May 2024–present',
		role: 'Senior Software Engineer, Consultant',
		description:
			'Embedded senior engineer on an alternative investment platform. Full-stack delivery across a large, complex enterprise codebase.',
		seoDescription:
			"Senior engineer on iCapital's fintech platform. Rails, React, TypeScript, i18n, bulk investment processing, and component library migration.",
		stack: ['React', 'TypeScript', 'Node.js', 'Rails'],
		outcome: 'Ongoing contributor across multiple subdomains of an enterprise fintech platform',
		impactMetric:
			'Centralized fragmented nominee flows in a Rails bulk-processing service that handles thousands of investments in one flow.',
		constraints: [
			'Large enterprise codebase with multiple specialized teams',
			'High-visibility nominee investments initiative',
			'Migration work depended on upstream component-library fixes'
		],
		decisions: [
			'Co-designed a Rails service to centralize bulk nominee processing',
			'Expanded i18n through both static UI and database-backed content',
			'Sequenced Supernova migration with coordinated library-team feedback'
		],
		tradeoffs: [
			'Prioritized scalable service boundaries over quick one-off patches',
			'Accepted incremental rollout to reduce risk in core investment flows'
		],
		results: [
			'Centralized fragmented nominee flows into a bulk flow for thousands of investments.',
			'Expanded localization across static UI and database-backed content.',
			'Completed Supernova v1→v2 migration while maintaining active delivery.'
		],
		caseStudy: {
			situation:
				"iCapital's platform handles alternative investment transactions for wealth managers in a large codebase maintained by specialized teams. I joined through MojoTech as an embedded senior engineer working across the stack.",
			work: "Expanded translation support across static UI copy and database-backed content using the Mobility gem. For the Nominee Investments project, co-designed and built a Rails service that consolidated several bulk-processing flows for thousands of investments. Also drove the team's migration from Supernova v1 to v2, working through breaking changes and coordinating upstream component fixes with the library team.",
			outcome:
				'The engagement continues across backend service design, localization, and component-library migration.'
		}
	},
	{
		slug: 'angi',
		title: 'Angi — Multi-Platform Engineering',
		employer: 'MojoTech',
		period: 'Nov 2020–Sep 2022',
		role: 'Senior Software Engineer, Consultant',
		description:
			'Contributed across three separate product codebases inside a single engagement. Also mentored a team of interns through their first real shipped feature.',
		seoDescription:
			"Senior engineer across merged Angi codebases: Vue/Java, Rails/React, and Next.js/Contentful for HomeAdvisor, Handy, and Angie's List.",
		stack: ['Vue', 'Java', 'Ruby on Rails', 'Next.js', 'Contentful'],
		outcome:
			'Cross-product delivery and intern mentorship across a newly merged home services platform',
		impactMetric:
			'Shipped unified flows across three post-merger codebases: Vue/Java, Rails/React, and Next.js.',
		constraints: [
			'Post-merger environment with separate stacks and teams',
			'Need to deliver while context-switching between codebases'
		],
		decisions: [
			'Unified quiz flow across brands in Vue/Java',
			'Improved assignment and ingestion workflows in Rails/React',
			'Built CMS-driven Next.js content experience and mentored interns on a live launch'
		],
		tradeoffs: [
			'Optimized for delivery velocity instead of deep rewrites in each codebase',
			'Balanced mentorship time with hands-on product delivery'
		],
		results: [
			'Unified and shipped flows across HomeAdvisor, Handy, and Angi.',
			'Mentored interns through a real release; delivered a production-ready Careers revamp.'
		],
		caseStudy: {
			situation:
				"Angi was in the middle of a merger. HomeAdvisor, Handy, and Angie's List still operated as separate products with their own codebases, stacks, and teams.",
			work: "On HomeAdvisor, worked in Vue and Java to unify the user quiz flow across the merging brands. On Handy, worked in Rails and React on professional assignment logic and job ingestion for partner stores. On Angie's List, built a CMS-driven Next.js content experience for project descriptions with varied layouts. I also coached a team of interns through a Careers page revamp and their first production release.",
			outcome:
				'Shipped across three products and stacks while mentoring interns through a production release.'
		}
	},
	{
		slug: 'shell',
		title: 'Shell — Oil Platform Decommissioning',
		employer: 'MojoTech',
		period: 'Jun 2018–Jul 2019',
		role: 'Software Engineer',
		description:
			'Built decommissioning tooling for Shell Techworks in Boston. MVP delivered onsite using the Google Design Sprint process.',
		seoDescription:
			'Software engineer building React and Node.js decommissioning tooling for Shell Techworks. MVP scoped and delivered onsite in Boston.',
		stack: ['React', 'Node.js', 'Ant Design'],
		outcome:
			'MVP delivered on schedule using Design Sprint methodology with Shell engineering in Boston',
		impactMetric:
			'Used an onsite Design Sprint to resolve planning ambiguity and deliver the decommissioning MVP on schedule.',
		constraints: [
			'Complex domain with high operational and cost implications',
			'Tight timeline for MVP definition and delivery'
		],
		decisions: [
			'Used Design Sprint sessions to rapidly converge on MVP scope',
			'Built full-stack React/Node system for least-cost path evaluation'
		],
		tradeoffs: ['Prioritized core optimization workflow over lower-value peripheral tooling'],
		results: ['Delivered MVP tooling for evaluating least-cost decommissioning paths.'],
		caseStudy: {
			situation:
				'Brought in to build tooling for Shell Techworks to support the decommissioning of end-of-life offshore oil platforms, a domain with significant cost and logistical constraints.',
			work: 'Built a full-stack application that ingested oil-platform data and evaluated the least-cost decommissioning path. The frontend used React with Ant Design, and the backend used Node. Worked onsite with the Shell Techworks team in Boston and used the Google Design Sprint process to define the MVP scope before implementation.',
			outcome:
				'Delivered the MVP on schedule after defining its scope through the onsite Design Sprint.'
		}
	},
	{
		slug: 'healthcasts',
		title: 'Healthcasts — Platform Modernization',
		employer: 'MojoTech',
		period: 'Oct 2022–May 2024',
		role: 'Technical Lead',
		description:
			'Tech lead on an 18-month platform modernization. Shipped a new CMS, custom rendering layer, and authentication overhaul to production.',
		seoDescription:
			'Technical lead for platform modernization: Strapi and React publishing pipeline, rebuilt AWS infrastructure, and Auth0 login overhaul.',
		stack: ['React', 'Express', 'Auth0', 'AWS', 'Strapi', 'PHP (legacy)'],
		outcome:
			'Sustained 18-month engagement spanning publishing, infrastructure, and authentication',
		impactMetric:
			'Replaced a slow publishing workflow and fragmented authentication with a Strapi/React pipeline and unified Auth0 login during an 18-month engagement.',
		constraints: [
			'Legacy platform and publishing workflow friction',
			'Auth fragmentation across multiple product surfaces'
		],
		decisions: [
			'Built Strapi + React publishing pipeline for faster editorial throughput',
			'Modernized AWS/framework stack to supported versions',
			'Unified authentication with Auth0 across platforms'
		],
		tradeoffs: [
			'Phased modernization to keep production operations stable',
			'Deferred non-critical polish while unblocking identity-dependent initiatives'
		],
		results: [
			'Reduced time-to-publish for core medical deliverables.',
			'Unified fragmented authentication in one secure login flow across platforms.',
			'Initial MVP expanded into an 18-month delivery engagement.'
		],
		caseStudy: {
			situation:
				"Brought in as tech lead to modernize Healthcasts' core publication workflow and platform infrastructure.",
			work: 'Built a new publishing pipeline around a headless CMS (Strapi) and a custom React rendering layer, reducing time-to-publish for their core medical consensus deliverable. Updated AWS infrastructure and migrated frameworks to current, supported versions. Then unified login across all their platforms with Auth0. The single secure flow also unblocked a parallel AI initiative dependent on a cleaner identity layer.',
			outcome:
				'The MVP expanded into an 18-month engagement spanning publishing, infrastructure, and authentication.'
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
	{ name: 'School of Motion', context: 'MojoTech client', industry: 'Edtech', period: '2020' },
	{
		name: 'Amica Mutual',
		context: 'MojoTech client',
		industry: 'Insurance',
		period: '2017–2018'
	},
	{
		name: 'AutoRaptor',
		context: 'MojoTech client',
		industry: 'Automotive CRM',
		period: '2015'
	},
	{
		name: 'Beacon Mutual Insurance',
		context: 'Employer',
		industry: 'Insurance',
		period: 'Mar 2011–Feb 2015'
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
		period: 'May 2024–present'
	},
	{
		sha: sha('healthcasts-2022'),
		ref: 'feat/healthcasts',
		message: 'feat(healthcasts): lead platform modernization from legacy PHP',
		period: 'Oct 2022–May 2024'
	},
	{
		sha: sha('angi-2021'),
		ref: 'feat/angi',
		message: 'feat(angi): deliver across three merged product codebases',
		period: 'Nov 2020–Sep 2022'
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
		period: 'Jun 2018–Jul 2019'
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
		sha: sha('beacon-2011'),
		ref: 'feat/beacon',
		message: 'feat(beacon): progress from production control to application development',
		period: 'Mar 2011–Feb 2015'
	}
];
