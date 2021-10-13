<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message, // Descripción
				status // Número de error
			}
		};
	}
</script>

<script>
	// REVISAR
	import Error404 from '$lib/Error404.svelte'; // Página no encontrada
	import OtroError from '$lib/OtroError.svelte'; // Otra página

	export let status;
	console.log(status);
	export let message;
</script>

{#if status == 404}
	<!-- Used '==' instead of '===' to match string/number status code (just to be sure) -->
	<Error404 {status} {message} />
{:else}
	<OtroError {status} {message} />
{/if}
