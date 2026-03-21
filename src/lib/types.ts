export type Element = {
	type: ElementTypes | string;
	children: (string | Element)[] | string;
	props: Record<string, string>;
};

export enum ElementTypes {
	Paragraph = 'p',
	Heading2 = 'h2',
	Heading3 = 'h3',
	UnorderedList = 'ul',
	ListItem = 'li',
	Anchor = 'a'
}

export type GoodreadsBook = {
	cover: string;
	title: string;
	series?: string;
	author: string;
	url: string;
	rating?: number;
	isbn: string;
	dateStarted?: string;
	goodreadsID: number;
};
