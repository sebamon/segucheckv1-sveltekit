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
	export let status;
	console.log('¡Felicidades! Tienes un error ' + status + '. Buena suerte averiguando la causa...');
	export let message;
</script>

<main class="container card py-4 shadow-lg">
	<div class="card-body">
		<p class="lead">Error n° <strong>{status}</strong></p>
		{#if status == 404}
			<h1><i class="fas fa-exclamation-triangle me-2" />La página no existe</h1>
			<p class="lead">Revisa que esté bien escrita la dirección URL.</p>
			<img
				class="fluid thumbnail"
				alt="¡Seguí participando!"
				title="¡Seguí participando!"
				src="https://c.tenor.com/yTxA7WgkBEUAAAAd/grandpa-abe-exit.gif"
			/>
		{:else if status == 500}
			<h1><i class="fas fa-exclamation-triangle me-2" />Hubo un problema en el servidor</h1>
			<p class="lead">Alguien metió la pata...</p>
			<!-- Pero no te preocupes. Estamos trabajando para resolverlo. -->
			<img
				class="fluid thumbnail"
				alt="¡Seguí participando!"
				title="¡Seguí participando!"
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
		<hr class="m-5" />
		<p><em>Detalles: {message}</em></p>
	</div>
</main>
