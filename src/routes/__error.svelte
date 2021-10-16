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
    import Error404 from '$lib/Error/Error404.svelte'; // Página no encontrada
    import OtroError from '$lib/Error/OtroError.svelte'; // Otra página

    export let status;
    console.log(status);
    export let message;
</script>

{#if status == 404}
    <Error404 {status} {message} />
{:else}
    <OtroError {status} {message} />
{/if}