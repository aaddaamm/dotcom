import { goto } from '$app/navigation';
import { runCommand, normalize, getCompletions, type Mode } from '$lib/terminal-commands';
import { trackTerminalOpen, trackTerminalCommand, trackTerminalModeChange } from '$lib/analytics';
import { getSeveranceMode, setSeveranceMode } from '$lib/stores/severance';
import { MacrodataSession } from '$lib/terminal-macrodata';
import { TerminalMemory } from '$lib/terminal-memory';

export type HistoryEntry =
	| { id: number; type: 'input'; text: string }
	| { id: number; type: 'output'; lines: string[] };

const ARGUMENT_EXPECTING_COMMANDS = [
	'ls',
	'cat',
	'open',
	'git',
	'sudo',
	'mode',
	'echo',
	'translate'
];

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
		this.mode = getSeveranceMode() === 'innie' ? 'innie' : 'terminal';
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

		if (this.#shouldTrackCommand(lower, result.lines[0])) {
			trackTerminalCommand(key, this.mode);
		}

		this.#applyCommandResult(result);
	}

	navigateHistory(direction: 'up' | 'down') {
		const next = this.#nextHistoryIndex(direction);
		this.cmdHistoryIndex = next;
		this.input = this.#historyInputForIndex(next);
	}

	tabComplete() {
		const completions = getCompletions(this.input);
		if (completions.length === 0) return;
		if (completions.length === 1) {
			this.#applySingleCompletion(completions[0]);
			return;
		}

		this.#pushOutput([completions.join('   ')]);
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

	#applySingleCompletion(completion: string) {
		const tokens = this.input.split(' ');
		if (tokens.length === 1) {
			this.input = completion;
			if (ARGUMENT_EXPECTING_COMMANDS.includes(completion)) this.input += ' ';
			return;
		}

		tokens[tokens.length - 1] = completion;
		this.input = tokens.join(' ');
	}

	#recordInput(cmd: string) {
		this.history = [...this.history, { id: this.#nextId++, type: 'input', text: cmd }];
		this.cmdHistory = [cmd, ...this.cmdHistory.slice(0, 49)];
		this.cmdHistoryIndex = -1;
	}

	#handleInnieMacrodata(lower: string) {
		if (this.mode !== 'innie') return false;
		if (!this.#macrodata.handle(lower, this.#pushOutput.bind(this))) return false;
		trackTerminalCommand('macrodata', this.mode);
		return true;
	}

	#shouldTrackCommand(lower: string, firstLine?: string) {
		return (
			lower === 'clear' ||
			lower === 'exit' ||
			lower === 'quit' ||
			!firstLine?.startsWith('command not found')
		);
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
		this.history = [...this.history, { id: this.#nextId++, type: 'output', lines }];
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

	#nextHistoryIndex(direction: 'up' | 'down') {
		if (direction === 'up') {
			return Math.min(this.cmdHistoryIndex + 1, this.cmdHistory.length - 1);
		}
		return this.cmdHistoryIndex - 1;
	}

	#historyInputForIndex(index: number) {
		if (index < 0) return '';
		return this.cmdHistory[index] ?? '';
	}

	#syncSeveranceMode(nextMode: Mode) {
		if (nextMode === 'innie') setSeveranceMode('innie');
		if (nextMode === 'terminal') setSeveranceMode('outie');
	}

	#switchMemoryIfNeeded(previousMode: Mode, nextMode: Mode) {
		const prevKey = this.#memory.modeMemoryKey(previousMode);
		const nextKey = this.#memory.modeMemoryKey(nextMode);
		if (prevKey === nextKey) return;
		this.#saveMemory(prevKey);
		this.#loadMemory(nextKey);
		if (this.history.length > 0) return;
		if (nextKey === 'innie') {
			this.#pushOutput(['memory partition complete.', "type 'macrodata' to begin refinement."]);
			return;
		}
		if (nextKey === 'outie') {
			this.#pushOutput(['outie memory restored. no retained innie logs visible.']);
		}
	}
}
