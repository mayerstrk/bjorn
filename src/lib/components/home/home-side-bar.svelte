<script lang="ts">
	import DimensionalBjorn from '../dimensional-bjorn.svelte';
	import TechStackList from '../tech-stack-list.svelte';
</script>

<aside
	class="scrollbar-hidden h-fit w-full p-2 md:h-full md:w-1/2 md:overflow-y-scroll md:p-6"
>
	<section id="home-hero" class="flex h-full flex-col">
		<div
			id="home-hero-title"
			class="items-middle flex w-full flex-col md:w-auto"
		>
			<h1 class="text-left text-4xl leading-tight">Mayer Starkman Flores</h1>
			<h2>Senior Full Stack Engineer</h2>
		</div>
		<div class="min-h-48 w-full md:h-1/3">
			<DimensionalBjorn />
		</div>
		<div id="home-hero-content" class=" flex grow flex-col">
			<p class="max-w-[900px] py-2 text-sm leading-loose text-content-2">
				I design and build high-performance websites and applications, focusing
				on serving enjoyable user experiences and creating development
				environments that boost productivity and inspire creativity (I use vim
				btw).
			</p>
		</div>
		<div class="mt-auto w-full">
			<TechStackList parentComponentName="home-hero" />
		</div>
	</section>
</aside>
