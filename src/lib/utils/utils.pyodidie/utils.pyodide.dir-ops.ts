import type { PyodideInterface, FileNode } from './utils.pyodide.types';

export async function setupEnvironment(
	pyodide: PyodideInterface
): Promise<void> {
	await pyodide.runPythonAsync('setup_environment()');
}

export async function scanDirectory(
	pyodide: PyodideInterface
): Promise<FileNode> {
	const treeData = await pyodide.runPythonAsync('get_directory_tree()');
	return {
		name: 'root',
		path: '.',
		type: 'directory',
		children: JSON.parse(treeData)
	};
}
