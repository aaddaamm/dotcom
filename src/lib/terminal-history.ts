import type { HistoryEntry } from '$lib/terminal-types';

export type TerminalMemoryKey = 'outie' | 'innie';

export function inputEntry(id: number, text: string): HistoryEntry {
	return { id, type: 'input', text };
}

export function outputEntry(id: number, lines: string[]): HistoryEntry {
	return { id, type: 'output', lines };
}

export function nextHistoryIndex(
	currentIndex: number,
	historyLength: number,
	direction: 'up' | 'down'
): number {
	if (direction === 'up') return Math.min(currentIndex + 1, historyLength - 1);
	return currentIndex - 1;
}

export function historyInputAt(commands: string[], index: number): string {
	if (index < 0) return '';
	return commands[index] ?? '';
}

export function initialModeLines(key: TerminalMemoryKey): string[] {
	if (key === 'innie') {
		return ['memory partition complete.', "type 'macrodata' to begin refinement."];
	}

	return ['outie memory restored. no retained innie logs visible.'];
}
