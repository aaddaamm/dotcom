import type { Mode } from '$lib/terminal-commands';
import type { SeveranceMode } from '$lib/stores/severance';
import type { HistoryEntry } from '$lib/terminal-types';

type CompletionResult =
	| { kind: 'none' }
	| { kind: 'single'; input: string }
	| { kind: 'multiple'; lines: string[] };

const ARGUMENT_EXPECTING_COMMANDS = new Set([
	'ls',
	'cat',
	'open',
	'git',
	'sudo',
	'mode',
	'echo',
	'translate'
]);

export function initialTerminalMode(severanceMode: SeveranceMode): Mode {
	return severanceMode === 'innie' ? 'innie' : 'terminal';
}

export function commandShouldBeTracked(lower: string, firstLine?: string): boolean {
	return (
		lower === 'clear' ||
		lower === 'exit' ||
		lower === 'quit' ||
		!firstLine?.startsWith('command not found')
	);
}

export function completionForInput(input: string, completions: string[]): CompletionResult {
	if (completions.length === 0) return { kind: 'none' };
	if (completions.length > 1) return { kind: 'multiple', lines: [completions.join('   ')] };

	const completion = completions[0];
	const tokens = input.split(' ');
	if (tokens.length === 1) {
		return {
			kind: 'single',
			input: ARGUMENT_EXPECTING_COMMANDS.has(completion) ? `${completion} ` : completion
		};
	}

	tokens[tokens.length - 1] = completion;
	return { kind: 'single', input: tokens.join(' ') };
}

export function severanceModeForTerminalMode(nextMode: Mode): SeveranceMode | null {
	if (nextMode === 'innie') return 'innie';
	if (nextMode === 'terminal') return 'outie';
	return null;
}

export function shouldSeedModeHistory(history: HistoryEntry[]): boolean {
	return history.length === 0;
}
