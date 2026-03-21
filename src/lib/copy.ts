import { ElementTypes, type Element } from '$lib/types';
export const workCopy: Element[] = [
	{
		type: ElementTypes.Heading2,
		children: 'Professional Experience',
		props: {
			class: 'h2'
		}
	},
	{
		type: ElementTypes.Paragraph,
		children:
			"I'm a versatile full-stack engineer with expertise in modern web technologies, specializing in developing robust, scalable applications across diverse industries.",
		props: {
			class: 'pb-8'
		}
	},
	{
		type: ElementTypes.Heading3,
		children: 'MojoTech (2019-Present)',
		props: {
			class: 'h3'
		}
	},
	{
		type: ElementTypes.Paragraph,
		children:
			'As a Senior Software Engineer at MojoTech, I architect and implement complex web applications for clients across multiple sectors. My technical skills include:',
		props: {
			class: 'pb-4'
		}
	},
	{
		type: ElementTypes.UnorderedList,
		children: [
			{
				type: ElementTypes.ListItem,
				children:
					'Frontend development with React, TypeScript, and Svelte, creating responsive UIs with modern frameworks'
			},
			{
				type: ElementTypes.ListItem,
				children:
					'Backend systems using Node.js, Ruby on Rails, and PostgreSQL for data-intensive applications'
			},
			{
				type: ElementTypes.ListItem,
				children:
					'Cloud infrastructure on AWS, specializing in serverless architectures and CI/CD pipelines'
			},
			{
				type: ElementTypes.ListItem,
				children: 'API design and implementation following RESTful and GraphQL patterns'
			}
		],
		props: {
			class: 'list-disc ml-8 pb-4'
		}
	},
	{
		type: ElementTypes.Paragraph,
		children:
			'Key projects include an investment platform utilizing real-time data processing, a healthcare knowledge sharing platform with complex authorization systems, and power grid planning software featuring advanced visualization and analytics.',
		props: {
			class: 'pb-8'
		}
	},
	{
		type: ElementTypes.Heading3,
		children: 'Beacon Mutual (2015-2019)',
		props: {
			class: 'h3'
		}
	},
	{
		type: ElementTypes.Paragraph,
		children:
			'At Beacon Mutual, I progressed from Production Systems Controller to Software Engineer, gaining expertise in:',
		props: {
			class: 'pb-4'
		}
	},
	{
		type: ElementTypes.UnorderedList,
		children: [
			{
				type: ElementTypes.ListItem,
				children: 'Database architecture and PL/SQL stored procedure optimization'
			},
			{
				type: ElementTypes.ListItem,
				children: 'Enterprise system integration and automation using custom scripting solutions'
			},
			{
				type: ElementTypes.ListItem,
				children:
					'DevOps practices including deployment pipelines, environment management, and system monitoring'
			},
			{
				type: ElementTypes.ListItem,
				children: 'Legacy system modernization and maintenance'
			}
		],
		props: {
			class: 'list-disc ml-8 pb-8'
		}
	},
	{
		type: ElementTypes.Heading3,
		children: 'Early Career Experience',
		props: {
			class: 'h3'
		}
	},
	{
		type: ElementTypes.Paragraph,
		children:
			'My diverse background across multiple industries has equipped me with exceptional problem-solving abilities and adaptability. This varied experience has been invaluable in my software engineering career, allowing me to approach technical challenges with unique perspectives and communicate effectively with stakeholders from different backgrounds.',
		props: {
			class: 'pb-8'
		}
	},
	{
		type: ElementTypes.Heading3,
		children: 'Technical Skills',
		props: {
			class: 'h3'
		}
	},
	{
		type: ElementTypes.UnorderedList,
		children: [
			{
				type: ElementTypes.ListItem,
				children: 'Languages: JavaScript/TypeScript, Ruby, SQL, HTML/CSS'
			},
			{
				type: ElementTypes.ListItem,
				children: 'Frameworks: React, Svelte, Node.js, Rails, Express'
			},
			{
				type: ElementTypes.ListItem,
				children: 'Tools: Git, Docker, AWS, CI/CD, Jest, Playwright'
			},
			{
				type: ElementTypes.ListItem,
				children: 'Practices: Agile development, TDD, code reviews, technical documentation'
			}
		],
		props: {
			class: 'list-disc ml-8 pb-8'
		}
	}
];
