import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GOODREADS_SHELVES } from '$lib/constants';

async function loadGoodreadsService(redis: unknown = null) {
	vi.doMock('$lib/server/redis', () => ({
		getRedis: () => redis
	}));

	const module = await import('./goodreadsService');
	return module.default;
}

describe('GoodreadsService', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('propagates provider failure when no stale data is available', async () => {
		const service = await loadGoodreadsService();
		const fetchMock = vi.fn().mockRejectedValue(new Error('Goodreads unavailable'));

		await expect(
			service.getBooksFromShelf(
				GOODREADS_SHELVES.CURRENTLY_READING,
				fetchMock as unknown as typeof fetch
			)
		).rejects.toThrow('Goodreads unavailable');
	});

	it('returns stale shared data when the provider fails', async () => {
		const staleBooks = [
			{
				cover: '',
				title: 'Working Effectively with Legacy Code',
				author: 'Michael Feathers',
				url: 'https://www.goodreads.com/book/show/44919',
				isbn: '9780131177055',
				dateStarted: '',
				goodreadsID: 44919
			}
		];
		const redis = {
			get: vi.fn(async (key: string) => (key.startsWith('goodreads:stale:') ? staleBooks : null))
		};
		const service = await loadGoodreadsService(redis);
		const fetchMock = vi.fn().mockRejectedValue(new Error('Goodreads unavailable'));

		const result = await service.getBooksFromShelf(
			GOODREADS_SHELVES.CURRENTLY_READING,
			fetchMock as unknown as typeof fetch
		);

		expect(result).toEqual(staleBooks);
	});
});
