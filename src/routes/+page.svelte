<script>
	import Scene from '$lib/components/dimensional-bjorn.svelte';
</script>

<article>
	<Scene />
	<section>
		<h2 class="text-lg font-black underline underline-offset-8">About Me</h2>
		<p>
			&nbsp;&nbsp;&nbsp;&nbsp;Hey 👋, I'm Mayer, a full-stack developer based in
			Tel-Aviv🚀. I am passionate about designing and building efficient,
			<span class="underline underline-offset-4">simple</span>
			systems that look pretty and are easy to use - from user stories and process
			diagrams all the way to UX design, infrastructure provisioning and running
			pilots. Crafting apps that offer an incredible experience for both developers
			and users and optimizing for performance is something I find truly rewarding.
			<span class="opacity-0 transition-opacity hover:opacity-100">
				I don't want JS on the backend :)</span
			>
		</p>
	</section>
	<section>
		<h3 class="code-line">flexes:</h3>
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
	article {
		@apply flex flex-col gap-6 rounded-xl p-3 sm:mt-10 sm:gap-11 sm:p-20 lg:mx-20;
	}
	section {
		@apply flex flex-col gap-4;
	}

	ul {
		@apply list-disc pl-8;
	}
</style>
