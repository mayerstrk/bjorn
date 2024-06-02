<script lang="ts">
	import { DoubleBounce } from 'svelte-loading-spinners';
	import '../app.css';
	import Logo from '../lib/components/logo.svelte';
	import Controls from '../lib/components/nav-controls.svelte';

	let posX = 0;
	let posY = 0;

	function updatePosition(event: MouseEvent) {
		// The circle is 32px in diameter (w-8 h-8 in Tailwind is 2rem or 32px), so we adjust by half of that.
		posX = event.clientX - 16; // Subtract half the width
		posY = event.clientY - 16; // Subtract half the height
	}
</script>

<page
	role="main"
	id="root-layout-page"
	class="scrollbar-hidden mx-auto flex h-full w-full min-w-[320px] max-w-screen-xl grow cursor-none flex-col overflow-y-auto px-5 text-stone-100"
	onscroll={() => console.log('scrolling')}
	on:mousemove={updatePosition}
>
	<div
		class="pointer-events-none absolute"
		style="top: {posY}px; left: {posX}px;"
	>
		<DoubleBounce size="32" duration="4s" color="white" />
	</div>
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

<style>
	/* Tailwind does not natively support keyframes or complex animations, so adding basic CSS for pulsing */
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.5;
		}
	}
</style>
