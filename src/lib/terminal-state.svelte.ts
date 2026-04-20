import { goto } from '$app/navigation';
import { runCommand, normalize, getCompletions, type Mode } from '$lib/terminal-commands';
import { trackTerminalOpen, trackTerminalCommand, trackTerminalModeChange } from '$lib/analytics';

export type HistoryEntry =
	| { id: number; type: 'input'; text: string }
	| { id: number; type: 'output'; lines: string[] };

export class TerminalState {
	isOpen = $state(false);
	input = $state('');
	history = $state<HistoryEntry[]>([]);
	cmdHistory = $state<string[]>([]);
	cmdHistoryIndex = $state(-1);
	mode = $state<Mode>('terminal');
	rpgUnlocked = $state(false);
	#nextId = 0;
	#fullscreen: boolean;
	#navigate: (path: string) => Promise<void>;

	constructor(fullscreen = false, navigate: (path: string) => Promise<void> = goto) {
		this.#fullscreen = fullscreen;
		this.#navigate = navigate;
	}

	open(source: 'keyboard' | 'button' | 'page' = 'keyboard', initialChar = '') {
		this.isOpen = true;
		this.input = initialChar;
		trackTerminalOpen(source);
	}

	close() {
		if (this.#fullscreen) return;
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
		const key = normalize(lower);
		const result = runCommand(cmd, this.mode);

		// Track recognized commands only — avoid logging free-text typos
		if (lower === 'clear' || lower === 'exit' || lower === 'quit' || !result.lines[0]?.startsWith('command not found')) {
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

		if (result.rpgUnlock) this.rpgUnlocked = true;
		if (result.modeChange) {
			trackTerminalModeChange(result.modeChange);
			this.mode = result.modeChange;
		}

		if (result.navigate) {
			const dest = result.navigate;
			setTimeout(() => {
				this.#navigate(dest);
				if (!this.#fullscreen) this.close();
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
			const argCommands = ['ls', 'cat', 'open', 'git', 'sudo', 'mode', 'echo'];
			if (tokens.length === 1) {
				this.input = completions[0];
				if (argCommands.includes(completions[0])) this.input += ' ';
			} else {
				tokens[tokens.length - 1] = completions[0];
				this.input = tokens.join(' ');
			}
		} else {
			this.history = [
				...this.history,
				{ id: this.#nextId++, type: 'output', lines: [completions.join('   ')] }
			];
		}
	}
}
