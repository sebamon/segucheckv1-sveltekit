<script lang="ts">
	import CopyToClipboard from 'svelte-copy-to-clipboard';
    import { Toast } from 'sveltestrap';
    let isOpen = false;

	// Datos del usuario a mostrar (reemplazar con fetch):
	let userDetails = {
		user_id: 1234,
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez'
	};
	// Link + hash acceso temporal:
	let urlToProfile = 'http://localhost:3000/app/perfil?auth=1234';

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
		<img src="/img/qr-code.png" class="img-fluid" style="max-width:500px" alt="Código QR" title="¡Escanea este código!" />
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
