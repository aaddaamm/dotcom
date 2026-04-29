import { goto } from "$app/navigation";
import {
	runCommand,
	normalize,
	getCompletions,
	type Mode,
} from "$lib/terminal-commands";
import {
	trackTerminalOpen,
	trackTerminalCommand,
	trackTerminalModeChange,
} from "$lib/analytics";
import {
	getSeveranceMode,
	setSeveranceMode,
} from "$lib/stores/severance.svelte";

export type HistoryEntry =
	| { id: number; type: "input"; text: string }
	| { id: number; type: "output"; lines: string[] };

export class TerminalState {
	isOpen = $state(false);
	input = $state("");
	history = $state<HistoryEntry[]>([]);
	cmdHistory = $state<string[]>([]);
	cmdHistoryIndex = $state(-1);
	mode = $state<Mode>("terminal");
	#nextId = 0;
	#fullscreen: () => boolean;
	#navigate: (path: string) => Promise<void>;
	#mdrActive = false;
	#mdrScore = { woe: 0, frolic: 0, dread: 0, malice: 0 };

	constructor(
		fullscreen: boolean | (() => boolean) = false,
		navigate: (path: string) => Promise<void> = goto,
	) {
		this.#fullscreen =
			typeof fullscreen === "function" ? fullscreen : () => fullscreen;
		this.#navigate = navigate;
		this.mode = getSeveranceMode() === "innie" ? "innie" : "terminal";
	}

	open(source: "keyboard" | "button" | "page" = "keyboard", initialChar = "") {
		this.isOpen = true;
		this.input = initialChar;
		trackTerminalOpen(source);
	}

	isInnieMode() {
		return this.mode === "innie";
	}

	isRpgMode() {
		return this.mode === "rpg";
	}

	close() {
		if (this.#fullscreen()) return;
		this.isOpen = false;
		this.input = "";
	}

	submit() {
		const cmd = this.input.trim();
		this.input = "";
		if (!cmd) return;

		this.history = [
			...this.history,
			{ id: this.#nextId++, type: "input", text: cmd },
		];
		this.cmdHistory = [cmd, ...this.cmdHistory.slice(0, 49)];
		this.cmdHistoryIndex = -1;

		const lower = cmd.toLowerCase();

		if (this.mode === "innie" && this.#handleMacrodataFlow(lower)) {
			trackTerminalCommand("macrodata", this.mode);
			return;
		}

		const key = normalize(lower);
		const result = runCommand(cmd, this.mode);

		// Track recognized commands only — avoid logging free-text typos
		if (
			lower === "clear" ||
			lower === "exit" ||
			lower === "quit" ||
			!result.lines[0]?.startsWith("command not found")
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
			this.history = [
				...this.history,
				{ id: this.#nextId++, type: "output", lines: result.lines },
			];
		}

		if (result.modeChange) {
			trackTerminalModeChange(result.modeChange);
			this.mode = result.modeChange;
			if (result.modeChange === "innie") setSeveranceMode("innie");
			if (result.modeChange === "terminal") setSeveranceMode("outie");
		}

		if (result.navigate) {
			const dest = result.navigate;
			setTimeout(() => {
				this.#navigate(dest);
				if (!this.#fullscreen()) this.close();
			}, result.navigateDelay ?? 0);
		}
	}

	navigateHistory(direction: "up" | "down") {
		if (direction === "up") {
			const next = Math.min(
				this.cmdHistoryIndex + 1,
				this.cmdHistory.length - 1,
			);
			this.cmdHistoryIndex = next;
			if (this.cmdHistory[next] !== undefined)
				this.input = this.cmdHistory[next];
		} else {
			const next = this.cmdHistoryIndex - 1;
			this.cmdHistoryIndex = next;
			this.input = next < 0 ? "" : (this.cmdHistory[next] ?? "");
		}
	}

	tabComplete() {
		const completions = getCompletions(this.input);
		if (completions.length === 0) return;
		if (completions.length === 1) {
			const tokens = this.input.split(" ");
			const argCommands = [
				"ls",
				"cat",
				"open",
				"git",
				"sudo",
				"mode",
				"echo",
				"translate",
			];
			if (tokens.length === 1) {
				this.input = completions[0];
				if (argCommands.includes(completions[0])) this.input += " ";
			} else {
				tokens[tokens.length - 1] = completions[0];
				this.input = tokens.join(" ");
			}
		} else {
			this.history = [
				...this.history,
				{
					id: this.#nextId++,
					type: "output",
					lines: [completions.join("   ")],
				},
			];
		}
	}

	#pushOutput(lines: string[]) {
		this.history = [
			...this.history,
			{ id: this.#nextId++, type: "output", lines },
		];
	}

	#handleMacrodataFlow(lower: string): boolean {
		if (!this.#mdrActive && lower !== "macrodata") return false;
		if (!this.#mdrActive && lower === "macrodata") {
			this.#mdrActive = true;
			this.#mdrScore = { woe: 0, frolic: 0, dread: 0, malice: 0 };
			this.#pushOutput([
				"MDR SESSION STARTED",
				"sort with: refine <woe|frolic|dread|malice> <1-40>",
				"complete 100 total to finish. type abort to exit.",
			]);
			return true;
		}

		if (lower === "abort") {
			this.#mdrActive = false;
			this.#pushOutput(["refinement session closed."]);
			return true;
		}

		const match = lower.match(
			/^refine\s+(woe|frolic|dread|malice)\s+(\d{1,2})$/,
		);
		if (!match) {
			this.#pushOutput([
				"invalid refinement input.",
				"usage: refine <woe|frolic|dread|malice> <1-40>",
			]);
			return true;
		}

		type MdrBucket = "woe" | "frolic" | "dread" | "malice";
		const bucket = match[1] as MdrBucket;
		const amount = Number(match[2]);
		if (amount < 1 || amount > 40) {
			this.#pushOutput(["refinement amount out of range. use 1-40."]);
			return true;
		}

		this.#mdrScore[bucket] += amount;
		const total = Object.values(this.#mdrScore).reduce(
			(sum, value) => sum + value,
			0,
		);

		if (total >= 100) {
			this.#mdrActive = false;
			this.#pushOutput([
				`refinement complete at ${total} points.`,
				"the work remains mysterious and important.",
			]);
			return true;
		}

		this.#pushOutput([
			`${bucket} +${amount} accepted.`,
			`progress: ${total}/100`,
		]);
		return true;
	}
}
