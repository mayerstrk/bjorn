<script lang="ts">
	let { tech } = $props();
	console.log(JSON.stringify(tech));
</script>

<span
	class="tag rounded-full bg-accent-3/5 px-4 text-sm leading-loose text-accent-3"
>
	{tech}
</span>
