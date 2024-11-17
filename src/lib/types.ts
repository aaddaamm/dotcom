export type Element = {
	type: ElementTypes | string;
	children: (string | Element)[] | string;
	props: Record<string, string>;
};

export enum ElementTypes {
	Paragraph = 'p',
	Heading1 = 'h1',
	Heading2 = 'h2',
	Heading3 = 'h3',
	Heading4 = 'h4',
	Heading5 = 'h5',
	Heading6 = 'h6',
	UnorderedList = 'ul',
	OrderedList = 'ol',
	ListItem = 'li',
	Anchor = 'a',
	Strong = 'strong',
	Emphasis = 'em',
	Code = 'code',
	Preformatted = 'pre',
	Blockquote = 'blockquote',
	HorizontalRule = 'hr',
	Table = 'table',
	TableHead = 'thead',
	TableBody = 'tbody',
	TableRow = 'tr',
	TableHeader = 'th',
	TableCell = 'td',
	Image = 'img',
	Video = 'video',
	Audio = 'audio',
	Source = 'source',
	Track = 'track',
	Form = 'form',
	Input = 'input',
	Button = 'button',
	Select = 'select',
	Option = 'option',
	TextArea = 'textarea',
	FieldSet = 'fieldset',
	Legend = 'legend',
	Label = 'label',
	Details = 'details',
	Summary = 'summary',
	Dialog = 'dialog',
	Progress = 'progress',
	Meter = 'meter',
	Article = 'article',
	Aside = 'aside',
	Header = 'header',
	Footer = 'footer',
	Nav = 'nav',
	Section = 'section'
}

export type GoodreadsBook = {
	cover: string;
	title: string;
	series?: string;
	author: string;
	url: string;
	rating?: number;
	dateRead?: string;
	isbn: string;
	isbn13: string;
	asin: string;
	dateStarted: string;
};

export type GoodreadsPagination = {
	page: number;
	URL?: string;
};
