<script lang="ts">
	import DimensionalBjorn from '../dimensional-bjorn.svelte';
	import TechStackList from '../tech-stack-list.svelte';
</script>

<aside
	class="scrollbar-hidden h-fit w-full p-2 lg:h-full lg:w-1/2 lg:overflow-y-scroll lg:p-6"
>
	<section id="home-hero" class="flex h-full flex-col">
		<div
			id="home-hero-title"
			class="items-middle flex w-full flex-col lg:w-auto"
		>
			<h1 class="text-left text-4xl leading-tight">Mayer Starkman Flores</h1>
			<h2>Chief Technology Officer</h2>
		</div>
		<div class="min-h-48 w-full lg:h-1/3">
			<DimensionalBjorn />
		</div>
		<div id="home-hero-content" class=" flex grow flex-col">
			<p class="max-w-[900px] py-2 text-sm leading-loose text-content-2">
				I lead and mentor high-performing, multidisciplinary teams across
				software engineering, data science, and AI. My focus is on architecting
				scalable systems and fostering a culture of craftsmanship and innovation
				to deliver exceptional user experiences.
			</p>
		</div>
		<div class="mt-auto w-full">
			<TechStackList parentComponentName="home-hero" />
		</div>
	</section>
</aside>
