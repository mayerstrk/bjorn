export interface PyodideInterface {
	runPythonAsync: (code: string) => Promise<any>;
	loadPackage: (names: string | string[]) => Promise<void>;
}

export interface FileNode {
	name: string;
	path: string;
	type: 'directory' | 'file';
	children: FileNode[];
}
