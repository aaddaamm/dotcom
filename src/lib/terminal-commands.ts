import { techStack } from '$lib/copy';

export type Mode = 'terminal' | 'rpg';

export type CommandResult = {
	lines: string[];
	navigate?: string;
	navigateDelay?: number;
	modeChange?: Mode;
	rpgUnlock?: boolean;
	clear?: boolean;
	close?: boolean;
};

const allStack = techStack.flatMap((g) => g.items);

export function runCommand(rawInput: string, mode: Mode): CommandResult {
	const input = rawInput.trim();
	const lower = input.toLowerCase();

	if (!input) return { lines: [] };
	if (lower === 'clear') return { lines: [], clear: true };
	if (lower === 'exit' || lower === 'quit') return { lines: [], close: true };

	if (lower === 'whoami') {
		if (mode === 'rpg') {
			return {
				lines: [
					'┌─────────────────────────────────────┐',
					'│  ADAM ROBINSON                      │',
					'│  JOB CLASS: Senior Engineer  LV 10  │',
					'│  HP: ████████████  MP: ████████░░   │',
					'│                                     │',
					'│  A wandering engineer of ten years. │',
					'│  Backend-leaning. Ships clean code. │',
					'│  Currently embedded at iCapital.    │',
					'└─────────────────────────────────────┘',
				],
			};
		}
		return {
			lines: [
				'adam robinson',
				'senior software engineer · 10+ years',
				'currently: staff aug at icapital (fintech)',
				'past: healthcasts · angi · shell',
				'',
				"type 'help' for available commands.",
			],
		};
	}

	if (lower === 'help' || lower === '-h' || lower === '--help') {
		return {
			lines: [
				'available commands:',
				'',
				'  whoami          who is this person',
				'  ls              list directories',
				'  ls /work        list projects',
				'  ls /stack       list tech stack',
				'  cat resume.txt  print resume',
				'  contact         contact information',
				'  open /hire      open the hire page',
				'  echo $STACK     print tech stack',
				'  git log         recent commit history',
				'  clear           clear the terminal',
				'  exit            close the terminal',
			],
		};
	}

	if (lower === 'ls' || lower === 'ls /') {
		return { lines: ['work/   stack/   blog/   contact'] };
	}

	if (lower === 'ls work' || lower === 'ls /work') {
		if (mode === 'rpg') {
			return {
				lines: [
					'You open the chest.',
					'Inside you find:',
					'',
					'⚔  iCapital     — Fintech dungeon, still active',
					'🏰  Healthcasts  — Legacy fortress, rebuilt from within',
					"🌋  Shell        — Oil platform at world's edge",
					'🗺  Angi         — Three kingdoms, one ranger',
				],
			};
		}
		return { lines: ['icapital/   healthcasts/   angi/   shell/'] };
	}

	if (lower === 'ls stack' || lower === 'ls /stack') {
		return { lines: ['frontend/   backend/   infrastructure/   tools/'] };
	}

	if (lower === 'cat resume.txt') {
		return {
			lines: [
				'Adam Robinson — Senior Software Engineer',
				'════════════════════════════════════════',
				'10+ years · full-stack, backend-leaning',
				'',
				'Current',
				'  iCapital · Staff Aug / Senior Engineer · 2024–present',
				'',
				'Past',
				'  Healthcasts · Team Lead · 2022–2024',
				'  Angi · Staff Aug / Senior Engineer · 2021–2022',
				'  Shell · Software Engineer · 2018–2019',
				'',
				'Stack',
				'  React · TypeScript · Node.js · Vue · Ruby on Rails',
				'  AWS · Auth0 · PostgreSQL · Redis',
				'',
				'Contact',
				'  adam@adamrobinson.tech',
				'  github.com/aaddaamm',
				'  adamrobinson.tech/hire',
			],
		};
	}

	if (lower === 'contact') {
		return {
			lines: [
				'email     adam@adamrobinson.tech',
				'github    github.com/aaddaamm',
				'linkedin  linkedin.com/in/adam-robinson-tech',
				'hire      adamrobinson.tech/hire',
			],
		};
	}

	if (lower === 'open hire' || lower === 'open /hire') {
		return { lines: ['opening /hire...'], navigate: '/hire', navigateDelay: 600 };
	}

	if (lower === 'echo $stack') {
		return { lines: [allStack.join(', ')] };
	}

	if (lower === 'sudo hire adam') {
		if (mode === 'rpg') {
			return {
				lines: [
					'❯ HIRE ADAM?',
					'  ▶ YES',
					'    NO',
					'',
					'...',
					'',
					'✨ Adam has joined the party!',
					'redirecting to /contact...',
				],
				navigate: '/contact',
				navigateDelay: 2000,
			};
		}
		return {
			lines: [
				'[sudo] password for hiring_manager: ········',
				'checking credentials...',
				'permission granted.',
				'redirecting to /contact...',
			],
			navigate: '/contact',
			navigateDelay: 1500,
		};
	}

	if (lower === 'git log') {
		if (mode === 'rpg') {
			return {
				lines: [
					'a3f9c12  fix: slew the null pointer demon (again)',
					'b812dd0  feat: forged the OAuth amulet',
					'cc4491e  refactor: untangled the spaghetti dungeon',
					'd009fe1  chore: resupplied at the npm inn',
					'e774a30  docs: transcribed the ancient CLAUDE.md scrolls',
				],
			};
		}
		return {
			lines: [
				'a3f9c12  fix: stop auth tokens escaping into the void',
				'b812dd0  feat: forge the OAuth integration at last',
				'cc4491e  refactor: untangle the spaghetti dungeon (again)',
				'd009fe1  chore: resupply at the npm registry',
				'e774a30  feat: survive the aws crash course',
				'f1b2c33  fix: the legacy php stronghold holds one more day',
				'g7h8i99  docs: write the readme nobody asked for',
			],
		};
	}

	if (lower === 'rm -rf .' || lower === 'rm -rf /' || lower === 'rm -rf ~') {
		if (mode === 'rpg') {
			return {
				lines: [
					'⚠ DANGER',
					'this action would destroy the known world.',
					'the spirits of /bin refuse your request.',
				],
			};
		}
		return { lines: ['nice try.'] };
	}

	if (lower === 'vim' || lower === 'vi' || lower === 'nano' || lower === 'emacs') {
		if (mode === 'rpg') {
			return {
				lines: [
					'a cursed editor. many have entered.',
					'few have exited.',
					'[ press :q to escape... if you can. ]',
				],
			};
		}
		return { lines: ["you're already in a terminal. don't push it."] };
	}

	if (lower === 'mode rpg') {
		return {
			lines: ['RPG mode enabled.', 'the spirits of the console stir...'],
			modeChange: 'rpg',
		};
	}

	if (lower === 'mode terminal') {
		return { lines: ['RPG mode disabled. back to reality.'], modeChange: 'terminal' };
	}

	if (lower === 'chocobo') {
		return {
			lines: ['kweh!', '', 'a golden chocobo has appeared.', "RPG mode unlocked. type 'mode rpg' to activate."],
			rpgUnlock: true,
		};
	}

	if (lower === 'zelda' || lower === 'hyrule') {
		return {
			lines: ["it's dangerous to code alone. take this.", '', '  ⚔', ''],
			rpgUnlock: true,
		};
	}

	return {
		lines: [`command not found: ${input}`, "type 'help' for available commands."],
	};
}

const argMap: Record<string, string[]> = {
	ls: ['work', '/work', 'stack', '/stack'],
	cat: ['resume.txt', 'work/icapital', 'work/healthcasts', 'work/angi', 'work/shell'],
	open: ['hire', '/hire'],
	git: ['log'],
	mode: ['rpg', 'terminal'],
	sudo: ['hire adam'],
};

const topLevelCommands = [
	'whoami', 'help', '-h', 'ls', 'cat', 'contact', 'open', 'echo',
	'git', 'sudo', 'clear', 'exit', 'quit', 'rm', 'vim', 'vi',
	'nano', 'emacs', 'mode', 'chocobo',
];

export function getCompletions(input: string): string[] {
	const tokens = input.split(' ');

	if (tokens.length === 1) {
		const partial = tokens[0].toLowerCase();
		return topLevelCommands.filter((c) => c.startsWith(partial));
	}

	const cmd = tokens[0].toLowerCase();
	const partial = tokens.slice(1).join(' ').toLowerCase();
	const args = argMap[cmd] ?? [];
	return args.filter((a) => a.startsWith(partial));
}
