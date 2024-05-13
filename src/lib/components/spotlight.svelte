<script>
	let x = 0;
	let y = 0;

	// Update mouse position
	function updatePosition(event) {
		x = event.clientX;
		y = event.clientY;
	}
</script>

<svelte:window on:mousemove={updatePosition} />

<div
	class="spotlight"
	style="background-image: radial-gradient(circle at {x}px {y}px, transparent, rgba(0, 0, 0, 0.9) 70%);"
></div>

<style>
	.spotlight {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		backdrop-filter: blur(10px);
	}
</style>
