<script>
	// Animación al cambiar entre páginas: https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
		<slot />
	</div>
{/key}
