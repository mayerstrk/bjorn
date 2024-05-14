<script lang="ts">
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
	import Spotlight from '../lib/components/spotlight.svelte';

	let clientWidth;
</script>

<Spotlight />
<page
	id="root-layout-page"
	class="flex flex-col h-full max-w-screen-xl min-w-[320px] w-full mx-auto"
	bind:clientWidth
>
	<nav id="root-layout-nav" class=" backdrop-blur-md p-5 justify-between flex">
		<Logo {clientWidth} />
		<Controls />
	</nav>
	<main id="root-layout-main" class="w-full flex grow">
		<slot />
	</main>
	<footer class="flex grow-0">
		<p class="text-xs md:text-sm text-gray-500 m-auto">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>
