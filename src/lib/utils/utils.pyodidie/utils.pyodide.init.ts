import type { PyodideInterface } from './utils.pyodide.types';
import type { Terminal } from 'xterm';
import initEnv from './python/utils.pyodide.init-env.py?raw';
import fileOps from './python/utils.pyodide.file-ops.py?raw';
import execOps from './python/utils.pyodide.exec-ops.py?raw';
import dirOps from './python/utils.pyodide.dir-ops.py?raw';

export async function initializePyodide(
	terminal: Terminal | null
): Promise<PyodideInterface | null> {
	try {
		const loadPyodideModule = (window as any).loadPyodide;
		if (!loadPyodideModule) return null;

		const pyodide = await loadPyodideModule({
			indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
			stdout: (text: string) => terminal?.writeln(text),
			stderr: (text: string) => terminal?.writeln(text)
		});

		// Load all Python utilities
		await pyodide.runPythonAsync(initEnv);
		await pyodide.runPythonAsync(fileOps);
		await pyodide.runPythonAsync(execOps);
		await pyodide.runPythonAsync(dirOps);

		return pyodide;
	} catch (error) {
		console.error('Failed to initialize Pyodide:', error);
		return null;
	}
}
