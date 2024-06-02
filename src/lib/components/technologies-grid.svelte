<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	interface HexagonNode {
		title: string;
		description: string;
		link: string;
		category: string;
	}

	const hexagonData: HexagonNode[] = [
		// Frontend
		{
			title: 'D3',
			description:
				'A JavaScript library for manipulating documents based on data using HTML, SVG, and CSS.',
			link: 'https://d3js.org/',
			category: 'Frontend'
		},
		{
			title: 'Three.js',
			description:
				'A cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser.',
			link: 'https://threejs.org/',
			category: 'Frontend'
		},
		{
			title: 'Svelte',
			description:
				'A component-based JavaScript framework that shifts the work of building a web app to the compile step, resulting in highly optimized vanilla JavaScript.',
			link: 'https://svelte.dev/',
			category: 'Frontend'
		},
		{
			title: 'Remix',
			description:
				'A React-based framework for server-rendered applications with a focus on web standards and modern UX.',
			link: 'https://remix.run/',
			category: 'Frontend'
		},
		{
			title: 'React',
			description:
				'A JavaScript library for building user interfaces, maintained by Facebook and a community of developers.',
			link: 'https://reactjs.org/',
			category: 'Frontend'
		},
		{
			title: 'React Native',
			description:
				'A framework for building native apps using React, allowing for application development on both iOS and Android using JavaScript.',
			link: 'https://reactnative.dev/',
			category: 'Frontend'
		},
		{
			title: 'Tailwind',
			description:
				'A utility-first CSS framework for rapidly building custom user interfaces with low-level, highly composable classes.',
			link: 'https://tailwindcss.com/',
			category: 'Frontend'
		},

		// Backend
		{
			title: 'Actix Web',
			description:
				'A powerful, pragmatic, and extremely fast web framework for Rust, using Actix actors for concurrent handling.',
			link: 'https://actix.rs/',
			category: 'Backend'
		},
		{
			title: 'Node',
			description:
				"A JavaScript runtime built on Chrome's V8 engine, enabling non-blocking, event-driven server-side JavaScript development.",
			link: 'https://nodejs.org/',
			category: 'Backend'
		},
		{
			title: 'PostgreSQL',
			description:
				'An advanced, enterprise-class, and open-source relational database system supporting both SQL and JSON querying.',
			link: 'https://www.postgresql.org/',
			category: 'Backend'
		},
		{
			title: 'MongoDB',
			description:
				'A NoSQL database built for modern applications, providing flexible schema design and horizontal scalability.',
			link: 'https://www.mongodb.com/',
			category: 'Backend'
		},
		{
			title: 'Mongoose',
			description:
				'An ODM (Object Data Modeling) library for MongoDB and Node.js, providing schema-based solutions to model your application data.',
			link: 'https://mongoosejs.com/',
			category: 'Backend'
		},
		{
			title: 'RTK Query',
			description:
				'A data-fetching and caching tool built on Redux Toolkit, providing powerful tools for managing server state in a React application.',
			link: 'https://redux-toolkit.js.org/rtk-query/overview',
			category: 'Backend'
		},
		{
			title: 'Zustand',
			description:
				'A fast and scalable state-management solution for React, using simplified Flux principles with a minimal API.',
			link: 'https://zustand.surge.sh/',
			category: 'Backend'
		},

		// Other
		{
			title: 'Docker',
			description:
				'A platform for developing, shipping, and running applications using containerization technology.',
			link: 'https://www.docker.com/',
			category: 'Other'
		},
		{
			title: 'NGINX',
			description:
				'A high-performance HTTP server and reverse proxy, as well as an IMAP/POP3 proxy server.',
			link: 'https://www.nginx.com/',
			category: 'Other'
		},
		{
			title: 'Vercel',
			description:
				'A platform for frontend frameworks and static sites, built to integrate with headless content management systems, ecommerce, and other APIs.',
			link: 'https://vercel.com/',
			category: 'Other'
		},
		{
			title: 'Heroku',
			description:
				'A cloud platform that lets companies build, deliver, monitor, and scale apps in several programming languages.',
			link: 'https://www.heroku.com/',
			category: 'Other'
		},
		{
			title: 'GitLab',
			description:
				'A web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking, and CI/CD pipeline features.',
			link: 'https://about.gitlab.com/',
			category: 'Other'
		}
	];

	let hexagonSvgElement: SVGSVGElement;
	const svgWidth = 800; // Adjust width as needed
	const svgHeight = 600; // Adjust height as needed
	const hexagonRadius = 50;
	const hexagonWidth = Math.sqrt(3) * hexagonRadius;
	const hexagonHeight = 2 * hexagonRadius;

	/**
	 * Creates the points for a hexagon centered at (centerX, centerY)
	 */
	const generateHexagonPoints = (centerX: number, centerY: number) => {
		const angleIncrement = Math.PI / 3; // 60 degrees in radians
		return d3
			.range(6)
			.map((vertexIndex: number) => [
				centerX + hexagonRadius * Math.cos(vertexIndex * angleIncrement),
				centerY + hexagonRadius * Math.sin(vertexIndex * angleIncrement)
			]);
	};

	onMount(() => {
		// Select the SVG element and set its dimensions
		const svgSelection = d3
			.select<SVGSVGElement, unknown>(hexagonSvgElement)
			.attr('width', svgWidth)
			.attr('height', svgHeight)
			.append('g')
			// Center the group within the SVG
			.attr(
				'transform',
				`translate(${svgWidth / 4 - hexagonWidth},${svgHeight / 2.2 - hexagonHeight})`
			);

		hexagonData.forEach((data, i) => {
			const row = Math.floor(i / 4);
			const col = i % 4;
			let centerX = col * hexagonWidth * 1.8;
			let centerY = (row * hexagonHeight) / 2.2;

			// Offset every other row by half the width of a hexagon
			if (row % 2 === 1) {
				centerX += hexagonWidth * 0.9;
			}

			const hexagonPoints = generateHexagonPoints(centerX, centerY);

			// Append the hexagon shape
			svgSelection
				.append('polygon')
				.attr('points', hexagonPoints.map((point) => point.join(',')).join(' '))
				.attr('stroke', 'black')
				.attr('fill', 'lightblue'); // Customize the color here

			// Append the title text
			svgSelection
				.append('text')
				.attr('x', centerX)
				.attr('y', centerY + 5)
				.attr('text-anchor', 'middle')
				.attr('font-size', '14px') // Customize font size
				.text(data.title);
		});
	});
</script>

<svg bind:this={hexagonSvgElement} class="w-full border border-red-600"></svg>
