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
	async function handleCommand(clg: string) {
		if (!terminal) return;

		// Add a static flag to track if we're in REPL mode
		if (!(handleCommand as any).inPythonRepl) {
			(handleCommand as any).inPythonRepl = false;
		}

		// If we're in REPL mode, don't process as terminal command
		if ((handleCommand as any).inPythonRepl) {
			return;
		}

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
						if (args.length > 0) {
							await executeAndPrompt(args[0]);
						} else {
							// Set REPL mode flag
							(handleCommand as any).inPythonRepl = true;

							const console = await pyodide.runPythonAsync(`
                            from pyodide.console import PyodideConsole
                            import __main__
                            
                            console = PyodideConsole(__main__.__dict__)
                            console
                        `);

							// Set up output callbacks
							console.stdout_callback = (text: string) =>
								writeToTerminal(terminal, text);
							console.stderr_callback = (text: string) =>
								writeToTerminal(terminal, text);

							writeToTerminal(
								terminal,
								'Python 3.11 (Pyodide)\nType "exit()" to exit the REPL\n'
							);

							let inputBuffer = '';
							let inputHandler: ((data: string) => void) | null = null;

							const getLine = () =>
								new Promise<string>((resolve) => {
									inputBuffer = '';
									inputHandler = (data: string) => {
										for (const char of data) {
											if (char === '\r' || char === '\n') {
												terminal.write('\r\n');
												const line = inputBuffer;
												inputBuffer = '';
												resolve(line);
												return;
											} else if (char === '\b' || char === '\x7f') {
												if (inputBuffer.length > 0) {
													inputBuffer = inputBuffer.slice(0, -1);
												}
											} else {
												inputBuffer += char;
											}
										}
									};
								});

							terminal.onData((data) => {
								inputHandler?.(data);
							});

							while (true) {
								writeToTerminal(terminal, '>>> ', false);
								const input = await getLine();

								if (input === 'exit()') {
									writeToTerminal(terminal, 'Exiting Python REPL\n');
									// Reset REPL mode flag
									(handleCommand as any).inPythonRepl = false;
									break;
								}

								if (input.trim()) {
									// Only process non-empty input
									try {
										await console.push(input);
									} catch (error) {
										writeToTerminal(terminal, `${error}\n`);
									}
								}
							}
							inputHandler = null;
						}
					} catch (error) {
						writeToTerminal(terminal, `Error: ${error}`);
						// Reset REPL mode flag on error
						(handleCommand as any).inPythonRepl = false;
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
			if (!(handleCommand as any).inPythonRepl) {
				writeToTerminal(terminal, '\r\n$ ', false);
			}
		}
	}

	async function fetchRepo() {
		if (!browser || !terminal || !pyodide) return;

		try {
			await setupEnvironment(pyodide);
			writeToTerminal(terminal, 'Loading repository files...');

			const response = await fetch(
				'https://api.github.com/repos/mayerstrk/python-calculator-interview-task/git/trees/main?recursive=1'
			);
			const data = await response.json();

			const directories = new Set();
			data.tree.forEach((item) => {
				if (item.path.includes('/')) {
					const dir = item.path.split('/')[0];
					directories.add(dir);
				}
			});

			// Create each directory
			for (const dir of directories) {
				await runPythonCode(
					pyodide,
					`
                import os
                os.makedirs('${dir}', exist_ok=True)
            `
				);
			}

			// Then write files
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

<div class="flex h-full flex-col text-xs lg:flex-row">
	<!-- File Explorer -->
	<div
		class="h-1/6 w-full overflow-y-auto border-r bg-gray-50/80 p-4 lg:h-full lg:w-1/6"
	>
		<h2 class="mb-4 font-semibold">Files</h2>
		{#if fileTree}
			<ul class="space-y-2">
				{#each fileTree.children as node}
					{@const isDirectory = node.type === 'directory'}
					<li>
						{#if isDirectory}
							<div class="font-medium text-gray-600">📁 {node.name}/</div>
							<ul class="ml-4 mt-2">
								{#each node.children as childNode}
									{@const isChildDirectory = childNode.type === 'directory'}
									<li class="mt-2">
										{#if isChildDirectory}
											<div class="font-medium text-gray-600">
												📁 {childNode.name}/
											</div>
											<ul class="ml-4 mt-2">
												{#each childNode.children as grandChild}
													<li class="mt-2">
														<button
															onclick={async () => {
																selectedFile = grandChild.path;
																if (!pyodide || !terminal) {
																	terminal?.writeln('Failed to find pyodide');
																	return;
																}
																fileContent = await readFile(
																	pyodide,
																	grandChild.path
																);
															}}
															class="w-full text-left hover:text-blue-600"
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
													if (!pyodide || !terminal) {
														terminal?.writeln('Failed to find pyodide');
														return;
													}
													fileContent = await readFile(pyodide, childNode.path);
												}}
												class="w-full text-left hover:text-blue-600"
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
									if (!pyodide || !terminal) {
										terminal?.writeln('Failed to find pyodide');
										return;
									}
									fileContent = await readFile(pyodide, node.path);
								}}
								class="w-full text-left hover:text-blue-600"
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
	<div class="flex flex-1 flex-col overflow-hidden lg:h-full">
		<div class="flex flex-1 flex-col overflow-hidden bg-white/80 p-4 lg:h-1/2">
			<h2 class="font-semibold">{selectedFile || 'No file selected'}</h2>
			<div class="mt-4 flex-1 overflow-y-auto">
				{#if selectedFile}
					<textarea
						bind:value={fileContent}
						class="h-full w-full rounded border font-mono"
					></textarea>
				{/if}
			</div>
		</div>
		<div class="h-1/2">
			<div class="flex w-full items-center gap-2 bg-white/80 p-2">
				<button
					onclick={async () => {
						if (selectedFile && pyodide && terminal) {
							await writeFile(pyodide, selectedFile, fileContent);
							writeToTerminal(terminal, `Wrote to ${selectedFile}`);
							writeToTerminal(terminal, '$ ', false);
							fileTree = await scanDirectory(pyodide);
						}
					}}
					class="rounded px-4 py-2 text-accent-3 shadow-lg hover:bg-accent-4 hover:text-white"
					disabled={!selectedFile}
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
					class="rounded px-4 py-2 text-accent-3 shadow-lg hover:bg-accent-4 hover:text-white"
					disabled={!selectedFile}
				>
					Run
				</button>
			</div>
			<div class="bg-black lg:h-full" use:initTerminalHandler></div>
		</div>
	</div>
</div>
