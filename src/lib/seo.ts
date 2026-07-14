export type SeoConfig = {
	title: string;
	description: string;
	path: string;
};

export const pageSeo = {
	home: {
		title: 'Adam Robinson — Freelance Engineer for Startups & Agencies',
		description:
			'Providence freelance senior software engineer for startups and agencies. SvelteKit, TypeScript, Rails, and Node.js delivery with production-ready outcomes.',
		path: '/'
	},
	hire: {
		title: 'Hire Adam Robinson — Freelance Senior Engineer',
		description:
			'Freelance senior software engineer in Providence, RI. I help startup and agency teams ship reliable web products faster through embedded contract engagements.',
		path: '/hire'
	},
	contact: {
		title: 'Book a Project Call — Adam Robinson',
		description:
			'Book a project call with Adam Robinson, Providence freelance senior engineer for startups and agencies shipping production web products.',
		path: '/contact'
	},
	work: {
		title: 'Work — Adam Robinson',
		description:
			'Fifteen-plus years of engineering work across fintech, healthcare, and enterprise. Rails, Node.js, TypeScript. Embedded delivery and technical leadership.',
		path: '/work'
	},
	now: {
		title: 'Now — Adam Robinson',
		description:
			'What I am focused on now: current engineering work, experiments, writing themes, and collaboration openings.',
		path: '/now'
	},
	blog: {
		title: 'Blog — Adam Robinson',
		description:
			'Writing on backend engineering, Rails, Node.js, and TypeScript — practical insights from fifteen-plus years across fintech, healthcare, and enterprise.',
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
