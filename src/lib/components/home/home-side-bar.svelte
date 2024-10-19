<script lang="ts">
	import DimensionalBjorn from '$lib/components/dimensional-bjorn.svelte';
</script>

<aside class="scrollbar-hidden w-full p-2 md:w-1/2 md:overflow-y-scroll md:p-6">
	<section class="section" id="root-hero">
		<div
			id="root-hero-main"
			class="flex flex-row items-center justify-center gap-6 py-4 sm:flex-row md:gap-14"
		>
			<div
				id="root-hero-text"
				class="items-middle flex w-full flex-col md:w-auto"
			>
				<h1 class="font font-poppins text-4xl leading-tight md:font-normal">
					Mayer Starkman Flores
				</h1>
				<h2>Senior Full Stack Engineer</h2>
			</div>
		</div>
		<div class="-z-5 h-[30vh] w-full bg-transparent">
			<DimensionalBjorn />
		</div>
		<p class="m-auto max-w-[900px] py-2 text-sm leading-loose text-gray-400">
			&nbsp;&nbsp;&nbsp;&nbsp;I am passionate about designing and building
			efficient, <span class="underline underline-offset-4">simple</span>
			systems that look good and are easy to use - from drawing up process diagrams,
			UX design and infrastructure provisioning, all the way to running pilots and
			handling subsequent feature requests and code-base maintenance. Crafting apps
			that offer an incredible experience for both developers and users and optimizing
			for
			<span class="underline underline-offset-4">performance</span>
			is something I find truly rewarding.
			<span class="opacity-0 transition-opacity hover:opacity-100">
				I don't want JS on the backend :)</span
			>
		</p>
	</section>
</aside>
