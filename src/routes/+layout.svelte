<script lang="ts">
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
</script>

<page
	id="root-layout-page"
	class="scrollbar-hidden mx-auto flex h-full w-full min-w-[320px] max-w-screen-xl grow animate-fade-in flex-col overflow-y-auto px-5 text-stone-100 opacity-0"
>
	<nav
		id="root-layout-nav"
		class="sticky inset-x-0 top-0 flex w-full items-center justify-between py-5 backdrop-blur-sm"
	>
		<Logo />
		<Controls />
	</nav>
	<main id="root-layout-main" class="flex w-full grow flex-col">
		<dialog
			open
			class="r-0 absolute inset-0 z-50 w-full bg-black bg-opacity-70"
		></dialog>
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
