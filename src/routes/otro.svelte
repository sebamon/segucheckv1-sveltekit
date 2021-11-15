<script>
	/* 	import { uploadFile } from './driveF.js';
	 */
	async function mandale() {
		console.log("entrando al madale");
		fetch('./datos.json')
			.then((response) => response.json())
			.then(function (response) {
				console.log("Respose: "+response);
				document.getElementById('imagen').setAttribute('src', response.ubicacion);
				document.getElementById('imagen').setAttribute('alt', response.nombre);
			});
	}
</script>

<button on:click={ mandale }> Apretame </button>
<img id="imagen" src="" alt="" />
