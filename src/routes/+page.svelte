<script lang="ts">
	import { onMount } from 'svelte';
	import DimensionalBjorn from '$lib/components/dimensional-bjorn.svelte';

	let showMore = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function toggleShowMore() {
		showMore = !showMore;
	}
</script>

<svelte:head>
	<title>Mayer Starkman - Software Engineer</title>
	<meta
		name="description"
		content="Mayer Starkman - Software and Network Engineer, Product Lead and Designer based in Tel-Aviv"
	/>
</svelte:head>

<main>
	<section class="section" id="root-hero">
		<div
			id="root-hero-dimensional-bjorn-wrapper"
			class="-z-5 h-[30vh] bg-transparent"
		>
			{#if mounted}
				<DimensionalBjorn />
			{/if}
		</div>
		<p
			id="root-hero-introduction"
			class="block-stone-300 w-full px-1 py-3 text-center font-mono text-sm font-medium lg:w-4/5 lg:text-base"
		>
			Hey, I'm a software engineer based in Tel-Aviv
		</p>
		<div
			id="root-hero-main"
			class="duration-2000 animation-1000 flex animate-fade-in-up flex-row items-center justify-center gap-6 py-4 opacity-0 sm:flex-row md:gap-14"
		>
			<div
				id="root-hero-text"
				class="items-middle flex w-full flex-col md:w-auto"
			>
				<h1
					class="text-2xl font-bold leading-tight sm:text-[48px] lg:text-[60px]"
				>
					Mayer Starkman
				</h1>
				<p>Software and Network Engineer, Product Lead and Designer</p>
			</div>
			<div
				id="root-hero-image-wrapper"
				class="relative box-content size-[110px] min-w-[110px] overflow-hidden rounded-full border-8 border-double border-cyan-300 md:size-[13%]"
			>
				<div
					id="root-hero-image-overlay"
					class="absolute inset-0 w-full bg-gradient-to-br from-red-700 to-cyan-700"
				></div>
				<enhanced:img
					class="w-full rounded-full opacity-70"
					src="../../static/images/me.webp"
					sizes="(max-width: 117px) 110px,
           13vw"
					alt="A picture of Mayer Starkman"
					loading="lazy"
				></enhanced:img>
			</div>
		</div>
		<p id="root-hero-about-me" class="m-auto max-w-[900px] py-2">
			&nbsp;&nbsp;&nbsp;&nbsp;I am passionate about designing and building
			efficient, <span class="underline underline-offset-4">simple</span>
			systems that look good and are easy to use - from drawing up process diagrams,
			UX design and infrastructure provisioning, all the way to running pilots and
			handling subsequent feature requests and code-base maintenance. Crafting apps
			that offer an incredible experience for both developers and users and optimizing
			for <span class="underline underline-offset-4">performance</span> is
			something I find truly rewarding.
			<span class="opacity-0 transition-opacity hover:opacity-100">
				I don't want JS on the backend :)</span
			>
		</p>
	</section>

	<section class="section">
		<h3 class="text-lg font-black underline underline-offset-8">
			&nbsp;Experience&nbsp;
		</h3>
		<div class="block-stone-300 relative p-5 pb-16 md:p-10 md:pb-12">
			<span class="code-line-pink text-white">IDF</span>&nbsp;&nbsp;&nbsp;I was
			given the opportunity to
			<span class="font-bold">lead a new department</span>
			focused on digitizing and visualizing business processes, where I
			<span class="font-bold">engineered two cross-platform applications</span>
			that are currently active in production. In addition to providing a digital
			interface for the branches' business processes the applications would collect
			activity data and implement automation and data pipelines to support data-driven
			decision-making through comprehensive dashboards. Eventually, I also recruited,
			mentored, and managed a dedicated team of developers, maintaining high standards
			of code quality and performance.
			{#if showMore}
				<span class="mt-4 block font-light">
					The core of our development work was understanding the specific
					processes of our organization and our focus was engineering systems
					that enhance and automate their workflows to increase operational
					efficiency. We specialized in creating solutions that strategically
					collect, analyze, and visualize data to provide insights and improve
					decision-making.
				</span>
				<span class="mt-4 block font-light"
					>Clearly defined user stories, designed Business Process Diagrams and
					planned database infrastructure
				</span>
				<span class="mt-4 block font-light"
					>I was actively involved in educating new recruits about our
					technology stack, ensuring they are well-equipped and knowledgeable
					for their roles after my departure.
				</span>
			{/if}
			<button
				class="absolute bottom-5 right-5 flex items-center justify-center rounded-full bg-white p-1 text-xs text-black hover:text-blue-700"
				onclick={toggleShowMore}
			>
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
					class="lucide {showMore
						? 'lucide-chevron-up'
						: 'lucide-chevron-down'}"
				>
					<path d={showMore ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
				</svg>
			</button>
		</div>
		<div class="block-stone-300 relative p-5 md:p-10">
			<span class="code-line-pink text-white">IDF</span>&nbsp;&nbsp;&nbsp;<span
				class="font-bold">Supervised a department up to 20 soldiers</span
			>
			with different tiers and responsibilities. Our role consisted of administrating,
			maintaining and improving on-premises network infrastructure and over 400 work
			stations and servers as well as handling requests from organization members
			and handling logistics and stock with suppliers and vendors.

			<span class="mt-4 block font-light">
				Directed a comprehensive overhaul of network systems, significantly
				improving stability and performance across more than 400 workstations
				and servers.
			</span>
		</div>
		<div class="block-stone-300 relative p-5 md:p-10">
			<span class="code-line-pink text-white">IDF</span
			>&nbsp;&nbsp;&nbsp;Started as a network adminisrator and got
			<span class="font-bold">promoted to Team Leader within six months </span>
			due to leadership, technological proficiency and creative innitiatve.

			<span class="mt-4 block font-light"
				>Created documentation, automated departmental processes and developed
				SharePoint pages to ease interactions and information transfer within
				and between the branches.</span
			>
		</div>
	</section>

	<section class="section">
		<h3 class="text-lg font-black underline underline-offset-8">Details</h3>
		<h3 class="code-line">I flex:</h3>
		<ul class="ul">
			<li>I use vim btw</li>
			<li>I run linux btw</li>
		</ul>
	</section>

	<section class="section">
		<h3 class="code-line">languages I'm proficient in:</h3>
		<ul class="ul">
			<li>Typescript</li>
			<li>Rust</li>
			<li>Go</li>
		</ul>
	</section>

	<section class="section">
		<h3 class="code-line">Technical skills</h3>
		<ul class="ul">
			<li>Agile Project Management</li>
			<li>D3</li>
			<li>Three.js</li>
			<li>Actix Web</li>
			<li>Docker</li>
			<li>NGINX</li>
			<li>Vercel</li>
			<li>Heroku</li>
			<li>Gitlab</li>
			<li>Svelte</li>
			<li>Remix</li>
			<li>React</li>
			<li>React Native</li>
			<li>RTK Query</li>
			<li>Zuztand</li>
			<li>Tailwind</li>
			<li>Node</li>
			<li>PostgreSQL</li>
			<li>MongoDB</li>
			<li>Mongoose</li>
		</ul>
	</section>
</main>

<style>
	.section {
		@apply m-auto mb-7 flex w-full max-w-[900px] flex-col gap-4;
	}

	.ul {
		@apply list-disc pl-8;
	}
</style>
