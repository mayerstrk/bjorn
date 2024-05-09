<script>
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';
</script>

<page id="root-layout-page" class="border-red-900 flex flex-col">
	<nav
		id="root-layout-nav"
		class="bg-surface-900 w-full p-2 justify-between flex"
	>
		<Logo />
		<Controls />
	</nav>
	<main
		id="root-layout-main"
		class="border-blue-900 border-4 w-full h-svh flex"
	>
		<slot />
	</main>
	<footer>
		<p class="text-xs">&copy; 2024 Mayer Starkman</p>
	</footer>
</page>
