import type { RequestHandler } from './$types';
import GithubService from '$lib/server/githubService';
import {
	createApiResponse,
	createApiErrorResponse,
	withExternalApiFallback
} from '$lib/server/api-utils';
import { CACHE_CONTROL } from '$lib/server/cache-control';

const GITHUB_UNAVAILABLE = 'GitHub activity unavailable';

export const GET: RequestHandler = async ({ fetch }) => {
	return withExternalApiFallback(async () => {
		const activity = await GithubService.getActivity(fetch);

		if (!activity) {
			return createApiErrorResponse(GITHUB_UNAVAILABLE, {
				status: 503
			});
		}

		return createApiResponse(activity, {
			cacheControl: CACHE_CONTROL.DAY
		});
	}, GITHUB_UNAVAILABLE);
};
