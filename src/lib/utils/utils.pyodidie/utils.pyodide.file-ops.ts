import type { PyodideInterface } from './utils.pyodide.types';

export async function readFile(
	pyodide: PyodideInterface,
	path: string
): Promise<string> {
	return await pyodide.runPythonAsync(`read_file('${path}')`);
}

export async function writeFile(
	pyodide: PyodideInterface,
	path: string,
	content: string
): Promise<void> {
	const cleanContent = content
		.replace(/\\/g, '\\\\')
		.replace(/'''/g, "\\'\\'\\'");

	await pyodide.runPythonAsync(
		`write_file('${path}', ${JSON.stringify(cleanContent)})`
	);
}

export async function executeFile(
	pyodide: PyodideInterface,
	path: string
): Promise<void> {
	await pyodide.runPythonAsync(`execute_file('${path}')`);
}
