import type { Element } from '$lib/types';
export const introCopy: Element[] = [
	{
		type: 'h2',
		children: 'Hello and welcome!',
		props: {
			className: 'h2 mb-4'
		}
	},
	{
		type: 'p',
		children:
			"I'm a software engineer working with MojoTech, where I focus on crafting effective and innovative solutions for our clients. My role allows me to dive into interesting challenges and continuously learn and grow in the tech field.",
		props: {
			className: 'mb-4'
		}
	},
	{
		type: 'p',
		children:
			"When I'm not at work, life is wonderfully busy with my four kids, who bring endless joy and energy into our home. We also have a mini Bernadoodle, adding a fun and furry dynamic to our family life.",
		props: {
			className: 'mb-4'
		}
	},
	{
		type: 'p',
		children: [
			"In my spare time, I have a deep love for reading, especially Sci-Fi and Fantasy books. These genres captivate my imagination and provide a great escape into other worlds. If you're a fellow book lover, be sure to check out the ",
			{
				type: 'a',
				children: 'Books',
				props: {
					href: '/play',
					className: 'text-primary hover:underline'
				}
			},
			' page on my site where I share my favorite reads and recommendations.'
		],
		props: {
			className: 'mb-4'
		}
	},
	{
		type: 'p',
		children:
			"I'm also an avid gamer, enjoying the immersive experiences that video games offer. I spend a lot of time on my Nintendo Switch and PS5, diving into epic adventures and challenging quests. Some of my favorite games include the Final Fantasy series, with its rich storytelling and intricate gameplay; Vampire Survivors, with its unique and engaging mechanics; and the Legend of Zelda series, which never fails to enchant with its expansive worlds and legendary heroics.",
		props: {
			className: 'mb-4'
		}
	},
	{
		type: 'p',
		children:
			"Thanks for visiting my site. If you'd like to connect or learn more about my work and interests, feel free to reach out.",
		props: {
			className: 'mb-4'
		}
	}
];
