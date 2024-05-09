<script>
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	let value = $state(0);
</script>

<div class="flex">
	<RadioGroup
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
	>
		<RadioItem bind:group={value} name="justify" value={0}></RadioItem>
		<RadioItem bind:group={value} name="justify" value={0}></RadioItem>
	</RadioGroup>
</div>
