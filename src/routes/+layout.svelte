<script lang="ts">
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
	import Spotlight from '../lib/components/spotlight.svelte';
</script>

<Spotlight />
<page
	id="root-layout-page"
	class="flex flex-col text-stone-100 h-full px-5 scrollbar-hidden overflow-y-auto max-w-screen-xl min-w-[320px] w-full mx-auto"
>
	<nav
		id="root-layout-nav"
		class="sticky items-center top-0 inset-x-0 backdrop-blur-sm py-5 justify-between w-full flex"
	>
		<Logo />
		<Controls />
	</nav>
	<main id="root-layout-main" class="w-full flex flex-col grow">
		<slot />
	</main>
	<footer class="flex grow-0">
		<p class="text-xs md:text-sm text-gray-500 m-auto pb-3">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>
