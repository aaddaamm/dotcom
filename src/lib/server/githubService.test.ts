import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadGithubService(githubToken = 'test-token') {
	vi.doMock('$env/dynamic/private', () => ({
		env: { GITHUB_TOKEN: githubToken }
	}));
	vi.doMock('$lib/server/redis', () => ({
		getRedis: () => null
	}));

	const module = await import('./githubService');
	return module.default;
}

describe('GithubService', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('requests the public repositories connection with pagination', async () => {
		const GithubService = await loadGithubService();
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					data: {
						user: {
							publicRepos: {
								totalCount: 1,
								nodes: [{ primaryLanguage: { name: 'TypeScript' } }]
							},
							contributionsCollection: { totalCommitContributions: 42 }
						}
					}
				}),
				{ status: 200 }
			)
		);

		const activity = await GithubService.getActivity(fetchMock as unknown as typeof fetch);
		const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body as string) as { query: string };

		expect(requestBody.query).toContain('repositories(');
		expect(requestBody.query).toContain('first: 100');
		expect(activity).toEqual({
			commitsLastYear: 42,
			publicRepos: 1,
			languages: ['TypeScript']
		});
	});

	it('returns null for GitHub GraphQL errors', async () => {
		const GithubService = await loadGithubService();
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					errors: [{ message: 'Field repositories argument first or last is required' }]
				}),
				{ status: 200 }
			)
		);

		const activity = await GithubService.getActivity(fetchMock as unknown as typeof fetch);

		expect(activity).toBeNull();
	});
});
