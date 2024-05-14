<script lang="ts">
	import RealBjorn from '../svgs/real-bjorn.svg.svelte';
	import MstarkSvg from '../svgs/mstark.svg.svelte';
	import { Breakpoint } from '../../utils/enums';

	type LogoProps = {
		clientWidth: number;
	};

	let { clientWidth }: LogoProps = $props();

	let { figureWidthString, captionWidthString } = $derived(
		clientWidth < Breakpoint.sm
			? { figureWidthString: '40px', captionWidthString: '100px' }
			: { figureWidthString: '80px', captionWidthString: '200px' }
	);
</script>

<div class="flex align-middle">
	<a href="/" aria-label="Home">
		<figure class="flex gap-2">
			<RealBjorn width={figureWidthString} />
			<MstarkSvg width={captionWidthString} />
		</figure>
	</a>
</div>
