import type { PageServerLoad } from './$types';
import { getAnonymizedCaseStudies } from '$lib/server/caseStudies';

export const load: PageServerLoad = async () => {
	return {
		anonymizedCaseStudies: getAnonymizedCaseStudies()
	};
};
