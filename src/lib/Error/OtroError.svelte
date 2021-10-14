<script>
	export let status; // Número de error
	export let message; // En inglés
</script>

<main class="container py-4">
	<h1>Error n° <strong>{status}</strong> - Error diferente</h1>
	<p class="lead">Detalle: {message}</p>
</main>

<footer class="container pt-5 my-5 text-muted border-top">
	<p>
		<strong>SeguCheck</strong> © 2021 - Desarrollado por
		<a href="https://github.com/sebamon/segucheckv1-sveltekit">SanguCheck Dozen</a>
	</p>
</footer>
