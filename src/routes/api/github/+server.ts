import GithubService from '$lib/server/githubService';
import { createApiResponse } from '$lib/server/api-utils';

export async function GET({ fetch }) {
	const activity = await GithubService.getActivity(fetch);

	if (!activity) {
		return createApiResponse(null, {
			status: 503,
			statusText: 'GitHub activity unavailable'
		});
	}

	return createApiResponse(activity, {
		cacheControl: 's-maxage=86400, stale-while-revalidate=3600'
	});
}
