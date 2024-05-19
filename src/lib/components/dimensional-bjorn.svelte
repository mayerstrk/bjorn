<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	let canvas: HTMLCanvasElement;
	let wrapper: HTMLDivElement;
	let rotationSpeed = 1700; // Initial high rotation speed
	const deceleration = 50; // Deceleration rate
	let canvasSize = $state({ width: 0, height: 0 });

	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;

	onMount(() => {
		const scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			wrapper.clientWidth / wrapper.clientHeight,
			0.1,
			1000
		);
		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true
		});

		// Set pixel ratio for high resolution
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);

		// Add bright ambient light and hemisphere light for better illumination
		const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Brighter ambient light
		scene.add(ambientLight);

		const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5); // Add hemisphere light for even lighting
		hemisphereLight.position.set(0, 200, 0);
		scene.add(hemisphereLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Brighter directional light
		directionalLight.position.set(0, 50, 10).normalize(); // Light coming from the front
		scene.add(directionalLight);

		// Load and center the model
		const loader = new GLTFLoader();
		loader.load('/three/dimensional-bjorn.gltf', (gltf) => {
			const model = gltf.scene;
			scene.add(model);

			// Center the model
			const box = new THREE.Box3().setFromObject(model);
			const size = box.getSize(new THREE.Vector3());
			const center = box.getCenter(new THREE.Vector3());

			model.position.set(-center.x, -center.y, -center.z);

			camera.position.z = size.length() * 0.7; // Move the camera back to fit the model in view
			camera.position.y = 12;

			const controls = new OrbitControls(camera, renderer.domElement);
			controls.target.set(0, 0, 0); // Set the controls to orbit around the center of the model
			controls.enableDamping = true; // Enable damping (inertia)
			controls.dampingFactor = 0.05; // Damping factor
			controls.autoRotate = true; // Enable auto-rotation
			controls.autoRotateSpeed = rotationSpeed; // Set initial rotation speed

			function animate() {
				requestAnimationFrame(animate);

				// Gradually slow down the rotation
				if (rotationSpeed > 50) {
					rotationSpeed -= deceleration;
					controls.autoRotateSpeed = rotationSpeed;
				} else {
					rotationSpeed = 0; // Ensure it doesn't go negative
					controls.autoRotate = false; // Stop auto-rotation when speed reaches zero
				}

				controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true
				renderer.render(scene, camera);
			}

			animate();
		});
	});

	$effect(() => {
		function onWindowResize() {
			canvasSize = { width: wrapper.clientWidth, height: wrapper.clientHeight };
			renderer.setSize(canvasSize.width, canvasSize.height);
			camera.aspect = canvasSize.width / canvasSize.height;
			camera.updateProjectionMatrix();
		}

		window.addEventListener('resize', onWindowResize);
		onWindowResize(); // Call initially to set the canvas size

		return () => window.removeEventListener('resize', onWindowResize);
	});

	$effect(() => {
		if (canvasSize.width && canvasSize.height) {
			renderer.setSize(canvasSize.width, canvasSize.height);
			camera.aspect = canvasSize.width / canvasSize.height;
			camera.updateProjectionMatrix();
		}
	});
</script>

<div class="flex h-full w-full items-center justify-center">
	<div bind:this={wrapper} class="h-[30vh] w-4/5">
		<canvas bind:this={canvas} class="h-full w-full"></canvas>
	</div>
</div>

<style>
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
