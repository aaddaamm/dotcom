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

		this.history = [...this.history, { id: this.#nextId++, type: 'input', text: cmd }];
		this.cmdHistory = [cmd, ...this.cmdHistory.slice(0, 49)];
		this.cmdHistoryIndex = -1;

		const lower = cmd.toLowerCase();

		if (this.mode === 'innie' && this.#macrodata.handle(lower, this.#pushOutput.bind(this))) {
			trackTerminalCommand('macrodata', this.mode);
			return;
		}

		const key = normalize(lower);
		const result = runCommand(cmd, this.mode);

		// Track recognized commands only — avoid logging free-text typos
		if (
			lower === 'clear' ||
			lower === 'exit' ||
			lower === 'quit' ||
			!result.lines[0]?.startsWith('command not found')
		) {
			trackTerminalCommand(key, this.mode);
		}

		if (result.clear) {
			this.history = [];
			return;
		}

		if (result.close) {
			this.close();
			return;
		}

		if (result.lines.length > 0) {
			this.history = [...this.history, { id: this.#nextId++, type: 'output', lines: result.lines }];
		}

		if (result.modeChange) {
			const previousMode = this.mode;
			trackTerminalModeChange(result.modeChange);
			this.mode = result.modeChange;
			if (result.modeChange === 'innie') setSeveranceMode('innie');
			if (result.modeChange === 'terminal') setSeveranceMode('outie');
			this.#switchMemoryIfNeeded(previousMode, result.modeChange);
		}

		if (result.navigate) {
			const dest = result.navigate;
			setTimeout(() => {
				this.#navigate(dest);
				if (!this.#fullscreen()) this.close();
			}, result.navigateDelay ?? 0);
		}
	}

	navigateHistory(direction: 'up' | 'down') {
		if (direction === 'up') {
			const next = Math.min(this.cmdHistoryIndex + 1, this.cmdHistory.length - 1);
			this.cmdHistoryIndex = next;
			if (this.cmdHistory[next] !== undefined) this.input = this.cmdHistory[next];
		} else {
			const next = this.cmdHistoryIndex - 1;
			this.cmdHistoryIndex = next;
			this.input = next < 0 ? '' : (this.cmdHistory[next] ?? '');
		}
	}

	tabComplete() {
		const completions = getCompletions(this.input);
		if (completions.length === 0) return;
		if (completions.length === 1) {
			const tokens = this.input.split(' ');
			if (tokens.length === 1) {
				this.input = completions[0];
				if (ARGUMENT_EXPECTING_COMMANDS.includes(completions[0])) this.input += ' ';
			} else {
				tokens[tokens.length - 1] = completions[0];
				this.input = tokens.join(' ');
			}
		} else {
			this.history = [
				...this.history,
				{
					id: this.#nextId++,
					type: 'output',
					lines: [completions.join('   ')]
				}
			];
		}
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

	#switchMemoryIfNeeded(previousMode: Mode, nextMode: Mode) {
		const prevKey = this.#memory.modeMemoryKey(previousMode);
		const nextKey = this.#memory.modeMemoryKey(nextMode);
		if (prevKey === nextKey) return;
		this.#saveMemory(prevKey);
		this.#loadMemory(nextKey);
		if (nextKey === 'innie' && this.history.length === 0) {
			this.#pushOutput(['memory partition complete.', "type 'macrodata' to begin refinement."]);
		}
		if (nextKey === 'outie' && this.history.length === 0) {
			this.#pushOutput(['outie memory restored. no retained innie logs visible.']);
		}
	}
}
