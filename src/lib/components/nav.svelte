<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/logo.svelte';
	import { fade } from 'svelte/transition';

	let navOffsetHeight = $state(120);
	let isMobileNavModalOpen = $state(false);

	const toggleisMobileNavModalOpen = () => {
		isMobileNavModalOpen = !isMobileNavModalOpen;
	};

	page;
</script>

<nav
	bind:offsetHeight={navOffsetHeight}
	id="root-layout-nav"
	class="sticky top-0 z-50 m-auto flex w-full max-w-screen-2xl items-center justify-between p-5 backdrop-blur-sm"
>
	{#if isMobileNavModalOpen}
		<div
			transition:fade={{ duration: 300 }}
			id="root-layout-nav-modal"
			style={`top: ${navOffsetHeight}px`}
			class={`absolute right-5 flex items-center rounded-lg bg-black bg-opacity-60 p-5 text-sm leading-loose text-white transition-all ease-in-out`}
		>
			<nav id="root-layout-nav-mobile-modal-nav">
				<ul class="flex flex-col gap-4">
					<li>
						<a
							href="/"
							class:active-route={$page.url.pathname === '/'}
							class="w-full">Home</a
						>
					</li>
					<li>
						<a
							class:active-route={$page.url.pathname === '/works'}
							href="/works">Works</a
						>
					</li>
					<li>
						<a
							class:active-route={$page.url.pathname === '/thoughts'}
							href="/thoughts">Thoughts</a
						>
					</li>
				</ul>
			</nav>
		</div>
	{/if}
	<Logo />
	<div id="nav-controls" class="flex items-center gap-2">
		<button
			type="button"
			class="size-9 rounded-md border-2 border-stone-700 bg-amber-200 md:size-11"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-sun m-auto transition-all hover:size-[24px]"
				><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path
					d="M12 20v2"
				/><path d="m4.93 4.93 1.41 1.41" /><path
					d="m17.66 17.66 1.41 1.41"
				/><path d="M2 12h2" /><path d="M20 12h2" /><path
					d="m6.34 17.66-1.41 1.41"
				/><path d="m19.07 4.93-1.41 1.41" /></svg
			>
		</button>
		<button
			type="button"
			class="size-9 rounded-md border-[1px] border-stone-700 md:size-11"
			onclick={toggleisMobileNavModalOpen}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-menu m-auto transition-all hover:size-[24px]"
				><line x1="4" x2="20" y1="12" y2="12" /><line
					x1="4"
					x2="20"
					y1="6"
					y2="6"
				/><line x1="4" x2="20" y1="18" y2="18" /></svg
			>
		</button>
	</div>
</nav>

<style>
	li {
		@apply flex w-full justify-center text-center;
	}

	a {
		@apply w-full;
	}

	.active-route {
		@apply border-b-2 border-pink-500;
	}
</style>
