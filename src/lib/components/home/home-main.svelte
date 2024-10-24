<script lang="ts">
	import cvArticles from '$lib/data/cv-articles';
	import CvCard from '$lib/components/home/cv-card.svelte';
</script>

<main
	class="scrollbar-hidden relative flex min-h-0 w-full flex-col gap-2 p-2 md:w-1/2 md:flex-1 md:grow md:p-4"
>
	<nav
		class="sticky top-0 z-10 flex w-full max-w-screen-2xl rounded-md bg-bkg-1/10 p-2 px-5 backdrop-blur-sm md:static md:bg-transparent"
	>
		<ul class="flex w-full gap-2 text-sm italic text-accent-1">
			<li class="font-medium md:font-normal">
				<a
					href="/mayer-starkman-flores-resume-one-page.pdf"
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
					>
						<path d="M7 7h10v10"></path>
						<path d="M7 17 17 7"></path>
					</svg>
				</a>
			</li>

			<!-- Apply ml-auto here to push the rest to the right -->
			<li class="ml-auto">
				<span class="italic">bio</span>
			</li>

			<li>
				<a
					href="https://github.com/mayerstrk"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-500">projects</a
				>
			</li>
		</ul>
	</nav>

	<article class="scrollbar-hidden flex-1 flex-col gap-4 overflow-y-auto">
		{#each cvArticles as cvArticle}
			<CvCard {...cvArticle} />
		{/each}
	</article>
</main>
