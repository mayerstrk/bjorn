<script lang="ts">
	import { browser } from '$app/environment';
	import 'xterm/css/xterm.css';

	// Import utilities
	import {
		type PyodideInterface,
		type FileNode,
		initializePyodide,
		runPythonCode,
		readFile,
		writeFile,
		executeFile,
		setupEnvironment,
		scanDirectory
	} from '$lib/utils/utils.pyodidie/index';

	import {
		type Terminal,
		initializeTerminal,
		writeToTerminal,
		readFromTerminal
	} from '$lib/utils/utils.xterm';

	// State declarations
	let fileTree = $state<FileNode | null>(null);
	let selectedFile = $state<string | null>(null);
	let fileContent = $state<string>('');
	let terminal = $state<Terminal | null>(null);
	let currentCommand = $state<string>('');
	let pyodide = $state<PyodideInterface | null>(null);
	let initialized = $state<boolean>(false);

	// Terminal initialization
	function initTerminalHandler(node: HTMLElement) {
		if (!browser) return;

		terminal = initializeTerminal(
			node,
			{
				cursorBlink: true,
				theme: { background: '#1a1a1a', foreground: '#ffffff' },
				fontSize: 14
			},
			handleTerminalData
		);

		if (terminal) {
			writeToTerminal(terminal, 'Loading Python...');
		}
	}
	// Terminal data handling
	function handleTerminalData(data: string) {
		if (!terminal) return;

		const result = readFromTerminal(terminal, currentCommand, data);

		if (result.shouldExecute) {
			if (result.newCommand.trim()) {
				handleCommand(result.newCommand.trim());
			} else {
				writeToTerminal(terminal, '$ ', false);
			}
			currentCommand = '';
		} else {
			currentCommand = result.newCommand;
		}
	}

	// Command handling
	async function handleCommand(cmd: string) {
		if (!terminal) return;

		const parts = cmd.split(' ');
		const command = parts[0];
		const args = parts.slice(1);

		try {
			switch (command) {
				case 'clear':
					terminal.clear();
					break;

				case 'ls':
					if (!pyodide) {
						writeToTerminal(terminal, 'Failed to find pyodide');
						break;
					}
					fileTree = await scanDirectory(pyodide);
					if (fileTree) {
						const printTree = (node: FileNode, indent: string = '') => {
							node.children.forEach((child) => {
								if (!terminal) {
									console.error(
										'Tried to use xterm terminal but found null or undefined'
									);
									return;
								}
								writeToTerminal(
									terminal,
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
					if (args[0] && terminal && pyodide) {
						try {
							const content = await readFile(pyodide, args[0]);
							writeToTerminal(terminal, content);
						} catch (error) {
							writeToTerminal(terminal, `Error reading file: ${error}`);
						}
					}
					break;

				case 'python3':
					if (!pyodide) {
						writeToTerminal(terminal, 'Python not ready');
						break;
					}
					try {
						if (args[0]) {
							await executeAndPrompt(args[0]);
						} else {
							const result = await runPythonCode(pyodide, command);
							if (result) writeToTerminal(terminal, result.toString());
						}
					} catch (error) {
						writeToTerminal(terminal, `Error: ${error}`);
					}
					break;

				case 'help':
					writeToTerminal(terminal, 'Commands: clear, ls, cat, python3');
					break;

				default:
					if (command) {
						writeToTerminal(terminal, `Unknown command: ${command}`);
					}
			}
		} catch (error) {
			writeToTerminal(terminal, `Error: ${error}`);
		} finally {
			writeToTerminal(terminal, '\r\n$ ', false);
		}
	}

	// Repository setup
	async function fetchRepo() {
		if (!browser || !terminal || !pyodide) return;

		try {
			// Initialize Python environment
			await setupEnvironment(pyodide);

			const response = await fetch(
				'https://api.github.com/repos/mayerstrk/python-calculator-interview-task/git/trees/main?recursive=1'
			);
			const data = await response.json();

			writeToTerminal(terminal, 'Loading repository files...');

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
					await writeFile(pyodide, item.path, content);
				}
			}

			await runPythonCode(
				pyodide,
				`
				import os
				for root, dirs, files in os.walk('.'):
					for file in files:
						if file.endswith('.py'):
							with open(os.path.join(root, file), 'r') as f:
								f.read()
			`
			);

			fileTree = await scanDirectory(pyodide);
			writeToTerminal(terminal, 'Repository loaded successfully.');
			writeToTerminal(terminal, '$ ', false);
		} catch (error) {
			writeToTerminal(terminal, `Failed to load repository: ${error}`);
			writeToTerminal(terminal, '$ ', false);
			console.error('Fetch error:', error);
		}
	}

	async function executeAndPrompt(path: string) {
		try {
			if (!terminal) {
				console.error(
					'Tried to use xterm terminal but found null or undefined'
				);
				return;
			}
			if (!pyodide) {
				writeToTerminal(terminal, 'Failed to load pyodide');
				return;
			}
			await executeFile(pyodide, path);
		} finally {
			if (!terminal) {
				console.error(
					'Tried to use xterm terminal but found null or undefined'
				);
			} else {
				writeToTerminal(terminal, '$ ', false);
			}
		}
	}
	// Initialization
	$effect(() => {
		if (browser && !initialized) {
			initialized = true;
			initializeSystem();
		}
	});

	async function initializeSystem() {
		if (!terminal) return;

		pyodide = await initializePyodide(terminal);
		if (pyodide) {
			writeToTerminal(terminal, 'Python ready');
			writeToTerminal(terminal, '$ ', false);
			await fetchRepo();
		}
	}
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
																	if (!pyodide) {
																		if (!terminal) {
																			console.error(
																				'Tried to use xterm terminal but found null or undefined'
																			);
																			return;
																		}
																		writeToTerminal(
																			terminal,
																			'Failed to find pyodide'
																		);
																		return;
																	}
																	fileContent = await readFile(
																		pyodide,
																		grandChild.path
																	);
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
														if (!pyodide) {
															if (!terminal) {
																console.error(
																	'Tried to use xterm terminal but found null or undefined'
																);
																return;
															}
															writeToTerminal(
																terminal,
																'Failed to find pyodide'
															);
															return;
														}
														fileContent = await readFile(
															pyodide,
															childNode.path
														);
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
										if (!pyodide) {
											if (!terminal) {
												console.error(
													'Tried to use xterm terminal but found null or undefined'
												);
												return;
											}
											writeToTerminal(terminal, 'Failed to find pyodide');
											return;
										}
										fileContent = await readFile(pyodide, node.path);
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

		<!-- Content and Terminal -->
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
								if (selectedFile && pyodide && terminal) {
									await writeFile(pyodide, selectedFile, fileContent);
									writeToTerminal(terminal, `Wrote to ${selectedFile}`);
									writeToTerminal(terminal, '$ ', false);
									fileTree = await scanDirectory(pyodide);
								}
							}}
							class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							Save
						</button>
						<button
							onclick={async () => {
								if (selectedFile && pyodide) {
									await writeFile(pyodide, selectedFile, fileContent);
									await executeAndPrompt(selectedFile);
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
			<div class="relative h-80 bg-black" use:initTerminalHandler></div>
		</div>
	</div>
</div>
