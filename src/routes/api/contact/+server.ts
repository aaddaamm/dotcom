import type { RequestHandler } from './$types';
import { handleContactRequest } from '$lib/server/contact-handler';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	return handleContactRequest({ request, clientIP: getClientAddress() });
};
