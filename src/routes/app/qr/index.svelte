<script lang="ts">
	import { resolve } from 'path/posix';
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { Toast, Alert, Button } from 'sveltestrap';
	
	

	// Datos del usuario a mostrar (reemplazar con fetch):
	const userDetails = {
		user_id: 1,
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez'
	};
	// Activar solicitud de QR:
	let isClicked = false;
	// Generar link con ID usuario + token de acceso temporal:
	const token = '1234';
	const urlToProfile =
		'http://localhost:3000/panel/operarios/' + userDetails.user_id + '?auth=' + token;
	// 	Versión para Google Charts:
	const imageQR = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|2&chl='+encodeURIComponent(urlToProfile);
	// 
			// const getQR = async () => {
			// 	// Toma los datos del formulario y los envía por metodo POST
			// 	const response = await fetch('https://qrcode3.p.rapidapi.com/qrcode/text', {
			// 		method: 'POST',
			// 		headers: {
			// 			Accept: 'image/svg+xml',
			// 			'Content-Type': 'application/json',
			// 			'x-rapidapi-host': 'qrcode3.p.rapidapi.com',
			// 			'x-rapidapi-key': process.env['QR-API-KEY']
			// 		},
			// 		body: JSON.stringify({
			// 			data: urlToProfile,
			// 			image: {
			// 				uri: 'https://i.imgur.com/QYfrqU1.png',
			// 				modules: false
			// 			},
			// 			style: {
			// 				module: {
			// 					color: '#32155C',
			// 					shape: 'lightround'
			// 				},
			// 				inner_eye: {
			// 					shape: 'lightround'
			// 				},
			// 				outer_eye: {
			// 					shape: 'lightround'
			// 				}
			// 				// background: {
			// 				// 	color: "#c2fce6"
			// 				// }
			// 			},
			// 			size: {
			// 				width: 500,
			// 				quiet_zone: 2,
			// 				error_correction: 'M'
			// 			},
			// 			output: {
			// 				filename: 'qrcode',
			// 				format: 'png'
			// 			}
			// 		})
			// 	});
			// 	console.log('response: ', response);
			// 	let imageQR = '';
			// 	if (response.status == 200) {
			// 		// Si recibe correctamente, genera la imagen:
			// 		const blob = await response.blob();
			// 		imageQR = URL.createObjectURL(blob);
			// 	} else {
			// 		// Si hubo un error con la API (cualquier otro status), retorna un código 'error':
			// 		imageQR = 'error';
			// 	}
			// 	console.log(imageQR);
			// 	return imageQR;
			// };
	// Alternar mensaje en texto copiado:
	let isOpen = false;
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
			<div class="qr m-4">
				<!-- Versión para LinQR -->
				<!-- {#await getQR()}
					<Alert color="secondary">
						<i class="fas fa-spinner fa-pulse fs-1 me-2" />Cargando QR...
					</Alert>
				{:then imageQR}
					{#if (imageQR = 'error')}
						<Alert color="secondary">
							<h4 class="alert-heading">
								<i class="fas fa-exclamation-triangle me-2" />Hubo un problema al generar el código
							</h4>
							<p>Hay inconvenientes con la API. ¿Solicitudes agotadas?</p>
						</Alert>
					{:else}
						<img
							src={imageQR}
							class="mx-auto d-block"
							alt="Código QR"
							title="¡Escanea este código!"
						/>
					{/if}
				{:catch}
					<Alert color="secondary">
						<h4 class="alert-heading">
							<i class="fas fa-exclamation-triangle me-2" />Hubo un problema al contactar la API
						</h4>
						<p>Es posible que el servidor no esté disponible, o estés sin conexión.</p>
					</Alert>
				{/await} -->
				<!-- Versión para Google Charts -- -->
					<img
						src="{imageQR}"
						class="mx-auto d-block m-4"
						alt="Código QR"
						title="¡Escanea este código!"
					/>
				<!-- -- Fin versión para Google Charts -->
			</div>
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
