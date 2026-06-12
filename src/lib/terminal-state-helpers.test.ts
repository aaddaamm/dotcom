import { describe, expect, it } from 'vitest';
import {
	commandShouldBeTracked,
	completionForInput,
	initialTerminalMode,
	severanceModeForTerminalMode,
	shouldSeedModeHistory
} from '$lib/terminal-state-helpers';

describe('terminal mode helpers', () => {
	it('maps persisted severance mode to terminal command mode', () => {
		expect(initialTerminalMode('innie')).toBe('innie');
		expect(initialTerminalMode('outie')).toBe('terminal');
	});

	it('syncs only outie and innie modes back to severance storage', () => {
		expect(severanceModeForTerminalMode('innie')).toBe('innie');
		expect(severanceModeForTerminalMode('terminal')).toBe('outie');
		expect(severanceModeForTerminalMode('rpg')).toBeNull();
	});

	it('seeds mode history only when there is no restored history', () => {
		expect(shouldSeedModeHistory([])).toBe(true);
		expect(shouldSeedModeHistory([{ id: 1, type: 'input', text: 'help' }])).toBe(false);
	});
});

describe('terminal command helpers', () => {
	it('tracks known commands and skips unknown command misses', () => {
		expect(commandShouldBeTracked('clear')).toBe(true);
		expect(commandShouldBeTracked('exit')).toBe(true);
		expect(commandShouldBeTracked('unknown', 'command not found: unknown')).toBe(false);
		expect(commandShouldBeTracked('help', 'available commands')).toBe(true);
	});

	it('applies single completions while preserving command argument spacing', () => {
		expect(completionForInput('g', ['git'])).toEqual({ kind: 'single', input: 'git ' });
		expect(completionForInput('theme d', ['dark'])).toEqual({
			kind: 'single',
			input: 'theme dark'
		});
	});

	it('returns multiple completion output without mutating input', () => {
		expect(completionForInput('g', ['git', 'goodreads'])).toEqual({
			kind: 'multiple',
			lines: ['git   goodreads']
		});
		expect(completionForInput('zzz', [])).toEqual({ kind: 'none' });
	});
});
