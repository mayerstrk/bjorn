<script lang="ts">
	import cvArticles from '$lib/data/cv-articles';
	import CvCard from '$lib/components/home/cv-card.svelte';
</script>

<main
	class="relative flex min-h-0 w-full flex-1 grow flex-col p-2 md:h-full md:w-1/2 md:p-4"
>
	<nav
		class="sticky inset-x-0 top-0 z-50 rounded-md bg-bkg-1/20 p-2 backdrop-blur-lg md:static md:inset-x-auto md:bg-transparent md:backdrop-blur-none"
	>
		<ul class="flex gap-2 text-sm italic text-accent-3">
			<li class="mr-auto">
				<a
					href="/mayer-starkman-resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex"
				>
					full resume
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-arrow-up-right transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-125"
						><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg
					>
				</a>
			</li>
			<li>
				<span class="italic">bio</span>
			</li>
			<li>
				<a
					href="https://github.com/mayerstrk"
					target="_blank"
					rel="noopener noreferrer"
					class="text-content-1">projects</a
				>
			</li>
		</ul>
	</nav>
	<article class="scrollbar-hidden z-40 flex-1 flex-col gap-4 overflow-y-auto">
		{#each cvArticles as cvArticle}
			<CvCard {...cvArticle} />
		{/each}
	</article>
</main>
