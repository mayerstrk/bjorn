<script lang="ts">
	import Tag from '$lib/components/atoms/tag.svelte';
	import { type CvArticleData } from '$lib/data/cv-articles';

	let { role, place, timeRange, description, tags }: CvArticleData = $props();
</script>

<div
	class="group relative flex flex-col gap-4 rounded-lg p-6 transition-all duration-500 hover:bg-content-1/5"
>
	<div class=" flex flex-col">
		<div class="flex items-center justify-between">
			<span class="text-sm text-content-2">{timeRange}</span>
		</div>
		<h3 class="transition-hover text-lg duration-500 group-hover:text-accent-3">
			{role}
		</h3>
		<p class="text-xs transition-all duration-500 group-hover:text-accent-3">
			{place}
		</p>
	</div>

	<p class="text-sm text-content-2">{description}</p>

	<div class="mt-4 flex flex-wrap gap-2">
		{#each tags as tech}
			<Tag {tech} />
		{/each}
	</div>
</div>
