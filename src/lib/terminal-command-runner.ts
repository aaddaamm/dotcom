import { commands } from '$lib/terminal-core';
import {
	getArgMap,
	INCANTATIONS,
	NORMALIZED_ALIASES,
	topLevelCommands
} from '$lib/terminal-command-data';
import type { CommandResult, Mode } from '$lib/terminal-types';

const CONTROL_COMMANDS = new Set(['clear', 'exit', 'quit']);
const argMap = getArgMap();

export function normalize(lower: string): string {
	if (lower in INCANTATIONS) return `translate ${lower}`;
	return NORMALIZED_ALIASES[lower] ?? lower;
}

function resolveTranslateResult(lower: string): CommandResult | null {
	if (!lower.startsWith('translate ')) return null;

	const phrase = lower.slice('translate '.length).trim();
	const translation = INCANTATIONS[phrase];
	if (translation) return { lines: [`${phrase} → "${translation}"`] };

	return {
		lines: [`unknown incantation: ${phrase}`, 'try: translate ex codice lumen']
	};
}

function resolveModeCommand(key: string, mode: Mode): CommandResult | null {
	const def = commands[key];
	if (!def) return null;
	if (mode === 'rpg' && def.rpg) return def.rpg;
	if (mode === 'innie' && def.innie) return def.innie;
	return def.terminal;
}

function resolveControlCommand(lower: string): CommandResult | null {
	if (!CONTROL_COMMANDS.has(lower)) return null;
	if (lower === 'clear') return { lines: [], clear: true };
	return { lines: [], close: true };
}

export function runCommand(rawInput: string, mode: Mode): CommandResult {
	const input = rawInput.trim();
	const lower = input.toLowerCase();

	if (!input) return { lines: [] };

	const controlResult = resolveControlCommand(lower);
	if (controlResult) return controlResult;

	const translateResult = resolveTranslateResult(lower);
	if (translateResult) return translateResult;

	const modeResult = resolveModeCommand(normalize(lower), mode);
	if (modeResult) return modeResult;

	return {
		lines: [`command not found: ${input}`, "type 'help' for available commands."]
	};
}

export function getCompletions(input: string): string[] {
	const tokens = input.split(' ');
	if (tokens.length === 1) {
		return topLevelCommands.filter((command) => command.startsWith(tokens[0].toLowerCase()));
	}

	const command = tokens[0].toLowerCase();
	const partial = tokens.slice(1).join(' ').toLowerCase();
	return (argMap[command] ?? []).filter((arg) => arg.startsWith(partial));
}
