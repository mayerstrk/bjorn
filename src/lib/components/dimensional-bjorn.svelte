<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// State variables
	let canvas = $state<HTMLCanvasElement | null>(null);
	let isLoading = $state(true);

	const settings = {
		rotationSpeed: 2,
		minRotationSpeed: 0.003,
		ambientLightIntensity: 0.6,
		directionalLightIntensity: 2.4,
		directionalLightPosition: { x: -5, y: 70, z: 100 },
		cameraPosition: { x: 200, y: 80, z: 0 },
		castShadow: true
	};

	// Calculate the decay factor for deceleration
	const decayFactor = Math.pow(
		settings.minRotationSpeed / settings.rotationSpeed,
		1 / 160
	);

	let cleanup: (() => void) | null = null;

	// Initialize Three.js scene
	async function initThreeJS() {
		const THREE = await import('three');
		const { GLTFLoader } = await import(
			'three/examples/jsm/loaders/GLTFLoader.js'
		);
		const { OrbitControls } = await import(
			'three/examples/jsm/controls/OrbitControls.js'
		);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			(canvas?.clientWidth ?? 1) / (canvas?.clientHeight ?? 1),
			0.1,
			1000
		);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvas ?? undefined,
			alpha: true,
			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas?.clientWidth ?? 0, canvas?.clientHeight ?? 0);
		renderer.shadowMap.enabled = settings.castShadow;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
		directionalLight.castShadow = settings.castShadow;
		directionalLight.shadow.mapSize.width = 2048;
		directionalLight.shadow.mapSize.height = 2048;
		const d = 100;
		directionalLight.shadow.camera.left = -d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = -d;
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
					if (node instanceof THREE.Mesh) {
						node.castShadow = settings.castShadow;
						node.receiveShadow = settings.castShadow;
					}
				});

				const pivot = new THREE.Group();
				scene.add(pivot);
				pivot.add(model);

				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());

				const planeGeometry = new THREE.PlaneGeometry(500, 500);
				const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
				const plane = new THREE.Mesh(planeGeometry, planeMaterial);
				plane.rotation.x = -Math.PI / 2;
				plane.receiveShadow = true;
				scene.add(plane);
				const modelHeight = box.getSize(new THREE.Vector3()).y;
				plane.position.y = -modelHeight / 2 - 1;

				model.position.set(-center.x, -center.y, -center.z);

				camera.position.set(
					settings.cameraPosition.x,
					settings.cameraPosition.y,
					settings.cameraPosition.z
				);
				camera.lookAt(center);

				pivot.rotation.y = Math.PI;

				const controls = new OrbitControls(camera, renderer.domElement);
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;

				let rotationSpeed = settings.rotationSpeed;

				function animate() {
					requestAnimationFrame(animate);
					controls.update();

					pivot.rotation.y += rotationSpeed;

					rotationSpeed *= decayFactor;
					if (rotationSpeed < settings.minRotationSpeed) {
						rotationSpeed = settings.minRotationSpeed;
					}

					renderer.render(scene, camera);
				}

				animate();
				isLoading = false;

				const resizeObserver = new ResizeObserver(() => {
					if (canvas) {
						const width = canvas.parentElement?.clientWidth ?? 0;
						const height = canvas.parentElement?.clientHeight ?? 0;
						renderer.setSize(width, height);
						camera.aspect = width / height;
						camera.updateProjectionMatrix();
					}
				});

				if (canvas?.parentElement) {
					resizeObserver.observe(canvas.parentElement);
				}

				cleanup = () => {
					resizeObserver.disconnect();
					renderer.dispose();
					controls.dispose();
				};
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the model:', error);
				isLoading = false;
			}
		);
	}

	onMount(() => {
		initThreeJS();
	});

	onDestroy(() => {
		if (cleanup) {
			cleanup();
		}
	});
</script>

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
	>
		<path d="M21 12a9 9 0 1 1-6.219-8.56" />
	</svg>
</div>
<canvas bind:this={canvas} class="z-0 w-full"> </canvas>
