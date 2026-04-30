import type { Mode } from '$lib/terminal-commands';

type MemoryKey = 'outie' | 'innie';

type MemorySnapshot<TEntry> = {
	history: TEntry[];
	cmdHistory: string[];
};

export class TerminalMemory<TEntry> {
	#memory: Record<MemoryKey, MemorySnapshot<TEntry>> = {
		outie: { history: [], cmdHistory: [] },
		innie: { history: [], cmdHistory: [] }
	};

	modeMemoryKey(mode: Mode): MemoryKey {
		return mode === 'innie' ? 'innie' : 'outie';
	}

	save(key: MemoryKey, history: TEntry[], cmdHistory: string[]) {
		this.#memory[key] = {
			history: [...history],
			cmdHistory: [...cmdHistory]
		};
	}

	load(key: MemoryKey): MemorySnapshot<TEntry> {
		return {
			history: [...this.#memory[key].history],
			cmdHistory: [...this.#memory[key].cmdHistory]
		};
	}
}
