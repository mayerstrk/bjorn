import type { Terminal } from './utils.xterm.types';

export function writeToTerminal(
	terminal: Terminal,
	text: string,
	newLine: boolean = true
): void {
	if (newLine) {
		terminal.writeln(text);
	} else {
		terminal.write(text);
	}
}
