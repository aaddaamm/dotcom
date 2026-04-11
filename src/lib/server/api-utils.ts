export function createApiResponse<T>(
	data: T,
	options?: {
		status?: number;
		statusText?: string;
		cacheControl?: string;
	}
) {
	const { status = 200, statusText = 'OK', cacheControl } = options || {};

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (cacheControl) {
		headers['Cache-Control'] = cacheControl;
	}

	return new Response(JSON.stringify(data), {
		status,
		statusText,
		headers
	});
}

