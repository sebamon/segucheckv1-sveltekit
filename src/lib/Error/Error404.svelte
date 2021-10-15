<script>
	export let status; // Número de error
	export let message; // En inglés
</script>

<main class="container py-4">
	<h1>Error n° <strong>{status}</strong>: La página no existe</h1>
	<p class="lead">Detalle: {message}</p>
</main>