<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { DimensionalBjornMode } from '../../utils/enums'; // Adjust the path as needed

	// State variables
	let canvas = $state<HTMLCanvasElement | null>(null);
	let center = $state(new THREE.Vector3());
	let canvasSize = $state({ width: 0, height: 0 });

	// Get props using $props rune
	let {
		mode = DimensionalBjornMode.background
	}: { mode: DimensionalBjornMode } = $props();

	// Derived settings based on mode and center
	let settings = $derived.by(() => {
		switch (mode) {
			case DimensionalBjornMode.background:
				return {
					rotationSpeed: 0.01,
					minRotationSpeed: 0.002,
					deceleration: 0.0001,
					ambientLightIntensity: 0.5,
					directionalLightIntensity: 3,
					directionalLightPosition: new THREE.Vector3(10, 20, 60),
					cameraPosition: new THREE.Vector3(center.x, center.y + 12, center.z),
					modelPositionFactor: 0.5
				};
			case DimensionalBjornMode.box:
				return {
					rotationSpeed: 1,
					minRotationSpeed: 0.01,
					deceleration: 0.01,
					ambientLightIntensity: 2,
					directionalLightIntensity: 2,
					directionalLightPosition: new THREE.Vector3(0, 50, 10),
					cameraPosition: new THREE.Vector3(
						center.x,
						center.y + 12,
						center.z + 70
					),
					modelPositionFactor: 1
				};
			default:
				throw new Error('Invalid DimensionalBjorn mode');
		}
	});

	// Variables for Three.js objects
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let pivot: THREE.Group;
	let controls: OrbitControls;

	// Initialize Three.js scene
	function initThreeJS() {
		const scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(
			75,
			(canvas?.clientWidth ?? 1) / (canvas?.clientHeight ?? 1),
			0.1,
			1000
		);

		renderer = new THREE.WebGLRenderer({
			canvas: canvas ?? undefined,
			alpha: true,
			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas?.clientWidth ?? 0, canvas?.clientHeight ?? 0);
		renderer.shadowMap.enabled = true;

		// Add lights to the scene
		const ambientLight = new THREE.AmbientLight(
			0xffffff,
			settings.ambientLightIntensity
		);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(
			0xffffff,
			settings.directionalLightIntensity
		);
		directionalLight.position.set(
			settings.directionalLightPosition.x,
			settings.directionalLightPosition.y,
			settings.directionalLightPosition.z
		);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 2048;
		directionalLight.shadow.mapSize.height = 2048;
		directionalLight.shadow.camera.near = 0.5;
		directionalLight.shadow.camera.far = 500;
		scene.add(directionalLight);

		// Load the GLTF model
		const loader = new GLTFLoader();
		loader.load(
			'/three/dimensional-bjorn.gltf',
			(gltf) => {
				const model = gltf.scene;
				model.traverse((node) => {
					node.castShadow = true;
					node.receiveShadow = true;
				});

				// Create pivot and add model to the scene
				pivot = new THREE.Group();
				scene.add(pivot);
				pivot.add(model);

				// Compute the center of the model
				const box = new THREE.Box3().setFromObject(model);
				const modelCenter = box.getCenter(new THREE.Vector3());

				center = modelCenter;

				// Adjust model position
				model.position.set(-center.x, -center.y, -center.z);

				// Set camera position and controls
				camera.position.copy(settings.cameraPosition);
				camera.lookAt(center);

				// Initialize OrbitControls
				controls = new OrbitControls(camera, renderer.domElement);
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;

				// Animation loop
				function animate() {
					requestAnimationFrame(animate);
					controls.update();

					// Rotate the pivot group around its Y-axis
					pivot.rotation.y += settings.rotationSpeed;

					// Slow down the rotation gradually
					if (settings.rotationSpeed > settings.minRotationSpeed) {
						settings.rotationSpeed -= settings.deceleration;
						if (settings.rotationSpeed < settings.minRotationSpeed) {
							settings.rotationSpeed = settings.minRotationSpeed;
						}
					}

					renderer.render(scene, camera);
				}

				animate();
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the model:', error);
			}
		);
	}

	// Handle window resize
	function onWindowResize() {
		canvasSize.width = canvas?.clientWidth ?? 0;
		canvasSize.height = canvas?.clientHeight ?? 0;

		if (renderer && camera) {
			renderer.setSize(canvasSize.width, canvasSize.height);
			camera.aspect = canvasSize.width / canvasSize.height;
			camera.updateProjectionMatrix();
		}
	}

	// Svelte lifecycle hooks
	onMount(() => {
		initThreeJS();
		window.addEventListener('resize', onWindowResize);
		onWindowResize(); // Initial call to set the canvas size
		return () => window.removeEventListener('resize', onWindowResize);
	});

	$effect(() => {
		if (canvasSize.width && canvasSize.height && renderer && camera) {
			renderer.setSize(canvasSize.width, canvasSize.height);
			camera.aspect = canvasSize.width / canvasSize.height;
			camera.updateProjectionMatrix();
		}
	});
</script>

<canvas
	bind:this={canvas}
	class=" m-auto {mode === DimensionalBjornMode.background
		? 'h-full w-full opacity-25'
		: 'h-[33vh] w-3/4'}"
></canvas>

<style>
	canvas {
		display: block;
	}
</style>
