import { techStack } from '$lib/copy';
import { EMAIL, GITHUB_USERNAME, LINKEDIN_HANDLE } from '$lib/constants';

export type Mode = 'terminal' | 'rpg' | 'innie';

export type CommandResult = {
	lines: string[];
	navigate?: string;
	navigateDelay?: number;
	modeChange?: Mode;
	rpgUnlock?: boolean;
	clear?: boolean;
	close?: boolean;
};

type CommandDef = {
	terminal: CommandResult;
	rpg?: CommandResult;
	innie?: CommandResult;
};

const allStack = techStack.flatMap((g) => g.items);

const INCANTATIONS: Record<string, string> = {
	'ex codice lumen': 'from code, light'
};

const NORMALIZED_ALIASES: Record<string, string> = {
	'-h': 'help',
	'--help': 'help',
	'ls /': 'ls',
	'ls work': 'ls /work',
	'ls stack': 'ls /stack',
	'open hire': 'open /hire',
	quit: 'exit',
	'rm -rf /': 'rm -rf .',
	'rm -rf ~': 'rm -rf .',
	vi: 'vim',
	nano: 'vim',
	emacs: 'vim',
	hyrule: 'zelda',
	'outie mode': 'outie',
	'rpg mode': 'mode rpg'
};

const OUTIE_MODE_RESULT: CommandResult = {
	lines: ['you are now in outie mode. welcome back.'],
	modeChange: 'terminal'
};

const RPG_MODE_LINES = [
	'',
	'  *  .  *  .  *  .  *  .  *  .  *',
	'',
	'  __     /\\  /\\  /\\     __',
	' /o \\~  /  \\/  \\/  \\  ~/o \\',
	'/____\\ |____________| /____\\',
	'  ||                    ||',
	'',
	'    ____  ____   ____ ',
	'   |  _ \\|  _ \\ / ___|',
	'   | |_) | |_) || |  _',
	'   |  _ <|  __/ | |_| |',
	'   |_| \\_\\|_|   \\____|',
	'',
	'            M O D E',
	'',
	'  *  .  *  .  *  .  *  .  *  .  *',
	'',
	'  the spirits of the console stir...'
];

export function normalize(lower: string): string {
	if (lower in INCANTATIONS) return `translate ${lower}`;
	return NORMALIZED_ALIASES[lower] ?? lower;
}

const commands: Record<string, CommandDef> = {
	whoami: {
		terminal: {
			lines: [
				'adam robinson',
				'lead software engineer · 10+ years',
				'currently: staff aug at icapital (fintech)',
				'past: healthcasts · angi · shell',
				'',
				"type 'help' for available commands."
			]
		},
		rpg: {
			lines: [
				'┌─────────────────────────────────────┐',
				'│  ADAM ROBINSON                      │',
				'│  JOB CLASS: Lead Engineer    LV 10  │',
				'│  HP: ████████████  MP: ████████░░   │',
				'│                                     │',
				'│  A wandering engineer of ten years. │',
				'│  Backend-leaning. Ships clean code. │',
				'│  Currently embedded at iCapital.    │',
				'└─────────────────────────────────────┘'
			]
		}
	},

	help: {
		terminal: {
			lines: [
				'available commands:',
				'',
				'  whoami          who is this person',
				'  innie           enter severance mode',
				'  outie           return to normal mode',
				'  ls              list directories',
				'  ls /work        list projects',
				'  ls /stack       list tech stack',
				'  cat resume.txt  print resume',
				'  contact         contact information',
				'  open /hire      open the hire page',
				'  echo $STACK     print tech stack',
				'  git log         recent commit history',
				'  ritual          reveal arcane easter eggs',
				'  summon          list summonable endpoints',
				'  severed         open the severed floor',
				'  translate <incantation>  decode an incantation',
				'  clear           clear the terminal',
				'  exit            close the terminal'
			]
		},
		rpg: {
			lines: [
				"⚔  ADVENTURER'S HANDBOOK",
				'',
				'  whoami          inspect your character',
				'  ls /work        open the treasure chest',
				'  ls /stack       survey your arsenal',
				'  cat resume.txt  read the ancient scroll',
				'  git log         consult the quest log',
				'  sudo hire adam  recruit the wandering engineer',
				'  contact         send a raven',
				'  mode terminal   return to the real world',
				'  clear           banish all text',
				'  exit            close the portal'
			]
		}
	},

	innie: {
		terminal: {
			lines: [
				'▣ LUMON TERMINAL ONLINE',
				'the work is mysterious and important.',
				'you are now in innie mode.'
			],
			modeChange: 'innie'
		}
	},

	outie: {
		terminal: OUTIE_MODE_RESULT,
		rpg: OUTIE_MODE_RESULT,
		innie: OUTIE_MODE_RESULT
	},

	macrodata: {
		terminal: {
			lines: ['refining tempers: 98%', 'numbers sorted. feelings unresolved.']
		},
		innie: {
			lines: ['refinement queue accepted.', 'the numbers are scary, as expected.']
		}
	},

	waffleparty: {
		terminal: {
			lines: ['request denied by management. please enjoy a melon bar instead.']
		},
		innie: {
			lines: ['special perk unlocked: one sanctioned waffle party.']
		}
	},

	ls: {
		terminal: { lines: ['work/   stack/   blog/   contact'] }
	},

	'ls /work': {
		terminal: { lines: ['icapital/   healthcasts/   angi/   shell/'] },
		rpg: {
			lines: [
				'You open the chest.',
				'Inside you find:',
				'',
				'⚔  iCapital     — Fintech dungeon, still active',
				'🏰  Healthcasts  — Legacy fortress, rebuilt from within',
				"🌋  Shell        — Oil platform at world's edge",
				'🗺  Angi         — Three kingdoms, one ranger'
			]
		}
	},

	'ls /stack': {
		terminal: {
			lines: ['frontend/   backend/   infrastructure/   tools/   ai/']
		}
	},

	'cat resume.txt': {
		terminal: {
			lines: [
				'Adam Robinson — Lead Software Engineer',
				'════════════════════════════════════════',
				'10+ years · full-stack, backend-leaning',
				'',
				'Current',
				'  iCapital · Staff Aug / Lead Engineer · 2024–present',
				'',
				'Past',
				'  Healthcasts · Team Lead · 2022–2024',
				'  Angi · Staff Aug / Senior Engineer · 2021–2022',
				'  Shell · Software Engineer · 2018–2019',
				'',
				'Stack',
				'  React · TypeScript · Node.js · Elixir · Ruby on Rails',
				'  AWS · Auth0 · PostgreSQL · Redis',
				'',
				'Contact',
				`  ${EMAIL}`,
				`  github.com/${GITHUB_USERNAME}`,
				'  adamrobinson.tech/hire'
			]
		}
	},

	contact: {
		terminal: {
			lines: [
				`email     ${EMAIL}`,
				`github    github.com/${GITHUB_USERNAME}`,
				`linkedin  linkedin.com/in/${LINKEDIN_HANDLE}`,
				'hire      adamrobinson.tech/hire'
			]
		}
	},

	'open /hire': {
		terminal: {
			lines: ['opening /hire...'],
			navigate: '/hire',
			navigateDelay: 600
		}
	},

	'echo $stack': {
		terminal: { lines: [allStack.join(', ')] }
	},

	'sudo hire adam': {
		terminal: {
			lines: [
				'[sudo] password for hiring_manager: ········',
				'checking credentials...',
				'permission granted.',
				'redirecting to /contact...'
			],
			navigate: '/contact',
			navigateDelay: 1500
		},
		rpg: {
			lines: [
				'❯ HIRE ADAM?',
				'  ▶ YES',
				'    NO',
				'',
				'...',
				'',
				'✨ Adam has joined the party!',
				'redirecting to /contact...'
			],
			navigate: '/contact',
			navigateDelay: 2000
		}
	},

	'git log': {
		terminal: {
			lines: [
				'a3f9c12  fix: stop auth tokens escaping into the void',
				'b812dd0  feat: forge the OAuth integration at last',
				'cc4491e  refactor: untangle the spaghetti dungeon (again)',
				'd009fe1  chore: resupply at the npm registry',
				'e774a30  feat: survive the aws crash course',
				'f1b2c33  fix: the legacy php stronghold holds one more day',
				'g7h8i99  docs: write the readme nobody asked for'
			]
		},
		rpg: {
			lines: [
				'a3f9c12  fix: slew the null pointer demon (again)',
				'b812dd0  feat: forged the OAuth amulet',
				'cc4491e  refactor: untangled the spaghetti dungeon',
				'd009fe1  chore: resupplied at the npm inn',
				'e774a30  docs: transcribed the ancient CLAUDE.md scrolls'
			]
		}
	},

	'rm -rf .': {
		terminal: { lines: ['nice try.'] },
		rpg: {
			lines: [
				'⚠ DANGER',
				'this action would destroy the known world.',
				'the spirits of /bin refuse your request.'
			]
		}
	},

	vim: {
		terminal: { lines: ["you're already in a terminal. don't push it."] },
		rpg: {
			lines: [
				'a cursed editor. many have entered.',
				'few have exited.',
				'[ press :q to escape... if you can. ]'
			]
		}
	},

	'mode rpg': {
		terminal: {
			lines: RPG_MODE_LINES,
			modeChange: 'rpg'
		}
	},

	'mode terminal': {
		terminal: {
			lines: ['RPG mode disabled. back to reality.'],
			modeChange: 'terminal'
		}
	},

	chocobo: {
		terminal: {
			lines: [
				'kweh!',
				'',
				'a golden chocobo has appeared.',
				"RPG mode unlocked. type 'mode rpg' to activate."
			],
			rpgUnlock: true
		}
	},

	zelda: {
		terminal: {
			lines: ["it's dangerous to code alone. take this.", '', '  ⚔', ''],
			rpgUnlock: true
		}
	},

	ritual: {
		terminal: {
			lines: [
				'✶ THE HIDDEN RUNES ✶',
				'konami whisper: ↑ ↑ ↓ ↓ ← → ← → B A',
				'secret phrase: ex codice lumen',
				`translation: "${INCANTATIONS['ex codice lumen']}"`,
				'rune coordinates: 41.78°N, 71.44°W',
				'codex: v3.1.7',
				'last rite (hex): 0x680F4E00',
				'moon phase: Waxing Gibbous'
			]
		}
	},

	'translate ex codice lumen': {
		terminal: {
			lines: ['ex codice lumen → "from code, light"']
		}
	},

	summon: {
		terminal: {
			lines: [
				'summon endpoints:',
				'  /api/github',
				'  /api/sitemap',
				'  /humans.txt',
				'  /llms.txt'
			]
		}
	},

	severed: {
		terminal: {
			lines: ['elevator descending to /severed...'],
			navigate: '/severed',
			navigateDelay: 700
		},
		innie: {
			lines: ['badge accepted. descending to /severed...'],
			navigate: '/severed',
			navigateDelay: 700
		}
	}
};

export function runCommand(rawInput: string, mode: Mode): CommandResult {
	const input = rawInput.trim();
	const lower = input.toLowerCase();

	if (!input) return { lines: [] };
	if (lower === 'clear') return { lines: [], clear: true };
	if (lower === 'exit' || lower === 'quit') return { lines: [], close: true };

	if (lower.startsWith('translate ')) {
		const phrase = lower.slice('translate '.length).trim();
		const translation = INCANTATIONS[phrase];
		if (translation) return { lines: [`${phrase} → "${translation}"`] };
		return {
			lines: [`unknown incantation: ${phrase}`, 'try: translate ex codice lumen']
		};
	}

	const key = normalize(lower);
	const def = commands[key];
	if (def) {
		if (mode === 'rpg' && def.rpg) return def.rpg;
		if (mode === 'innie' && def.innie) return def.innie;
		return def.terminal;
	}

	return {
		lines: [`command not found: ${input}`, "type 'help' for available commands."]
	};
}

const argMap: Record<string, string[]> = {
	ls: ['work', '/work', 'stack', '/stack'],
	cat: ['resume.txt'],
	open: ['hire', '/hire'],
	git: ['log'],
	mode: ['rpg', 'terminal'],
	sudo: ['hire adam'],
	ritual: [],
	summon: [],
	translate: Object.keys(INCANTATIONS),
	innie: [],
	outie: [],
	macrodata: [],
	waffleparty: [],
	severed: []
};

const topLevelCommands = [
	'whoami',
	'help',
	'-h',
	'ls',
	'cat',
	'contact',
	'open',
	'echo',
	'git',
	'sudo',
	'clear',
	'exit',
	'quit',
	'rm',
	'vim',
	'vi',
	'nano',
	'emacs',
	'mode',
	'chocobo',
	'ritual',
	'summon',
	'translate',
	'innie',
	'outie',
	'macrodata',
	'waffleparty',
	'severed'
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
