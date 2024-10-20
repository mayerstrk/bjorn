<script lang="ts">
	import DimensionalBjorn from '$lib/components/dimensional-bjorn.svelte';
</script>

<aside
	class="scrollbar-hidden w-full p-2 md:h-full md:w-1/2 md:overflow-y-scroll md:p-6"
>
	<section id="home-hero" class="flex h-full flex-col">
		<div
			id="home-hero-title"
			class="items-middle flex w-full flex-col md:w-auto"
		>
			<h1 class="font font-poppins text-4xl leading-tight md:font-normal">
				Mayer Starkman Flores
			</h1>
			<h2>Senior Full Stack Engineer</h2>
		</div>
		<div id="home-hero-content" class="grow">
			<div class="h-[30vh] w-full bg-transparent">
				<DimensionalBjorn />
			</div>
			<p class="max-w-[900px] py-2 text-sm leading-loose text-gray-400">
				I design and build high-performance websites and applications, focusing
				on fun user experiences and creating development environments that boost
				productivity and inspire creativity.
			</p>
		</div>
	</section>
</aside>
