<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/nav.svelte';
</script>

<div class="h-auto bg-yellow-200 py-1 text-center">Under Construction</div>
<Nav />
<page
	id="root-layout-page"
	class="scrollbar-hidden mx-auto flex h-full w-full min-w-[320px] max-w-screen-xl grow animate-fade-in flex-col px-5 text-stone-100 opacity-0"
>
	<main id="root-layout-main" class="relative flex w-full grow flex-col">
		<slot />
	</main>
	<footer class="flex grow-0">
		<p class="m-auto pb-3 text-xs text-gray-500 md:text-sm">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>

<style>
	page {
		cursor: url('../lib/svgs/custom-cursor.svg'), auto;
	}
</style>
