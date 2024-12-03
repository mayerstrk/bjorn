<script lang="ts">
	import '../app.css';
	import RootLayoutNav from '$lib/components/root-layout/root-layout-nav.svelte';
</script>

<RootLayoutNav />
<page
	class="scrollbar-hidden mx-auto box-border flex h-full w-full min-w-[320px] max-w-screen-xl flex-col overflow-y-auto px-5"
>
	<div
		id="root-layout__slot-wrapper"
		class="scrollbar-hidden relative flex w-full flex-col md:h-full md:min-h-0 md:flex-1 md:grow"
	>
		<slot />
	</div>
	<footer class="relative flex w-full flex-col text-xs md:mt-0">
		<p class="mx-auto pb-3 text-xs opacity-50 md:mx-0 md:px-6">
			&copy; 2024 Mayer Starkman. All rights reserved.
		</p>
	</footer>
</page>

<style>
	page {
		cursor: url('../lib/svgs/custom-cursor.svg'), auto;
	}
</style>
