<script lang="ts">
	import DimensionalBjorn from '../lib/components/dimensional-bjorn.svelte';

	let showMore = $state(false);

	function toggleShowMore() {
		showMore = !showMore;
	}

	// List of technical skills for efficient rendering
	const technicalSkills = [
		'Agile Project Management',
		'D3',
		'Three.js',
		'Actix Web',
		'Docker',
		'NGINX',
		'Vercel',
		'Heroku',
		'Gitlab',
		'Svelte',
		'Remix',
		'React',
		'React Native',
		'RTK Query',
		'Zustand',
		'Tailwind',
		'Node',
		'PostgreSQL',
		'MongoDB',
		'Mongoose'
	];

	// Languages proficient in
	const languages = ['Typescript', 'Rust', 'Go'];
</script>

<section class="section" id="root-hero">
	<div
		id="root-hero-dimensional-bjorn-wrapper"
		class="-z-5 h-[30vh] bg-transparent"
	>
		<DimensionalBjorn />
	</div>
	<p
		id="root-hero-introduction"
		class="block-stone-300 w-full px-1 py-3 text-center font-mono text-sm font-medium lg:w-4/5 lg:text-base"
	>
		Hey, I'm a software engineer based in Tel-Aviv
	</p>
	<div
		id="root-hero-main"
		class="flex animate-fade-in-up flex-row items-center justify-center gap-6 py-4 sm:flex-row md:gap-14"
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
			<img
				class="w-full rounded-full opacity-70"
				src="/images/me.webp"
				srcset="/images/me-small.webp 300w, /images/me.webp 600w"
				sizes="(max-width: 600px) 300px, 600px"
				width="600"
				height="600"
				alt="Mayer Starkman"
				loading="lazy"
			/>
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
		that are currently active in production. In addition to providing a digital interface
		for the branches' business processes the applications would collect activity
		data and implement automation and data pipelines to support data-driven decision-making
		through comprehensive dashboards. Eventually, I also recruited, mentored, and
		managed a dedicated team of developers, maintaining high standards of code quality
		and performance.
		{#if showMore}
			<span class="mt-4 block font-light">
				The core of our development work was understanding the specific
				processes of our organization and our focus was engineering systems that
				enhance and automate their workflows to increase operational efficiency.
				We specialized in creating solutions that strategically collect,
				analyze, and visualize data to provide insights and improve
				decision-making.
			</span>
			<span class="mt-4 block font-light"
				>Clearly defined user stories, designed Business Process Diagrams and
				planned database infrastructure
			</span>
			<span class="mt-4 block font-light"
				>I was actively involved in educating new recruits about our technology
				stack, ensuring they are well-equipped and knowledgeable for their roles
				after my departure.
			</span>
		{/if}
		<button
			class="absolute bottom-5 right-5 flex items-center justify-center rounded-full bg-white p-1 text-xs text-black hover:text-blue-700"
			onclick={toggleShowMore}
		>
			{#if showMore}
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
				>
					<path d="m18 15-6-6-6 6" />
				</svg>
			{:else}
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
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			{/if}
		</button>
	</div>
	<div class="block-stone-300 relative p-5 md:p-10">
		<span class="code-line-pink text-white">IDF</span>&nbsp;&nbsp;&nbsp;<span
			class="font-bold">Supervised a department up to 20 soldiers</span
		>
		with different tiers and responsibilities. Our role consisted of administrating,
		maintaining and improving on-premises network infrastructure and over 400 work
		stations and servers as well as handling requests from organization members and
		handling logistics and stock with suppliers and vendors.

		<span class="mt-4 block font-light">
			Directed a comprehensive overhaul of network systems, significantly
			improving stability and performance across more than 400 workstations and
			servers.
		</span>
	</div>
	<div class="block-stone-300 relative p-5 md:p-10">
		<span class="code-line-pink text-white">IDF</span>&nbsp;&nbsp;&nbsp;Started
		as a network administrator and got
		<span class="font-bold">promoted to Team Leader within six months </span>
		due to leadership, technological proficiency and creative initiative.

		<span class="mt-4 block font-light"
			>Created documentation, automated departmental processes and developed
			SharePoint pages to ease interactions and information transfer within and
			between the branches.</span
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
		{#each languages as language}
			<li>{language}</li>
		{/each}
	</ul>
</section>

<section class="section">
	<h3 class="code-line">Technical skills</h3>
	<ul class="ul">
		{#each technicalSkills as skill}
			<li>{skill}</li>
		{/each}
	</ul>
</section>

<style>
	.section {
		margin: auto;
		margin-bottom: 1.75rem;
		display: flex;
		width: 100%;
		max-width: 900px;
		flex-direction: column;
		gap: 1rem;
	}

	.ul {
		list-style-type: disc;
		padding-left: 2rem;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.5s ease-out;
	}
</style>
