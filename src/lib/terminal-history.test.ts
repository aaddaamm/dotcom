import { describe, expect, it } from 'vitest';
import {
	historyInputAt,
	initialModeLines,
	inputEntry,
	nextHistoryIndex,
	outputEntry
} from '$lib/terminal-history';

describe('terminal history helpers', () => {
	it('creates input and output history entries', () => {
		expect(inputEntry(1, 'help')).toEqual({ id: 1, type: 'input', text: 'help' });
		expect(outputEntry(2, ['one', 'two'])).toEqual({
			id: 2,
			type: 'output',
			lines: ['one', 'two']
		});
	});

	it('walks command history without overflowing the bounds', () => {
		expect(nextHistoryIndex(-1, 3, 'up')).toBe(0);
		expect(nextHistoryIndex(0, 3, 'up')).toBe(1);
		expect(nextHistoryIndex(2, 3, 'up')).toBe(2);
		expect(nextHistoryIndex(0, 3, 'down')).toBe(-1);
	});

	it('returns a blank input when navigating below the newest command', () => {
		expect(historyInputAt(['second', 'first'], -1)).toBe('');
		expect(historyInputAt(['second', 'first'], 0)).toBe('second');
		expect(historyInputAt(['second', 'first'], 4)).toBe('');
	});

	it('keeps outie and innie memory greetings distinct', () => {
		expect(initialModeLines('outie')).toEqual([
			'outie memory restored. no retained innie logs visible.'
		]);
		expect(initialModeLines('innie')).toEqual([
			'memory partition complete.',
			"type 'macrodata' to begin refinement."
		]);
	});
});
