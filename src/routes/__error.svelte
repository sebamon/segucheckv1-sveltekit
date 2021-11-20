<script context="module">
	// /__error.svelte: Muestra códigos de errores HTTP al usuario
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
	export let status;
	export let message;
</script>

<svelte:head>
	<title>Error {status} - SeguCheck</title>
</svelte:head>

<main class="container card py-4 shadow-lg">
	<div class="mt-1 ms-auto">
		<h5><a href="/" class="text-dark text-decoration-none"><img src="/img/segucheck-logo.svg" height="36" alt="logo"><span class="mx-2">SeguCheck</span></a></h5>
	</div>
	<hr class="my-2" />
	<div class="card-body">
		<p class="lead">Error n° <strong>{status}</strong></p>
		{#if status == 404}
			<h1><i class="fas fa-exclamation-triangle me-2" />La página no existe</h1>
			<p class="lead">
				Revisa que esté bien escrita la dirección URL. O quizás hayas llegado antes de que esta
				página fuera creada.
			</p>
			<img
				class="img-fluid img-thumbnail"
				alt="Volver al futuro: Precisamente a horario"
				title="Volver al futuro: Precisamente a horario"
				src="https://c.tenor.com/SD-TxYTh3scAAAAd/precisely-on-schedule-right-on-schedule.gif"
			/>
		{:else if status == 500}
			<h1><i class="fas fa-exclamation-triangle me-2" />Hubo un problema en el servidor</h1>
			<p class="lead">Alguien metió la pata... Digo, aquí no sucedió nada.</p>
			<!-- Pero no te preocupes. Estamos trabajando para resolverlo. -->
			<img
				class="img-fluid img-thumbnail"
				alt="Los Simpsons: Aquí no sucedió nada"
				title="Los Simpsons: Aquí no sucedió nada"
				src="https://c.tenor.com/yTxA7WgkBEUAAAAd/grandpa-abe-exit.gif"
			/>
		{:else if status == 503}
			<h1>
				<i class="fas fa-exclamation-triangle me-2" />El servicio no está disponible actualmente
			</h1>
			<p class="lead">
				Regresa más tarde y sigue atento a las informaciones en nuestras redes sociales.
			</p>
		{:else if status == 502}
			<h1><i class="fas fa-exclamation-triangle me-2" />Bad Gateway</h1>
			<p class="lead">El servidor no puede responder ahora a tu solicitud.</p>
		{:else if status == 504}
			<h1><i class="fas fa-exclamation-triangle me-2" />Gateway Time-Out</h1>
			<p class="lead">Tiempo de espera agotado para responder tu solicitud.</p>
		{:else}
			<h1><i class="fas fa-exclamation-triangle me-2" />Algo malo pasó</h1>
			<p class="lead">Pero no te preocupes. Estamos trabajando para resolverlo.</p>
		{/if}
		<hr class="my-5" />
		<p><em>Detalles: {message}</em></p>
	</div>
</main>
