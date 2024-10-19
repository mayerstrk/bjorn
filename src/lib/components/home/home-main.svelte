<script lang="ts">
	import cvArticles from '$lib/data/cv-articles';
	import CvCard from '$lib/components/home/cv-card.svelte';
</script>

<main
	class="scrollbar-hidden relative flex min-h-0 w-full flex-1 flex-col gap-4 p-2 md:h-full md:w-1/2 md:overflow-y-scroll md:p-4"
>
	{#each cvArticles as cvArticle}
		<CvCard {...cvArticle} />
	{/each}
</main>
