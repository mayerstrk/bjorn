import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import type { TerminalConfig, TerminalDataHandler } from './utils.xterm.types';

export function initializeTerminal(
	node: HTMLElement,
	config: TerminalConfig,
	onData: TerminalDataHandler
): Terminal {
	const terminal = new Terminal({
		...config,
		cursorStyle: 'block',
		cursorBlink: true
	});

	const fitAddon = new FitAddon();
	terminal.loadAddon(fitAddon);

	if (node) {
		terminal.open(node);
		fitAddon.fit();
	}

	terminal.onData((data) => {
		try {
			onData(data);
		} catch (error) {
			console.error('Error in terminal data handler:', error);
		}
	});

	window.addEventListener('resize', () => {
		try {
			fitAddon.fit();
		} catch (error) {
			console.error('Error fitting terminal:', error);
		}
	});

	return terminal;
}
