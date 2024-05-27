<script lang="ts">
	import { onMount } from 'svelte';
	import DimensionalBjorn from '../lib/components/dimensional-bjorn.svelte';
	import { DimensionalBjornMode } from '../utils/enums';

	let showMore = $state(false);
	let isBoxVisible = $state(true);
	let boxWrapper = $state<HTMLElement | null>(null);

	function toggleShowMore() {
		showMore = !showMore;
	}

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			isBoxVisible = entry.isIntersecting;
		});
	}

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersection, {
			root: null,
			threshold: 0.1
		});

		if (boxWrapper) {
			observer.observe(boxWrapper);
		}

		return () => {
			if (boxWrapper) {
				observer.unobserve(boxWrapper);
			}
		};
	});
</script>

<div bind:this={boxWrapper} class="h-[25vh]">
	<DimensionalBjorn mode={DimensionalBjornMode.box} />
</div>
<div
	class="fixed left-0 z-[-200] h-full w-full transition-opacity duration-1000 {isBoxVisible
		? 'opacity-[1%]'
		: 'opacity-[17%]'}"
>
	<DimensionalBjorn mode={DimensionalBjornMode.background} />
</div>
<article class="flex flex-col gap-6 rounded-xl p-3 sm:gap-11 sm:p-20 lg:mx-20">
	<p class="block-stone-300 w-full text-center font-mono">
		Hey 👋 I'm Mayer, a software engineer based in Tel-Aviv 🚀
	</p>
	<section id="root-about-me">
		<h2 class="text-lg font-black underline underline-offset-8">About Me</h2>
		<p>
			&nbsp;&nbsp;&nbsp;&nbsp;I am passionate about designing and building
			efficient, <span class="underline underline-offset-4">simple</span>
			systems that look good and are easy to use - from user stories and process
			diagrams all the way to UX design, infrastructure provisioning, running pilots
			and handling subsequent feature requests and code-base maintenance. Crafting
			apps that offer an incredible experience for both developers and users and
			optimizing for performance is something I find truly rewarding.
			<span class="opacity-0 transition-opacity hover:opacity-100"
				>I don't want JS on the backend :)</span
			>
			<span class="opacity-0 transition-opacity hover:opacity-100">
				I don't want JS on the backend :)</span
			>
		</p>
	</section>
	<section>
		<h3 class="text-lg font-black underline underline-offset-8">Experience</h3>
		<div class="block-stone-300 relative z-[-200] font-mono font-bold">
			<span class="code-line-pink text-white">IDF</span>&nbsp; Was given the
			opportunity to open a department and recruit members to it. Our purpose
			was digitalizing and creating visualizations(BI) for day-to-day business
			processes and deploying branch and role specific mobile and web based
			applications that needed to interface.
			{#if showMore}
				<span class="mt-4 block font-light">
					I led a team of mobile and web developers in the Israeli Defence
					Forces. Our work involved understanding the specific processes of our
					organization and engineering systems that enhance and automate their
					workflows. We specialized in creating solutions that collect, analyze,
					and visualize data with the aim of improving decision-making. In
					addition to my development role, a significant part of my
					responsibilities involved studying our clients' business processes to
					create BPDs and plan database infrastructure to make sure we would
					implement the most appropriate technologies to our solutions.
					Moreover, I was actively involved in educating new recruits about our
					technology stack, ensuring they are well-equipped and knowledgeable
					for their roles after my departure.
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
						class="lucide lucide-chevron-up"
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
						class="lucide lucide-chevron-down"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				{/if}
			</button>
		</div>
		<div class="block-stone-300 relative font-mono font-bold">
			<span class="code-line-pink text-white">IDF</span>&nbsp; Started as a
			network manager and after 5 months became Team Leader of the IT
			department. The department consisted of up to 20 soldiers with different
			tiers and responsibilities. Our role consisted of administrating,
			maintaining and improving on-premises network infrastructure and over 400
			work stations and servers as well as handling requests from organization
			members and handling logtistics and stock with suppliers and vendors.
			{#if showMore}
				<span class="font-light">
					I led a team of mobile and web developers inthe Israeli Defence
					Forces. Our work involved understanding the specific processes of our
					organization and engineering systems that enhance and automate their
					workflows. We specialized in creating solutions that collect, analyze,
					and visualize data with the aim of improving decision-making. In
					addition to my development role, a significant part of my
					responsibilities involves studying our clients' business processes to
					create BPDs and plan database infrastructure to make sure we implement
					the most appropriate technologies to our solutions. Moreover, I was
					actively involved in educating new recruits about our technology
					stack, ensuring they are well-equipped and knowledgeable for their
					roles after my departure.
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
						class="lucide lucide-chevron-up"
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
						class="lucide lucide-chevron-down"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				{/if}
			</button>
		</div>
	</section>
	<section>
		<h3 class="text-lg font-black underline underline-offset-8">Details</h3>
		<h3 class="code-line">I flex:</h3>
		<ul>
			<li>I use vim btw</li>
			<li>I run linux btw</li>
		</ul>
	</section>
	<section>
		<h3 class="code-line">languages I'm proficient in:</h3>
		<ul>
			<li>Typescript</li>
			<li>Rust</li>
			<li>Go</li>
		</ul>
	</section>
	<section>
		<h3 class="code-line">technologies:</h3>
		<ul>
			<li>Agile Project Management</li>
			<li>D3</li>
			<li>3JS</li>
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
</article>

<style>
	section {
		@apply flex flex-col gap-4;
	}

	ul {
		@apply list-disc pl-8;
	}
</style>
