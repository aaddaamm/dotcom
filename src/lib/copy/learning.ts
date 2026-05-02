export type LearningResource = {
	title: string;
	url: string;
	description: string;
	category: string;
};

export const learningResources: LearningResource[] = [
	{
		title: 'Exercism',
		url: 'https://exercism.org',
		description:
			'Practice coding with mentorship in 70+ programming languages. Free, hands-on exercises with real human feedback.',
		category: 'Interactive Practice'
	},
	{
		title: 'freeCodeCamp',
		url: 'https://freecodecamp.org',
		description:
			'Comprehensive full-stack web development curriculum with projects and certifications.',
		category: 'Full Curriculum'
	},
	{
		title: 'The Odin Project',
		url: 'https://theodinproject.com',
		description:
			'Open-source curriculum for learning web development with a focus on building real projects.',
		category: 'Full Curriculum'
	},
	{
		title: 'MDN Web Docs',
		url: 'https://developer.mozilla.org',
		description:
			'Comprehensive documentation and tutorials for web technologies (HTML, CSS, JavaScript).',
		category: 'Reference & Tutorials'
	},
	{
		title: 'LeetCode',
		url: 'https://leetcode.com',
		description: 'Algorithm and data structure problems for technical interview preparation.',
		category: 'Problem Solving'
	},
	{
		title: 'Codecademy',
		url: 'https://codecademy.com',
		description:
			'Interactive coding lessons with hands-on practice in various programming languages.',
		category: 'Interactive Learning'
	},
	{
		title: 'IndyDevDan',
		url: 'https://www.youtube.com/@indydevdan',
		description:
			'YouTube channel covering AI-powered development workflows, coding agents, and practical developer tooling.',
		category: 'Video Content'
	}
];
