<script lang="ts">
	const { parentComponentName } = $props<{ parentComponentName: string }>();
	import { envTechs, techs } from '$lib/data/tech-data';
</script>

<div
	class="relative my-10 flex w-full flex-col gap-2 overflow-x-clip rounded-lg p-4 py-12 lg:mt-auto lg:py-2"
	id="{parentComponentName}-tech-stack"
>
	<ul class="tech-grid">
		{#each envTechs as tech}
			<li
				id="{parentComponentName}-tech-stack-env-list-{tech.name}"
				class="tooltip m-auto p-1"
			>
				<tech.component sizeClass="size-6 lg:size-5" />
				<span class="tooltiptext">{tech.name}</span>
			</li>
		{/each}
	</ul>
	<ul class="tech-grid">
		{#each techs as tech}
			<li
				id="{parentComponentName}-tech-stack-web-list-{tech.name}"
				class="tooltip m-auto p-1"
			>
				<tech.component sizeClass="size-6 lg:size-5" />
				<span class="tooltiptext">{tech.name}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
		grid-auto-rows: 1fr;
		grid-auto-flow: row;
	}

	.tech-grid > * {
		aspect-ratio: 1 / 1; /* Ensures each cell is a square */
	}

	.tooltip {
		position: relative;
		cursor: pointer;
	}

	.tooltiptext {
		visibility: hidden;
		width: 80px;
		background-color: #333;
		font-size: 12px;
		color: #fff;
		text-align: center;
		border-radius: 4px;
		padding: 2px 2px;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: -40px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}

	.tooltip .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #333 transparent transparent transparent;
	}
</style>
