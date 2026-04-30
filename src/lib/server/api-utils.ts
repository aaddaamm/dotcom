export type ApiErrorResponse = {
	error: string;
};

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

export function createApiErrorResponse(
	error: string,
	options?: {
		status?: number;
		statusText?: string;
		cacheControl?: string;
	}
) {
	return createApiResponse<ApiErrorResponse>({ error }, options);
}

export async function withExternalApiFallback(
	operation: () => Promise<Response>,
	error: string,
	statusText = error
) {
	try {
		return await operation();
	} catch {
		return createApiErrorResponse(error, {
			status: 503,
			statusText
		});
	}
}
