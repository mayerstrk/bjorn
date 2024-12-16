import type { PyodideInterface } from './utils.pyodide.types';

export async function runPythonCode(
	pyodide: PyodideInterface,
	code: string
): Promise<any> {
	try {
		return await pyodide.runPythonAsync(code);
	} catch (error) {
		throw new Error(`Python execution error: ${error}`);
	}
}
