export type SeoConfig = {
	title: string;
	description: string;
	path: string;
};

export const pageSeo = {
	home: {
		title: 'Adam Robinson — Senior Software Engineer, Providence RI',
		description:
			'Senior software engineer in Providence, RI. Rails, Node.js, TypeScript. Contract and full-time. Ten-plus years in fintech, healthcare, and enterprise.',
		path: '/'
	},
	hire: {
		title: 'Hire Adam Robinson — Senior Software Engineer for Product Teams',
		description:
			'Senior software engineer in Providence, RI. I help product teams ship reliable web products faster through contract and advisory engagements.',
		path: '/hire'
	},
	contact: {
		title: 'Start a Project — Adam Robinson',
		description:
			'Start a project with Adam Robinson, senior software engineer in Providence, RI. Contract and advisory support for product teams shipping with confidence.',
		path: '/contact'
	},
	work: {
		title: 'Work — Adam Robinson',
		description:
			'Ten-plus years of engineering work across fintech, healthcare, and enterprise. Rails, Node.js, TypeScript. Staff augmentation and technical leadership.',
		path: '/work'
	},
	blog: {
		title: 'Blog — Adam Robinson',
		description:
			'Writing on backend engineering, Rails, Node.js, and TypeScript — practical insights from ten-plus years across fintech, healthcare, and enterprise.',
		path: '/blog'
	},
	teach: {
		title: 'Learning Resources — Adam Robinson',
		description:
			'Curated list of the best free and paid resources for learning programming, web development, and software engineering skills.',
		path: '/teach'
	},
	play: {
		title: 'Reading — Adam Robinson',
		description:
			'Books Adam Robinson is currently reading and recently finished — a curated reading list spanning software engineering, design, and more.',
		path: '/play'
	},
	terminal: {
		title: 'Terminal — Adam Robinson',
		description:
			'An interactive terminal for the curious. Try whoami, ls /work, or sudo hire adam.',
		path: '/terminal'
	}
} as const satisfies Record<string, SeoConfig>;
