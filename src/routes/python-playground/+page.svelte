<script lang="ts">
	import { browser } from '$app/environment';
	let repoContent = $state<string | null>(null);
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	async function fetchRepo() {
		if (!browser) return;

		isLoading = true;
		error = null;

		try {
			const response = await fetch(
				'https://api.github.com/repos/mayerstrk/bjorn/contents'
			);
			const data = await response.json();
			console.log('Repo contents:', data);
			repoContent = JSON.stringify(data, null, 2);
		} catch (err) {
			console.error('Error fetching repo:', err);
			error = err instanceof Error ? err.message : 'Failed to fetch repository';
		} finally {
			isLoading = false;
		}
	}

	// Fetch on mount
	$effect(() => {
		if (browser) {
			fetchRepo();
		}
	});
</script>

<div class="container">
	<h1>Git Repository Contents</h1>

	<button on:click={fetchRepo} disabled={isLoading}>
		{isLoading ? 'Loading...' : 'Reload'}
	</button>

	{#if error}
		<div class="error">
			Error: {error}
		</div>
	{/if}

	{#if isLoading}
		<div class="loading">Loading repository...</div>
	{:else if repoContent}
		<pre>{repoContent}</pre>
	{/if}
</div>

<style>
	.container {
		padding: 1rem;
	}

	pre {
		background-color: #f5f5f5;
		padding: 1rem;
		overflow-x: auto;
		margin-top: 1rem;
	}

	.error {
		color: red;
		padding: 1rem;
		margin: 1rem 0;
		background-color: #fff3f3;
		border: 1px solid #ffa7a7;
	}

	.loading {
		padding: 1rem;
		color: #666;
		font-style: italic;
	}

	button {
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
</style>
