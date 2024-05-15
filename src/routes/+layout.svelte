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
	class="flex flex-col h-full overflow-y-auto max-w-screen-xl min-w-[320px] w-full mx-auto"
	bind:clientWidth
>
	<nav
		id="root-layout-nav"
		class="sticky top-0 inset-x-0 backdrop-blur-sm p-5 justify-between w-full flex"
	>
		<Logo {clientWidth} />
		<Controls />
	</nav>
	<main id="root-layout-main" class="w-full px-20 flex flex-col grow">
		<slot />
	</main>
	<footer class="flex grow-0">
		<p class="text-xs md:text-sm text-gray-500 m-auto pb-3">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>
