import type { RequestHandler } from './$types';
import GithubService from '$lib/server/githubService';
import {
	createApiResponse,
	createApiErrorResponse,
	withExternalApiFallback
} from '$lib/server/api-utils';
import { CACHE_CONTROL } from '$lib/server/cache-control';

export const GET: RequestHandler = async ({ fetch }) => {
	return withExternalApiFallback(async () => {
		const activity = await GithubService.getActivity(fetch);

		if (!activity) {
			return createApiErrorResponse('GitHub activity unavailable', {
				status: 503,
				statusText: 'GitHub activity unavailable'
			});
		}

		return createApiResponse(activity, {
			cacheControl: CACHE_CONTROL.DAY
		});
	}, 'GitHub activity unavailable');
};
