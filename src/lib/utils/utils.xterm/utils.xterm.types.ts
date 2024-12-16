import type { Terminal as XTerminal, ITerminalOptions } from 'xterm';

export type Terminal = XTerminal;

export interface TerminalConfig extends ITerminalOptions {
	cursorBlink: boolean;
	theme: {
		background: string;
		foreground: string;
	};
	fontSize: number;
}

export type TerminalDataHandler = (data: string) => void;
