import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import type { TerminalConfig, TerminalDataHandler } from './utils.xterm.types';

export function initializeTerminal(
	node: HTMLElement,
	config: TerminalConfig,
	onData: TerminalDataHandler
): Terminal {
	const terminal = new Terminal(config);
	const fitAddon = new FitAddon();

	terminal.loadAddon(fitAddon);
	terminal.open(node);
	fitAddon.fit();

	terminal.onData(onData);
	window.addEventListener('resize', () => fitAddon.fit());

	return terminal;
}
