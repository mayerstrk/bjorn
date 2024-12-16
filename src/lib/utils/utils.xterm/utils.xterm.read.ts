import type { Terminal } from './utils.xterm.types';

export function readFromTerminal(
	terminal: Terminal,
	currentCommand: string,
	data: string
): { newCommand: string; shouldExecute: boolean } {
	if (data === '\r') {
		// Enter key
		terminal.write('\r\n');
		return {
			newCommand: currentCommand, // Keep the command for execution
			shouldExecute: true
		};
	}

	if (data === '\u007F') {
		// Backspace
		if (currentCommand.length > 0) {
			terminal.write('\b \b');
			return {
				newCommand: currentCommand.slice(0, -1),
				shouldExecute: false
			};
		}
		return { newCommand: currentCommand, shouldExecute: false };
	}

	terminal.write(data);
	return {
		newCommand: currentCommand + data,
		shouldExecute: false
	};
}
