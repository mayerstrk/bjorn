<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { DimensionalBjornMode } from '../../utils/enums'; // Ensure this path is correct for enum import

	// State variables for canvas reference and center position of the 3D model
	let canvas = $state<HTMLCanvasElement | null>(null);
	let center = $state(new THREE.Vector3());

	// Props initialization with default values; extend DimensionalBjornMode enum as needed
	let {
		mode = DimensionalBjornMode.background
	}: { mode: DimensionalBjornMode } = $props();

	// Settings for 3D rendering based on mode; adjust or add new modes with corresponding settings
	let settings: {
		rotationSpeed: number;
		minRotationSpeed: number;
		ambientLightIntensity: number;
		directionalLightIntensity: number;
		directionalLightPosition: THREE.Vector3;
		cameraPosition: THREE.Vector3;
		modelPositionFactor: number;
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
				modelPositionFactor: 0.5
			};
			break;
		case DimensionalBjornMode.box:
			settings = {
				rotationSpeed: 2,
				minRotationSpeed: 0.01,
				ambientLightIntensity: 2,
				directionalLightIntensity: 2,
				directionalLightPosition: new THREE.Vector3(-20, 70, 100),
				cameraPosition: new THREE.Vector3(150, 60, 0),
				modelPositionFactor: 1
			};
			break;
		default:
			throw new Error('Invalid DimensionalBjorn mode'); // Robust handling of undefined modes
	}

	// Three.js renderer, camera, pivot for model, and controls setup
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.PerspectiveCamera;
	let pivot: THREE.Group;
	let controls: OrbitControls;

	// Calculate the decay factor for slowing down rotation over time
	const decayFactor = Math.pow(
		settings.minRotationSpeed / settings.rotationSpeed,
		1 / 60
	);

	// Initialize the Three.js scene and configure lighting, model loading, and controls
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
			alpha: true, // Enables canvas transparency
			antialias: true // Improves visual quality by smoothing jagged edges
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas?.clientWidth ?? 0, canvas?.clientHeight ?? 0);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// Lighting setup: ambient and directional with shadow configuration
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
		scene.add(directionalLight);

		// Shadow-receiving ground plane setup
		const planeGeometry = new THREE.PlaneGeometry(500, 500);
		const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotation.x = -Math.PI / 2;
		plane.receiveShadow = true;
		scene.add(plane);

		// GLTF model loading with shadow casting configuration
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

				pivot = new THREE.Group();
				scene.add(pivot);
				pivot.add(model);

				const box = new THREE.Box3().setFromObject(model);
				const modelCenter = box.getCenter(new THREE.Vector3());
				const modelHeight = box.getSize(new THREE.Vector3()).y;

				center = modelCenter;
				model.position.set(-center.x, -center.y, -center.z);
				plane.position.y = -modelHeight / 2 - 1;

				camera.position.set(
					settings.cameraPosition.x,
					settings.cameraPosition.y,
					settings.cameraPosition.z
				);
				camera.lookAt(center);

				pivot.rotation.y = Math.PI; // Initial rotation to face front

				controls = new OrbitControls(camera, renderer.domElement);
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;

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

				animate();
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

	// Ensure canvas responsiveness to window resizing
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
		return () => window.removeEventListener('resize', onWindowResize);
	});
</script>

<canvas bind:this={canvas} class="h-full w-full"></canvas>
