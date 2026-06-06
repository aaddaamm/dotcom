export type Mode = 'terminal' | 'rpg' | 'innie';

export type HistoryEntry =
	| { id: number; type: 'input'; text: string }
	| { id: number; type: 'output'; lines: string[] };

export type CommandResult = {
	lines: string[];
	navigate?: string;
	navigateDelay?: number;
	modeChange?: Mode;
	rpgUnlock?: boolean;
	clear?: boolean;
	close?: boolean;
};

export type CommandDef = {
	terminal: CommandResult;
	rpg?: CommandResult;
	innie?: CommandResult;
};
