import { describe, expect, it } from 'vitest';
import { getCompletions, normalize, runCommand } from '$lib/terminal-command-runner';

describe('terminal command runner', () => {
	it('normalizes aliases and incantations', () => {
		expect(normalize('--help')).toBe('help');
		expect(normalize('ls work')).toBe('ls /work');
		expect(normalize('ex codice lumen')).toBe('translate ex codice lumen');
	});

	it('resolves commands for the active mode', () => {
		expect(runCommand('whoami', 'terminal').lines).toContain('adam robinson');
		expect(runCommand('whoami', 'rpg').lines[0]).toContain('┌');
		expect(runCommand('macrodata', 'innie').lines).toContain('refinement queue accepted.');
	});

	it('returns control and navigation effects', () => {
		expect(runCommand('clear', 'terminal')).toEqual({ lines: [], clear: true });
		expect(runCommand('quit', 'terminal')).toEqual({ lines: [], close: true });
		expect(runCommand('open hire', 'terminal')).toMatchObject({ navigate: '/hire' });
	});

	it('translates phrases and reports unknown commands', () => {
		expect(runCommand('translate ex codice lumen', 'terminal').lines[0]).toContain(
			'from code, light'
		);
		expect(runCommand('not-a-command', 'terminal').lines).toEqual([
			'command not found: not-a-command',
			"type 'help' for available commands."
		]);
	});

	it('completes top-level commands and arguments', () => {
		expect(getCompletions('wh')).toEqual(['whoami']);
		expect(getCompletions('cat res')).toEqual(['resume.txt']);
		expect(getCompletions('mode ')).toEqual(['rpg', 'terminal']);
	});
});
