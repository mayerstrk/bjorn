<script lang="ts">
	let x = 0;
	let y = 0;

	function updatePosition(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;
	}
</script>

<svelte:window on:mousemove={updatePosition} />

<div
	class="spotlight"
	style="background-image: radial-gradient(circle at {x}px {y}px, transparent, rgba(0, 0, 0, 1) 90%);"
></div>

<style>
	.spotlight {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		backdrop-filter: blur(10px);
		z-index: -1;
	}
</style>
