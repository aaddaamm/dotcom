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

export function createErrorResponse(
	message: string,
	status: number = 500
) {
	return createApiResponse(
		{ error: message },
		{ status, statusText: getStatusText(status) }
	);
}

function getStatusText(status: number): string {
	const statusTexts: Record<number, string> = {
		400: 'Bad Request',
		401: 'Unauthorized',
		403: 'Forbidden',
		404: 'Not Found',
		500: 'Internal Server Error'
	};
	
	return statusTexts[status] || 'Error';
}