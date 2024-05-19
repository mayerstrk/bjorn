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
	class="spotlight hidden sm:flex"
	style="
  background-image: radial-gradient(circle at {x}px {y}px, transparent, rgba(0, 0, 0, 0.4) 100%);"
></div>

<style>
	.spotlight {
		position: fixed;
		inset: 0;
		width: 100%;
		height: viewport-height;
		pointer-events: none;
		backdrop-filter: blur(10px);
		z-index: -1;
	}
</style>
