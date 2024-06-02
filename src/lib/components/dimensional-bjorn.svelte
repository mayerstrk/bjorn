<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { DimensionalBjornMode } from '../../utils/enums'; // Adjust the path as needed
	import { DoubleBounce } from 'svelte-loading-spinners';

	// State variables
	let canvas = $state<HTMLCanvasElement | null>(null);
	let center = $state(new THREE.Vector3());
	let isLoading = $state(true);

	// Get props using $props rune
	let {
		mode = DimensionalBjornMode.background
	}: { mode: DimensionalBjornMode } = $props();

	const settings = getSettings(mode);

	function getSettings(mode: DimensionalBjornMode) {
		// Derived settings based on mode and center
		let settings: {
			rotationSpeed: number;
			minRotationSpeed: number;
			ambientLightIntensity: number;
			directionalLightIntensity: number;
			directionalLightPosition: THREE.Vector3;
			cameraPosition: THREE.Vector3;
			castShadow: boolean;
			useLoadingAnimation: boolean;
		};

		switch (mode) {
			case DimensionalBjornMode.background:
				settings = {
					rotationSpeed: 0.01,
					minRotationSpeed: 0.001,
					ambientLightIntensity: 0.5,
					directionalLightIntensity: 3,
					directionalLightPosition: new THREE.Vector3(10, 20, 60),
					cameraPosition: new THREE.Vector3(70, 40, 0),
					castShadow: false,
					useLoadingAnimation: false
				};
				break;
			case DimensionalBjornMode.box:
				settings = {
					rotationSpeed: 2,
					minRotationSpeed: 0.003,
					ambientLightIntensity: 0.6,
					directionalLightIntensity: 2.4,
					directionalLightPosition: new THREE.Vector3(-5, 70, 100),
					cameraPosition: new THREE.Vector3(200, 80, 0),
					castShadow: true,
					useLoadingAnimation: true
				};
				break;
			default:
				throw new Error('Invalid DimensionalBjorn mode');
		}

		return settings;
	}

	// Variables for Three.js objects
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let pivot: THREE.Group;
	let controls: OrbitControls;

	// Calculate the decay factor for decceleration
	const decayFactor = Math.pow(
		settings.minRotationSpeed / settings.rotationSpeed,
		1 / 160
	);

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
			alpha: true, // Make the canvas transparent
			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas?.clientWidth ?? 0, canvas?.clientHeight ?? 0);

		if (settings.castShadow) {
			renderer.shadowMap.enabled = settings.castShadow;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		}

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

		if (settings.castShadow) {
			// Adjust shadow camera settings
			const d = 100;
			directionalLight.shadow.camera.left = -d;
			directionalLight.shadow.camera.right = d;
			directionalLight.shadow.camera.top = d;
			directionalLight.shadow.camera.bottom = -d;
			directionalLight.shadow.camera.near = 0.5;
			directionalLight.shadow.camera.far = 500;
			scene.add(directionalLight);
		}

		// Load the GLTF model
		const loader = new GLTFLoader();
		loader.load(
			'/three/dimensional-bjorn.gltf',
			(gltf) => {
				const model = gltf.scene;
				model.traverse((node) => {
					if (node instanceof THREE.Mesh) {
						node.castShadow = true;
						node.receiveShadow = true;
					}
				});

				// Create pivot and add model to the scene
				pivot = new THREE.Group();
				scene.add(pivot);
				pivot.add(model);

				// Compute the center of the model and the bounding box
				const box = new THREE.Box3().setFromObject(model);
				const modelCenter = box.getCenter(new THREE.Vector3());

				center = modelCenter;

				if (settings.castShadow) {
					// Create a plane to receive shadows
					const planeGeometry = new THREE.PlaneGeometry(500, 500);
					const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
					const plane = new THREE.Mesh(planeGeometry, planeMaterial);
					plane.rotation.x = -Math.PI / 2;
					plane.receiveShadow = true;
					scene.add(plane);
					const modelHeight = box.getSize(new THREE.Vector3()).y;
					// Position the plane just below the model
					plane.position.y = -modelHeight / 2 - 1;
				}

				// Adjust model position
				model.position.set(-center.x, -center.y, -center.z);

				// Set camera position and controls
				camera.position.set(
					settings.cameraPosition.x,
					settings.cameraPosition.y,
					settings.cameraPosition.z
				);
				camera.lookAt(center);

				// Set initial rotation to face the front
				pivot.rotation.y = Math.PI;

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

					// Gradual deceleration
					settings.rotationSpeed *= decayFactor;
					if (settings.rotationSpeed < settings.minRotationSpeed) {
						settings.rotationSpeed = settings.minRotationSpeed;
					}

					renderer.render(scene, camera);
				}

				animate();
				isLoading = false;
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the model:', error);
			}
		);
	}

	onMount(() => {
		initThreeJS();
	});

	// Resize handler to make the canvas responsive
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
		onWindowResize(); // Call initially to set the canvas size
		return () => window.removeEventListener('resize', onWindowResize);
	});
	console.log('ran');
</script>

{#if settings.useLoadingAnimation}
	<div class="flex h-56 items-center justify-center {!isLoading && 'hidden'}">
		<DoubleBounce color="#fff" size="35" />
	</div>
{/if}

<canvas bind:this={canvas} class="h-full w-full"></canvas>
