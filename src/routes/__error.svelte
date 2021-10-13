<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message, // Descripción
				error // Código
			}
		};
	}
</script>

<script>
	// REVISAR
	import Error404 from '$lib/Error404.svelte'; // Página no encontrada
	import OtroError from '$lib/OtroError.svelte'; // Otra página

	export let error;
	export let message;
</script>

{#if error == 404}
	<!-- Used '==' instead of '===' to match string/number status code (just to be sure) -->
	<Error404 {error} {message} />
{:else}
	<OtroError {error} {message} />
{/if}
