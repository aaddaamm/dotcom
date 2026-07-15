export type SeoConfig = {
	title: string;
	description: string;
	path: string;
};

export const pageSeo = {
	home: {
		title: 'Adam Robinson — Senior Software Engineer',
		description:
			'Providence senior software engineer with fifteen-plus years across fintech, healthcare, and enterprise. Open to full-time roles and select contract work.',
		path: '/'
	},
	hire: {
		title: 'Hire Adam Robinson — Senior Software Engineer',
		description:
			'Providence senior software engineer available for full-time senior or staff roles and select embedded contract engagements.',
		path: '/hire'
	},
	contact: {
		title: 'Contact Adam Robinson — Senior Software Engineer',
		description:
			'Contact Adam Robinson about full-time senior or staff engineering roles, embedded contract delivery, consulting, or technical collaboration.',
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
