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

export type GithubActivity = {
	commitsLastYear: number;
	publicRepos: number;
	languages: string[];
};
