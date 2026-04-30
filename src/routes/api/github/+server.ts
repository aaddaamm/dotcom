import type { RequestHandler } from './$types';
import GithubService from '$lib/server/githubService';
import { createApiResponse, createApiErrorResponse } from '$lib/server/api-utils';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const activity = await GithubService.getActivity(fetch);

		if (!activity) {
			return createApiErrorResponse('GitHub activity unavailable', {
				status: 503,
				statusText: 'GitHub activity unavailable'
			});
		}

		return createApiResponse(activity, {
			cacheControl: 's-maxage=86400, stale-while-revalidate=3600'
		});
	} catch {
		return createApiErrorResponse('GitHub activity unavailable', {
			status: 503,
			statusText: 'GitHub activity unavailable'
		});
	}
};
