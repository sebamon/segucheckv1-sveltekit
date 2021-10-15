<script>
	export let status; // Número de error
	export let message; // En inglés
</script>

<main class="container py-4">
	<h1><i class="fas fa-exclamation-triangle me-2" />Error n° <strong>{status}</strong>: La página no existe</h1>
	<p class="lead">Detalle: {message}</p>
	<a href="/" class="btn btn-primary"><i class="fas fa-home me-2" /> Volver al inicio</a>
</main>