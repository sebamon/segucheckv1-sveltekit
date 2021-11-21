<script lang="ts">
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { Toast, Alert } from 'sveltestrap';
	let isOpen = false;
	// Datos del usuario a mostrar (reemplazar con fetch):
	const userDetails = {
		user_id: 1,
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez'
	};
	// Activar solicitud de QR
	let isClicked = false;
	// Generar link con ID usuario + token de acceso temporal:
	const token = '1234';
	const urlToProfile =
		'http://localhost:3000/panel/operarios/' + userDetails.user_id + '?auth=' + token;
	const imageQR = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|2&chl='+encodeURIComponent(urlToProfile);
	// Alternar mensaje en Toast:
	const copied = () => {
		isOpen = true;
	};
</script>

<header>
	<h1 class="text-center">{userDetails.firstName + ' ' + userDetails.lastName}</h1>
	<p class="lead text-center">CUIT: {userDetails.cuit}</p>
	<p>
		Escanea este código usando la cámara de tu teléfono, para abrir el enlace con la información del
		operario.
	</p>
</header>
<main>
	<div class="row justify-content-center">
		{#if !isClicked}
			<div class="qr m-4">
				<img
					src="/img/qr-code.png"
					class="mx-auto d-block"
					alt="Click en el botón para generar código QR"
				/>
				<button class="btn btn-lg btn-warning" on:click={() => (isClicked = !isClicked)}>
					<h1><i class="fas fa-sync mx-2" /></h1>
					<h3>Generar QR</h3>
				</button>
			</div>
		{:else}
			<img
				src="{imageQR}"
				class="mx-auto d-block m-4"
				alt="Código QR"
				title="¡Escanea este código!"
			/>
		{/if}
	</div>
	<div class="row">
		<CopyToClipboard text={urlToProfile} on:copy={copied} let:copy>
			<button class="btn btn-primary" id="buttonCopy" on:click={copy}>
				<i class="fas fa-copy mx-2" /> Copiar enlace al perfil
			</button>
		</CopyToClipboard>
		<Toast {isOpen} autohide body on:close={() => (isOpen = false)} class="bg-light">
			<span class="fw-bold"><i class="fas fa-check text-primary mx-2" />Texto copiado!</span>
		</Toast>
	</div>
</main>

<style>
	/* Ajustar tamaño del código QR y centrar botón al solicitar generarlo */
	.qr {
		position: relative;
		max-width: 100%;
		height: 500px;
	}
	.qr img {
		max-height: 500px;
		max-width: 100%;
	}
	.qr .btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		padding: 12px 24px;
	}
</style>
