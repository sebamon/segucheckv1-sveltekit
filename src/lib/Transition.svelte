<script>
	// Animación al cambiar entre páginas: https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ x: -50, duration: 400, delay: 500 }} out:fly={{ x: -50, duration: 400 }}>
		<slot />
	</div>
{/key}
