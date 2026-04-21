import type { GithubActivity } from '$lib/types';
import { GITHUB_USERNAME } from '$lib/constants';
import { getRedis } from '$lib/server/redis';
import { env } from '$env/dynamic/private';

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;
const CACHE_KEY = `github:activity:${GITHUB_USERNAME}`;

// Curated language shortlist — the subset we're willing to show publicly.
// Anything not in this list is filtered out to avoid surfacing tutorial-only repos.
const LANGUAGE_ALLOWLIST = new Set([
	'TypeScript',
	'JavaScript',
	'Svelte',
	'Ruby',
	'Elixir',
	'C++',
	'Go',
	'Rust',
	'Python'
]);

const memoryCache: { data: GithubActivity | null; timestamp: number } = {
	data: null,
	timestamp: 0
};

async function fetchFromGithub(fetch: typeof globalThis.fetch): Promise<GithubActivity | null> {
	if (!env.GITHUB_TOKEN) {
		console.warn('GithubService: GITHUB_TOKEN not set — skipping fetch');
		return null;
	}

	const query = `
		query($login: String!) {
			user(login: $login) {
				publicRepos: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) {
					totalCount
					nodes {
						primaryLanguage { name }
					}
				}
				contributionsCollection {
					totalCommitContributions
				}
			}
		}
	`;

	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } })
		});

		if (!response.ok) {
			console.error(`GithubService: fetch failed with status ${response.status}`);
			return null;
		}

		const json = (await response.json()) as {
			data?: {
				user?: {
					publicRepos?: {
						totalCount: number;
						nodes: Array<{ primaryLanguage: { name: string } | null }>;
					};
					contributionsCollection?: { totalCommitContributions: number };
				};
			};
		};

		const user = json.data?.user;
		if (!user) return null;

		const languageSet = new Set<string>();
		for (const node of user.publicRepos?.nodes ?? []) {
			const name = node.primaryLanguage?.name;
			if (name && LANGUAGE_ALLOWLIST.has(name)) {
				languageSet.add(name);
			}
		}

		return {
			commitsLastYear: user.contributionsCollection?.totalCommitContributions ?? 0,
			publicRepos: user.publicRepos?.totalCount ?? 0,
			languages: [...languageSet]
		};
	} catch (err) {
		console.error('GithubService: fetch threw:', err);
		return null;
	}
}

export namespace GithubService {
	export async function getActivity(
		fetch: typeof globalThis.fetch
	): Promise<GithubActivity | null> {
		// L1: in-memory cache
		if (memoryCache.data && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
			return memoryCache.data;
		}

		// L2: Upstash
		const redis = getRedis();
		if (redis) {
			try {
				const cached = await redis.get<GithubActivity>(CACHE_KEY);
				if (cached) {
					memoryCache.data = cached;
					memoryCache.timestamp = Date.now();
					return cached;
				}
			} catch (err) {
				console.error('GithubService: Redis read failed:', err);
			}
		}

		// Fetch from GitHub
		const fresh = await fetchFromGithub(fetch);
		if (!fresh) return null;

		// Populate both caches
		memoryCache.data = fresh;
		memoryCache.timestamp = Date.now();
		if (redis) {
			try {
				await redis.set(CACHE_KEY, fresh, { ex: CACHE_TTL_SECONDS });
			} catch (err) {
				console.error('GithubService: Redis write failed:', err);
			}
		}

		return fresh;
	}
}

export default GithubService;
