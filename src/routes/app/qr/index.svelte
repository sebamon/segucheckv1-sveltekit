<script lang="ts">
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { Toast, Alert } from 'sveltestrap';
	let isOpen = false;

	// Datos del usuario a mostrar (reemplazar con fetch):
	const userDetails = {
		"user_id": 1234,
		"cuit": 20301001008,
		"firstName": 'Juan',
		"lastName": 'Perez'
	};
	// Generar link + hash acceso temporal:
	const urlToProfile = 'http://localhost:3000/app/perfil?auth=1234';

	const getQR = async() => {
		//funcion que toma	 los datos del formulario y lo envia por metodo post
		try{

		const response = await fetch('https://qrcode3.p.rapidapi.com/qrcode/text', {
			method: 'POST',
			headers: {
				'content-type': 'multipart/form-data/',
				'x-rapidapi-host': 'qrcode3.p.rapidapi.com',
				'x-rapidapi-key': '20a2c7f086msh5f6e5c006b75dbfp1a5e6ajsne5eb5234f20e'
			},
			body: {
				data: 'http://localhost:3000/app/perfil?auth=1234',
				image: {
					uri: 'https://i.imgur.com/QYfrqU1.png',
					modules: false
				},
				style: {
					module: {
						color: '#32155C',
						shape: 'lightround'
					},
					inner_eye: {
						shape: 'lightround'
					},
					outer_eye: {
						shape: 'lightround'
					},
					background: {
						color: "#c2fce6"
					}
				},
				size: {
					width: 500,
					quiet_zone: 2,
					error_correction: 'M'
				},
				output: {
					filename: 'qrcode',
					format: 'png'
				}
			}
		})
		console.log('response',response)
		const blob = await response.blob()
		// const img = await response.blob()
		// console.log('data',blob)
		console.log('data',blob)
		let reader = new FileReader();
			reader.readAsDataURL(blob);
			
			const image = reader.result
	
			console.log('urlcreate',blob.result)
		return 
			'hola'
			
		}catch(e){
			console.log('error getRQ', e)
			return 'data:image/png;base64,eyJkZXRhaWwiOlt7ImxvYyI6WyJib2R5IiwxXSwibXNnIjoiRXhwZWN0aW5nIHZhbHVlOiBsaW5lIDEgY29sdW1uIDIgKGNoYXIgMSkiLCJ0eXBlIjoidmFsdWVfZXJyb3IuanNvbmRlY29kZSIsImN0eCI6eyJtc2ciOiJFeHBlY3RpbmcgdmFsdWUiLCJkb2MiOiJbb2JqZWN0IE9iamVjdF0iLCJwb3MiOjEsImxpbmVubyI6MSwiY29sbm8iOjJ9fV19'
	}

		// 	.then((response) => {
		// 		console.log(response);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		// return await response.blob();
		/* try {
			
		} catch (err) {
            console.log("Esto falló :(");
		} */
	}

	export const urlQRpic = getQR();

	console.log('urlQRpic',urlQRpic)
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
		{#await getQR()}
			<Alert color="secondary">
				<i class="fas fa-spinner fa-pulse fs-1 fst-italic me-2" />Cargando QR...
			</Alert>
		{:then urlQRpic}
			<img
				src="{urlQRpic}"
				class="img-fluid"
				style="max-width:500px"
				alt="Código QR"
				title="¡Escanea este código!"
			/>
		{:catch err}
			<Alert color="secondary">
				<h4 class="alert-heading text-capitalize">Atención:</h4>
				<p>{err}</p>
			</Alert>
		{/await}
	</div>
	<div class="row">
		<CopyToClipboard text={urlToProfile} on:copy={copied} let:copy>
			<button class="btn btn-primary" id="buttonCopy" on:click={copy}>
				Copiar enlace al perfil
			</button>
		</CopyToClipboard>
		<Toast {isOpen} autohide body on:close={() => (isOpen = false)} class="bg-light">
			<span class="fw-bold"><i class="fas fa-check text-primary mx-2" />Texto copiado!</span>
		</Toast>
	</div>
</main>
