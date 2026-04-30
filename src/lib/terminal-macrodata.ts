type MdrBucket = 'woe' | 'frolic' | 'dread' | 'malice';

type MacrodataScore = Record<MdrBucket, number>;

const INITIAL_SCORE: MacrodataScore = {
	woe: 0,
	frolic: 0,
	dread: 0,
	malice: 0
};

export class MacrodataSession {
	#active = false;
	#score: MacrodataScore = { ...INITIAL_SCORE };

	handle(lower: string, pushOutput: (lines: string[]) => void): boolean {
		if (!this.#active && lower !== 'macrodata') return false;
		if (!this.#active && lower === 'macrodata') {
			this.#active = true;
			this.#score = { ...INITIAL_SCORE };
			pushOutput([
				'MDR SESSION STARTED',
				'sort with: refine <woe|frolic|dread|malice> <1-40>',
				'complete 100 total to finish. type abort to exit.'
			]);
			return true;
		}

		if (lower === 'abort') {
			this.#active = false;
			pushOutput(['refinement session closed.']);
			return true;
		}

		const match = lower.match(/^refine\s+(woe|frolic|dread|malice)\s+(\d{1,2})$/);
		if (!match) {
			pushOutput(['invalid refinement input.', 'usage: refine <woe|frolic|dread|malice> <1-40>']);
			return true;
		}

		const bucket = match[1] as MdrBucket;
		const amount = Number(match[2]);
		if (amount < 1 || amount > 40) {
			pushOutput(['refinement amount out of range. use 1-40.']);
			return true;
		}

		this.#score[bucket] += amount;
		const total = Object.values(this.#score).reduce((sum, value) => sum + value, 0);

		if (total >= 100) {
			this.#active = false;
			pushOutput([
				`refinement complete at ${total} points.`,
				'the work remains mysterious and important.'
			]);
			return true;
		}

		pushOutput([`${bucket} +${amount} accepted.`, `progress: ${total}/100`]);
		return true;
	}
}
