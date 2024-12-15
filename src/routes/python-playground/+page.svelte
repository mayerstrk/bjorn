<script lang="ts">
	import { browser } from '$app/environment';
	import type { PyodideInterface } from 'pyodide';
	import { Terminal } from 'xterm';
	import { FitAddon } from 'xterm-addon-fit';
	import 'xterm/css/xterm.css';

	type FileNode = {
		name: string;
		path: string;
		type: 'directory' | 'file';
		children: FileNode[];
	};

	let fileTree = $state<FileNode | null>(null);
	let selectedFile = $state<string | null>(null);
	let fileContent = $state<string>('');
	let terminal = $state<Terminal | null>(null);
	let currentCommand = $state<string>('');
	let pyodide = $state<PyodideInterface | null>(null);
	let initialized = $state<boolean>(false);

	async function writeFile(path: string, content: string) {
		if (!pyodide || !terminal) return;

		try {
			const cleanContent = content
				.replace(/\\/g, '\\\\')
				.replace(/'''/g, "\\'\\'\\'");

			const pythonWrite = `
try:
    content = ${JSON.stringify(cleanContent)}
    with open('${path}', 'w') as f:
        f.write(content)

    # Verify content
    with open('${path}', 'r') as f:
        content = f.read()
except Exception as e:
    print(f"Error writing file {path}: {str(e)}")
    raise e
        `;

			await pyodide.runPythonAsync(pythonWrite);
		} catch (error) {
			console.error('Write error:', error);
			terminal.writeln(`Error writing file: ${error}`);
		}
	}

	async function readFile(filePath: string) {
		if (!pyodide) return '';

		try {
			const pythonRead = `
with open('${filePath}', 'r') as f:
    content = f.read()
content
        `;
			const content = await pyodide.runPythonAsync(pythonRead);
			return content;
		} catch (error) {
			console.error('Read error:', error);
			terminal?.writeln(`Error reading file: ${error}`);
			return '';
		}
	}

	async function runPythonFile(filePath: string) {
		if (!pyodide || !terminal) return;

		try {
			const pythonRun = `
import os
import sys
from pathlib import Path

# Normalize file path
file_path = os.path.normpath('${filePath}')
file_dir = os.path.dirname(file_path)

# Store original directory
original_dir = os.getcwd()

# Add directories to Python path
if file_dir:
    sys.path.insert(0, file_dir)
sys.path.insert(0, '.')


try:
    # Execute file
    with open(file_path, 'r') as f:
        code = f.read()
        # Create a new namespace with __name__ set to __main__
        namespace = {'__name__': '__main__', '__file__': file_path}
        exec(code, namespace)
finally:
    # restore the original directory
    os.chdir(original_dir)
        `;

			await pyodide.runPythonAsync(pythonRun);
		} catch (error) {
			terminal.writeln(`Error running file: ${error}`);
			console.error('Run error:', error);

			try {
				await pyodide.runPythonAsync(`
import traceback
print("Python traceback:")
traceback.print_exc()
            `);
			} catch (e) {
				console.error('Error printing traceback:', e);
			}
		}
	}

	async function updateFileTree() {
		if (!pyodide) return;

		try {
			const treeData = await pyodide.runPythonAsync(`
import os
import json

def scan_directory(path='.'):
    result = []
    for item in sorted(os.listdir(path)):
        if item.startswith('.'): continue
        full_path = os.path.join(path, item)
        is_dir = os.path.isdir(full_path)
        node = {
            "name": item,
            "path": full_path.replace('\\\\', '/'),
            "type": "directory" if is_dir else "file",
            "children": scan_directory(full_path) if is_dir else []
        }
        result.append(node)
    return result

json.dumps(scan_directory())
        `);

			fileTree = {
				name: 'root',
				path: '.',
				type: 'directory',
				children: JSON.parse(treeData)
			};
		} catch (error) {
			console.error('Tree update error:', error);
		}
	}

	function initTerminal(node: HTMLElement) {
		if (!browser) return;

		terminal = new Terminal({
			cursorBlink: true,
			theme: { background: '#1a1a1a', foreground: '#ffffff' },
			fontSize: 14
		});

		if (!terminal) {
			console.error('Failed to create terminal');
			return;
		}

		const fitAddon = new FitAddon();
		terminal.loadAddon(fitAddon);
		terminal.open(node);
		fitAddon.fit();

		terminal.write('Loading Python...\r\n');

		terminal.onData((data) => {
			if (!terminal) return;

			if (data === '\r') {
				terminal.write('\r\n');
				if (currentCommand.trim()) {
					handleCommand(currentCommand.trim());
				} else {
					terminal.write('$ ');
				}
				currentCommand = '';
			} else if (data === '\u007F') {
				if (currentCommand.length > 0) {
					currentCommand = currentCommand.slice(0, -1);
					terminal.write('\b \b');
				}
			} else {
				currentCommand = currentCommand + data;
				terminal.write(data);
			}
		});

		window.addEventListener('resize', () => fitAddon.fit());
	}

	async function loadPyodide() {
		if (!browser || !terminal) return;

		try {
			const loadPyodideModule = (window as any).loadPyodide;
			if (loadPyodideModule) {
				pyodide = await loadPyodideModule({
					indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
					stdout: (text: string) => terminal?.writeln(text),
					stderr: (text: string) => terminal?.writeln(text)
				});

				await pyodide.runPythonAsync(`
import sys
import os
sys.path.append('.')
            `);

				terminal.writeln('Python ready');
				terminal.write('$ ');
			}
		} catch (error) {
			terminal?.writeln(`Failed to load Python: ${error}`);
		}
	}

	async function fetchRepo() {
		if (!browser || !terminal || !pyodide) return;

		try {
			// Initialize python environment
			await pyodide.runPythonAsync(`
import os
import sys
os.makedirs('test_dir', exist_ok=True)
os.makedirs('test_dir_2', exist_ok=True)
os.makedirs('test_dir/nested_test_dir', exist_ok=True)
sys.path.append('.')
        `);

			const response = await fetch(
				'https://api.github.com/repos/mayerstrk/python-calculator-interview-task/git/trees/main?recursive=1'
			);
			const data = await response.json();

			for (const item of data.tree) {
				if (item.type === 'blob') {
					const contentResponse = await fetch(
						`https://api.github.com/repos/mayerstrk/python-calculator-interview-task/git/blobs/${item.sha}`
					);
					const contentData = await contentResponse.json();
					let content = atob(contentData.content);
					content = content
						.replace(/\*\*name\*\*/g, '__name__')
						.replace(/\*\*file\*\*/g, '__file__')
						.replace(/\*\*path\*\*/g, '__path__');
					await writeFile(item.path, content);
				}
			}

			// Verify files after writing
			await pyodide.runPythonAsync(`
import os

def verify_file(path):
    with open(path, 'r') as f:
        content = f.read()

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.py'):
            verify_file(os.path.join(root, file))
        `);

			await updateFileTree();
			terminal.writeln('Repository loaded successfully.');
		} catch (error) {
			terminal.writeln(`Failed to load repository: ${error}`);
			console.error('Fetch error:', error);
		}
	}

	async function handleCommand(cmd: string) {
		if (!terminal) return;

		const parts = cmd.split(' ');
		const command = parts[0];
		const args = parts.slice(1);

		switch (command) {
			case 'clear':
				terminal.clear();
				break;

			case 'ls':
				await updateFileTree();
				if (fileTree) {
					const printTree = (node: FileNode, indent: string = '') => {
						node.children.forEach((child) => {
							terminal.writeln(
								`${indent}${child.type === 'directory' ? '📁' : '📄'} ${child.name}`
							);
							if (child.type === 'directory') {
								printTree(child, indent + '    ');
							}
						});
					};
					printTree(fileTree);
				}
				break;

			case 'cat':
				if (args[0]) {
					const content = await readFile(args[0]);
					terminal.writeln(content);
				}
				break;

			case 'python3':
				if (!pyodide) {
					terminal.writeln('Python not ready');
					break;
				}
				try {
					if (args[0]) {
						await runPythonFile(args[0]);
					} else {
						const result = await pyodide.runPythonAsync(command);
						if (result) terminal.writeln(result.toString());
					}
				} catch (error) {
					terminal.writeln(`Error: ${error}`);
				}
				break;

			case 'help':
				terminal.writeln('Commands: clear, ls, cat, python3');
				break;

			default:
				terminal.writeln(`Unknown command: ${command}`);
		}

		terminal.write('\r\n$ ');
	}

	$effect(() => {
		if (browser && !initialized) {
			initialized = true;
			loadPyodide().then(() => {
				if (pyodide) {
					fetchRepo();
				}
			});
		}
	});
</script>

<div class="flex h-full flex-col">
	<div class="flex flex-1">
		<!-- File Explorer -->
		<div class="w-64 overflow-y-auto border-r bg-gray-100 p-4">
			<h2 class="mb-4 text-lg font-bold">Files</h2>
			{#if fileTree}
				<ul class="space-y-2">
					{#each fileTree.children as node}
						{@const isDirectory = node.type === 'directory'}
						<li>
							{#if isDirectory}
								<div class="font-bold text-gray-600">📁 {node.name}/</div>
								<ul class="ml-4 space-y-1">
									{#each node.children as childNode}
										{@const isChildDirectory = childNode.type === 'directory'}
										<li>
											{#if isChildDirectory}
												<div class="font-bold text-gray-600">
													📁 {childNode.name}/
												</div>
												<ul class="ml-4 space-y-1">
													{#each childNode.children as grandChild}
														<li>
															<button
																onclick={async () => {
																	selectedFile = grandChild.path;
																	fileContent = await readFile(grandChild.path);
																}}
																class="flex w-full items-center space-x-2 py-1 text-left hover:text-blue-600"
															>
																📄 {grandChild.name}
															</button>
														</li>
													{/each}
												</ul>
											{:else}
												<button
													onclick={async () => {
														selectedFile = childNode.path;
														fileContent = await readFile(childNode.path);
													}}
													class="flex w-full items-center space-x-2 py-1 text-left hover:text-blue-600"
												>
													📄 {childNode.name}
												</button>
											{/if}
										</li>
									{/each}
								</ul>
							{:else}
								<button
									onclick={async () => {
										selectedFile = node.path;
										fileContent = await readFile(node.path);
									}}
									class="flex w-full items-center space-x-2 py-1 text-left hover:text-blue-600"
								>
									📄 {node.name}
								</button>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<div>Loading...</div>
			{/if}
		</div>

		<!-- Content  -->
		<div class="flex flex-1 flex-col">
			<div class="flex-1 overflow-y-auto bg-white p-4">
				{#if selectedFile}
					<h2 class="mb-4 text-lg font-bold">{selectedFile}</h2>
					<textarea
						bind:value={fileContent}
						class="h-64 w-full rounded bg-gray-50 p-2 font-mono text-sm"
					></textarea>
					<div class="mt-2 flex space-x-4">
						<button
							onclick={async () => {
								if (selectedFile) {
									await writeFile(selectedFile, fileContent);
									await updateFileTree();
								}
							}}
							class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							Save
						</button>
						<button
							onclick={async () => {
								if (selectedFile) {
									await writeFile(selectedFile, fileContent);
									await runPythonFile(selectedFile);
								}
							}}
							class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
						>
							Run
						</button>
					</div>
				{:else}
					<h2 class="mb-4 text-lg font-bold">No file selected</h2>
				{/if}
			</div>

			<!-- Terminal-->
			<div class="relative h-80 bg-black" use:initTerminal></div>
		</div>
	</div>
</div>
