<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { DimensionalBjornMode } from '../../utils/enums';

	// State variables
	let canvas = $state<HTMLCanvasElement | null>(null);
	let center = $state(new THREE.Vector3());
	let isLoading = $state(true);

	let {
		mode = DimensionalBjornMode.background
	}: { mode: DimensionalBjornMode } = $props();

	const settings = getSettings(mode);

	function getSettings(mode: DimensionalBjornMode) {
		switch (mode) {
			case DimensionalBjornMode.background:
				return {
					rotationSpeed: 0.01,
					minRotationSpeed: 0.001,
					ambientLightIntensity: 0.5,
					directionalLightIntensity: 3,
					directionalLightPosition: new THREE.Vector3(10, 20, 60),
					cameraPosition: new THREE.Vector3(70, 40, 0),
					castShadow: false,
					useLoadingAnimation: false
				};
			case DimensionalBjornMode.box:
				return {
					rotationSpeed: 2,
					minRotationSpeed: 0.003,
					ambientLightIntensity: 0.6,
					directionalLightIntensity: 2.4,
					directionalLightPosition: new THREE.Vector3(-5, 70, 100),
					cameraPosition: new THREE.Vector3(200, 80, 0),
					castShadow: true,
					useLoadingAnimation: true
				};
			default:
				throw new Error('Invalid DimensionalBjorn mode');
		}
	}

	// Variables for Three.js objects
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let pivot: THREE.Group;
	let controls: OrbitControls;

	// Declare 'scene' at the top-level scope
	let scene: THREE.Scene;

	const decayFactor = Math.pow(
		settings.minRotationSpeed / settings.rotationSpeed,
		1 / 160
	);

	// Initialize Three.js scene
	async function initThreeJS() {
		scene = new THREE.Scene(); // Initialize 'scene' here

		camera = new THREE.PerspectiveCamera(
			75,
			(canvas?.clientWidth ?? 1) / (canvas?.clientHeight ?? 1),
			0.1,
			1000
		);

		renderer = new THREE.WebGLRenderer({
			canvas: canvas ?? undefined,
			alpha: true, // Consider setting alpha to false if the background can be solid
			antialias: false // Disabling antialiasing can improve performance
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas?.clientWidth ?? 0, canvas?.clientHeight ?? 0);

		if (settings.castShadow) {
			renderer.shadowMap.enabled = settings.castShadow;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		}

		// Lights
		const ambientLight = new THREE.AmbientLight(
			0xffffff,
			settings.ambientLightIntensity
		);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(
			0xffffff,
			settings.directionalLightIntensity
		);
		directionalLight.position.copy(settings.directionalLightPosition);
		directionalLight.castShadow = settings.castShadow;

		if (settings.castShadow) {
			// Shadow camera settings optimization
			const d = 100;
			Object.assign(directionalLight.shadow.camera, {
				left: -d,
				right: d,
				top: d,
				bottom: -d,
				near: 0.5,
				far: 500
			});
			scene.add(directionalLight);
		}

		// Load GLTF model
		const loader = new GLTFLoader();
		loader.load(
			'/three/dimensional-bjorn.gltf',
			(gltf) => {
				const model = gltf.scene;
				model.traverse((node) => {
					if (node instanceof THREE.Mesh) {
						node.castShadow = settings.castShadow;
						node.receiveShadow = settings.castShadow;
					}
				});

				pivot = new THREE.Group();
				scene.add(pivot);
				pivot.add(model);

				const box = new THREE.Box3().setFromObject(model);
				center = box.getCenter(new THREE.Vector3());

				if (settings.castShadow) {
					const planeGeometry = new THREE.PlaneGeometry(500, 500);
					const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
					const plane = new THREE.Mesh(planeGeometry, planeMaterial);
					plane.rotation.x = -Math.PI / 2;
					plane.receiveShadow = true;
					scene.add(plane);

					plane.position.y = -box.getSize(new THREE.Vector3()).y / 2 - 1;
				}

				model.position.set(-center.x, -center.y, -center.z);

				camera.position.copy(settings.cameraPosition);
				camera.lookAt(center);

				pivot.rotation.y = Math.PI;

				// Initialize OrbitControls
				controls = new OrbitControls(camera, renderer.domElement);
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;

				// Start the animation loop
				requestAnimationFrame(animate);
				isLoading = false;
			},
			undefined,
			(error) => {
				console.error('Error loading the model:', error);
			}
		);
	}

	function animate() {
		requestAnimationFrame(animate);

		controls.update();
		pivot.rotation.y += settings.rotationSpeed;

		settings.rotationSpeed *= decayFactor;
		if (settings.rotationSpeed < settings.minRotationSpeed) {
			settings.rotationSpeed = settings.minRotationSpeed;
		}

		renderer.render(scene, camera);
	}

	onMount(initThreeJS);

	// Resize handler for responsiveness
	$effect(() => {
		function onWindowResize() {
			if (canvas) {
				const width = canvas.parentElement?.clientWidth ?? 0;
				const height = canvas.parentElement?.clientHeight ?? 0;
				renderer.setSize(width, height);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			}
		}
		window.addEventListener('resize', onWindowResize);
		onWindowResize();
		return () => window.removeEventListener('resize', onWindowResize);
	});
</script>

{#if settings.useLoadingAnimation}
	<div class="flex w-full items-center justify-center {!isLoading && 'hidden'}">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-loader-circle animate-spin"
			><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
		>
	</div>
{/if}
<canvas bind:this={canvas} class="z-0 w-full"> </canvas>
