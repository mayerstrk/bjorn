<script lang="ts">
	import HomeSideBar from '$lib/components/home/home-side-bar.svelte';
	import Main from '$lib/components/home/home-main.svelte';
</script>

<svelte:head>
	<title>Mayer Starkman - Fullstack Software Engineer</title>
	<meta
		name="description"
		content="Mayer Starkman - Software and Network Engineer, Product Lead and Designer based in Tel-Aviv"
	/>
</svelte:head>

<div class="scrollbar-hidden flex h-full w-full flex-col md:flex-row">
	<HomeSideBar />
	<Main />
</div>
