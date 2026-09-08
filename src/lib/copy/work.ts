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
	description: string;
};

export const selectedWork: WorkItem[] = [
	{
		slug: 'icapital',
		title: 'iCapital — Full-Stack Feature Development',
		employer: 'MojoTech',
		period: 'May 2024–present',
		role: 'Senior Software Engineer, Consultant',
		description:
			'Develop features across iCapital’s investment platform, spanning backend services, localization, and shared frontend tooling.',
		seoDescription:
			'iCapital case study: Rails service architecture for Nominees, backend translation migration with Mobility, and custom forms migration to a shared package.',
		stack: ['React', 'TypeScript', 'Node.js', 'Rails'],
		outcome:
			'Helped architect and implement the Nominees backend service; ongoing work includes localization and shared frontend tooling.',
		impactMetric:
			'Helped architect and implement a Rails backend service for the Nominees reimplementation.',
		constraints: [
			'Specialized international investment workflows',
			'Feature development within a large enterprise platform'
		],
		decisions: [
			'Helped architect a Rails backend service for the Nominees reimplementation',
			'Worked on migrating backend translation capabilities using Mobility',
			'Migrating custom frontend forms to a shared internal package'
		],
		tradeoffs: [],
		results: [
			'Helped architect and implement the Nominees backend service.',
			'Worked on the backend translation migration using Mobility.',
			'Custom frontend forms migration to a shared internal package is in progress.'
		],
		caseStudy: {
			situation:
				'I joined iCapital through MojoTech as an embedded senior engineer. My work has focused primarily on feature development across its investment platform.',
			work: 'Helped architect and implement a Rails backend service for the reimplementation of Nominees, a business unit handling specialized international investments. Worked on migrating backend translation capabilities using Mobility. More recently, I have been migrating custom frontend forms to a shared internal package.',
			outcome:
				'The engagement continues across feature development, backend service architecture, localization, and shared frontend tooling.'
		}
	},
	{
		slug: 'angi',
		title: 'Angi — Multi-Platform Engineering',
		employer: 'MojoTech',
		period: 'Nov 2020–Sep 2022',
		role: 'Senior Software Engineer, Consultant',
		description:
			'Delivered frontend and backend features across Angi and Handy, and managed interns rebuilding the Careers page before taking over the remaining implementation.',
		seoDescription:
			'Angi case study: Java/Vue quiz features, React/Rails work at Handy, Contentful/Next.js pages, and managing interns on a Careers rebuild.',
		stack: ['Vue', 'Java', 'Ruby on Rails', 'Next.js', 'Contentful'],
		outcome:
			'Delivered across Java/Vue, React/Rails, and Next.js/Contentful; managed the Careers interns and took over the remaining implementation.',
		impactMetric:
			'Delivered frontend and backend features across Angi and Handy during the Angi rebrand.',
		constraints: [
			'A product-direction pivot during the Angi rebrand',
			'Work spanning multiple frontend and backend stacks'
		],
		decisions: [
			'Developed Java and Vue.js features for the unified quiz flow',
			'Contributed React and Rails features under the Handy brand',
			'Built CMS-driven Angi pages using Contentful and Next.js',
			'Managed interns rebuilding the Careers page and took over remaining implementation after their internships ended'
		],
		tradeoffs: [],
		results: [
			'Delivered frontend and backend features across Angi and Handy.',
			'Built CMS-driven Angi pages using Contentful and Next.js.',
			'Managed interns on the Careers rebuild, then took over the remaining implementation.'
		],
		caseStudy: {
			situation:
				'I worked as part of a team at Angi through MojoTech. Our assignment pivoted to the unified quiz flow when the company chose to rebrand as Angi.',
			work: 'Developed backend features in Java and frontend features in Vue.js for the unified quiz flow. Then contributed frontend and backend development under the Handy brand using React and Rails. Built CMS-driven Angi pages using Contentful and Next.js. I also managed interns rebuilding the Careers page, then took over the remaining implementation after their internships ended.',
			outcome:
				'Delivered across multiple products and stacks while taking on responsibility for the Careers rebuild and the interns working on it.'
		}
	},
	{
		slug: 'shell',
		title: 'Shell — Oil Platform Decommissioning',
		employer: 'MojoTech',
		period: 'Jun 2018–Jul 2019',
		role: 'Software Engineer',
		description:
			'Built a React and Node.js application for evaluating least-cost offshore-platform decommissioning paths, delivering the MVP onsite in Boston.',
		seoDescription:
			'Shell case study: React and Node.js tooling for least-cost offshore-platform decommissioning, scoped and delivered onsite in Boston.',
		stack: ['React', 'Node.js', 'Ant Design'],
		outcome:
			'MVP delivered on schedule after an onsite Design Sprint with Shell Techworks in Boston.',
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
		title: 'Healthcasts — Publishing and Platform Modernization',
		employer: 'MojoTech',
		period: 'Oct 2022–May 2024',
		role: 'Technical Lead',
		description:
			'Led development across publishing, authentication, and AI platform initiatives, helping define goals and technical approaches while implementing throughout.',
		seoDescription:
			'Healthcasts case study: technical leadership and hands-on development across a weeks-to-days CMS workflow, authentication rewrite, and AI platform.',
		stack: ['React', 'Express', 'Auth0', 'AWS', 'Strapi', 'PHP (legacy)'],
		outcome:
			'Reduced a core publishing process from weeks to a couple of days; led development across authentication and AI platform initiatives.',
		impactMetric:
			'Co-designed and implemented a headless CMS workflow that reduced a core publishing process from weeks to a couple of days.',
		constraints: [
			'A core publishing workflow that took weeks',
			'A new authentication strategy requiring an extensive backend rewrite'
		],
		decisions: [
			'Helped define goals and technical approaches across publishing, authentication, and AI platform work',
			'Co-designed and implemented a custom headless CMS workflow with another engineer',
			'Helped define and led implementation of a new authentication strategy using Auth0'
		],
		tradeoffs: [],
		results: [
			'Reduced a core publishing process from weeks of work to a couple of days.',
			'Led and contributed to an extensive rewrite of the authentication layer and backend.',
			'Led development and implemented parts of the AI platform.'
		],
		caseStudy: {
			situation:
				'I served as technical lead throughout the Healthcasts engagement, leading development and helping define project goals and technical approaches across publishing, authentication, and AI platform initiatives.',
			work: 'Co-designed and implemented a custom headless CMS workflow using Strapi and React with another engineer. Helped define and led implementation of a new authentication strategy using Auth0, including an extensive rewrite of the authentication layer and backend. Subsequently led development and implemented parts of the client’s AI platform, helping shape its goals and technical approach.',
			outcome:
				'The publishing workflow reduced a core process from weeks of work to a couple of days. Throughout the engagement, I combined technical leadership with hands-on implementation across publishing, authentication, and AI platform development.'
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
	{
		name: 'AutoRaptor',
		context: 'MojoTech client',
		industry: 'Automotive CRM',
		period: 'Jun–Dec 2015',
		description: 'Early client engagement on an automotive CRM platform.'
	},
	{
		name: 'Two Sigma',
		context: 'MojoTech client',
		industry: 'Investment management',
		period: 'Dec 2015–Jul 2016',
		description: 'Worked on the Client Solutions Platform during an early period of React adoption.'
	},
	{
		name: 'Welltok',
		context: 'MojoTech client',
		industry: 'Healthcare technology',
		period: 'Aug 2016–Jan 2017',
		description: 'Client engagement on a healthcare technology platform.'
	},
	{
		name: 'Amica Mutual',
		context: 'MojoTech client',
		industry: 'Insurance',
		period: 'Mar 2017–May 2018',
		description: 'Worked on insurance platform delivery after earlier employment at Beacon Mutual.'
	},
	{
		name: 'Credit Karma',
		context: 'MojoTech client',
		industry: 'Consumer finance',
		period: 'Aug 2019–Jan 2020',
		description: 'Contributed across multiple product tracks during a short, focused engagement.'
	},
	{
		name: 'School of Motion',
		context: 'MojoTech client',
		industry: 'Edtech',
		period: 'Apr–Jul 2020',
		description: 'Client engagement on an online education platform.'
	},
	{
		name: 'Schneider Electric',
		context: 'MojoTech client',
		industry: 'Industrial technology',
		period: 'Feb–Mar, Oct 2020',
		description: 'Stepped in as technical lead for the Layout Fast project between engagements.'
	},
	{
		name: 'Beacon Mutual Insurance',
		context: 'Employer',
		industry: 'Insurance',
		period: 'Mar 2011–Feb 2015',
		description:
			'Progressed from production control into full-stack and database development for claims, policy, financial transaction, and payment systems.'
	}
];
