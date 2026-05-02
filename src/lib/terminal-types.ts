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

export type CommandDef = {
	terminal: CommandResult;
	rpg?: CommandResult;
	innie?: CommandResult;
};
