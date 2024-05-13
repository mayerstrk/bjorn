<script lang="ts">
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
	import Spotlight from '../lib/components/spotlight.svelte';

	let clientWidth = $state(0);
</script>

<Spotlight />
<page id="root-layout-page" class="flex flex-col" bind:clientWidth>
	<nav
		id="root-layout-nav"
		class="fixed top-0 backdrop-blur-md left-0 right-0 p-5 justify-between flex"
	>
		<Logo {clientWidth} />
		<Controls />
	</nav>
	<!-- svelte-ignore deprecated_slot_element -->
	<main id="root-layout-main" class=" w-full h-svh flex">
		<slot />
	</main>
	<footer>
		<p class="text-xs">&copy; 2024 Mayer Starkman</p>
	</footer>
</page>
