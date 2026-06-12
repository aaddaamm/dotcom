import { goto } from '$app/navigation';
import { runCommand, normalize, getCompletions, type Mode } from '$lib/terminal-commands';
import {
	historyInputAt,
	initialModeLines,
	inputEntry,
	nextHistoryIndex,
	outputEntry
} from '$lib/terminal-history';
import type { HistoryEntry } from '$lib/terminal-types';
import { trackTerminalOpen, trackTerminalCommand, trackTerminalModeChange } from '$lib/analytics';
import { getSeveranceMode, setSeveranceMode } from '$lib/stores/severance';
import { MacrodataSession } from '$lib/terminal-macrodata';
import { TerminalMemory } from '$lib/terminal-memory';
import {
	commandShouldBeTracked,
	completionForInput,
	initialTerminalMode,
	severanceModeForTerminalMode,
	shouldSeedModeHistory
} from '$lib/terminal-state-helpers';

export class TerminalState {
	isOpen = $state(false);
	input = $state('');
	history = $state<HistoryEntry[]>([]);
	cmdHistory = $state<string[]>([]);
	cmdHistoryIndex = $state(-1);
	mode = $state<Mode>('terminal');
	#nextId = 0;
	#fullscreen: () => boolean;
	#navigate: (path: string) => Promise<void>;
	#macrodata = new MacrodataSession();
	#memory = new TerminalMemory<HistoryEntry>();

	constructor(
		fullscreen: boolean | (() => boolean) = false,
		navigate: (path: string) => Promise<void> = goto
	) {
		this.#fullscreen = typeof fullscreen === 'function' ? fullscreen : () => fullscreen;
		this.#navigate = navigate;
		this.mode = initialTerminalMode(getSeveranceMode());
		this.#loadMemory(this.#memory.modeMemoryKey(this.mode));
	}

	open(source: 'keyboard' | 'button' | 'page' = 'keyboard', initialChar = '') {
		this.isOpen = true;
		this.input = initialChar;
		trackTerminalOpen(source);
	}

	isInnieMode() {
		return this.mode === 'innie';
	}

	isRpgMode() {
		return this.mode === 'rpg';
	}

	close() {
		if (this.#fullscreen()) return;
		this.isOpen = false;
		this.input = '';
	}

	submit() {
		const cmd = this.input.trim();
		this.input = '';
		if (!cmd) return;

		this.#recordInput(cmd);
		const lower = cmd.toLowerCase();

		if (this.#handleInnieMacrodata(lower)) return;

		const key = normalize(lower);
		const result = runCommand(cmd, this.mode);

		if (commandShouldBeTracked(lower, result.lines[0])) {
			trackTerminalCommand(key, this.mode);
		}

		this.#applyCommandResult(result);
	}

	navigateHistory(direction: 'up' | 'down') {
		const next = nextHistoryIndex(this.cmdHistoryIndex, this.cmdHistory.length, direction);
		this.cmdHistoryIndex = next;
		this.input = historyInputAt(this.cmdHistory, next);
	}

	tabComplete() {
		const result = completionForInput(this.input, getCompletions(this.input));
		if (result.kind === 'none') return;
		if (result.kind === 'multiple') {
			this.#pushOutput(result.lines);
			return;
		}
		this.input = result.input;
	}

	#applyCommandResult(result: ReturnType<typeof runCommand>) {
		if (result.clear) {
			this.history = [];
			return;
		}

		if (result.close) {
			this.close();
			return;
		}

		if (result.lines.length > 0) this.#pushOutput(result.lines);
		if (result.modeChange) this.#applyModeChange(result.modeChange);
		if (result.navigate)
			this.#navigateWithOptionalClose(result.navigate, result.navigateDelay ?? 0);
	}

	#recordInput(cmd: string) {
		this.history = [...this.history, inputEntry(this.#nextId++, cmd)];
		this.cmdHistory = [cmd, ...this.cmdHistory.slice(0, 49)];
		this.cmdHistoryIndex = -1;
	}

	#handleInnieMacrodata(lower: string) {
		if (this.mode !== 'innie') return false;
		if (!this.#macrodata.handle(lower, this.#pushOutput.bind(this))) return false;
		trackTerminalCommand('macrodata', this.mode);
		return true;
	}

	#applyModeChange(nextMode: Mode) {
		const previousMode = this.mode;
		trackTerminalModeChange(nextMode);
		this.mode = nextMode;
		this.#syncSeveranceMode(nextMode);
		this.#switchMemoryIfNeeded(previousMode, nextMode);
	}

	#navigateWithOptionalClose(dest: string, delay: number) {
		setTimeout(() => {
			this.#navigate(dest);
			if (!this.#fullscreen()) this.close();
		}, delay);
	}

	#pushOutput(lines: string[]) {
		this.history = [...this.history, outputEntry(this.#nextId++, lines)];
	}

	#saveMemory(key: 'outie' | 'innie') {
		this.#memory.save(key, this.history, this.cmdHistory);
	}

	#loadMemory(key: 'outie' | 'innie') {
		const snapshot = this.#memory.load(key);
		this.history = snapshot.history;
		this.cmdHistory = snapshot.cmdHistory;
		this.cmdHistoryIndex = -1;
	}

	#syncSeveranceMode(nextMode: Mode) {
		const severanceMode = severanceModeForTerminalMode(nextMode);
		if (severanceMode) setSeveranceMode(severanceMode);
	}

	#switchMemoryIfNeeded(previousMode: Mode, nextMode: Mode) {
		const prevKey = this.#memory.modeMemoryKey(previousMode);
		const nextKey = this.#memory.modeMemoryKey(nextMode);
		if (prevKey === nextKey) return;
		this.#saveMemory(prevKey);
		this.#loadMemory(nextKey);
		if (!shouldSeedModeHistory(this.history)) return;
		this.#pushOutput(initialModeLines(nextKey));
	}
}
