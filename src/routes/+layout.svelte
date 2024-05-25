<script lang="ts">
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
</script>

<page
	id="root-layout-page"
	class="scrollbar-hidden mx-auto flex h-full w-full min-w-[320px] max-w-screen-xl flex-col overflow-y-auto px-5 text-stone-100"
	onscroll={() => console.log('scrolling')}
>
	<nav
		id="root-layout-nav"
		class="sticky inset-x-0 top-0 flex w-full items-center justify-between py-5 backdrop-blur-sm"
	>
		<Logo />
		<Controls />
	</nav>
	<main id="root-layout-main" class="flex w-full grow flex-col">
		<slot />
	</main>
	<footer class="flex grow-0">
		<p class="m-auto pb-3 text-xs text-gray-500 md:text-sm">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>
