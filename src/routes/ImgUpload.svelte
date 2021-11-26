<!-- 
	ImgUpload
	Componente para poder subuir una imagen, previsualizarla y almacenarla en el servidor.Acerca
	Permite recibir los siguientes parámetros:
	filesPath: directorio donde se guardará el archivo dentro de '/static/'
	fileName: nombre deseado para almacenar el archivo. La extensión se deduce del archivo subido, no hace falta colocarla.

	Próximamente: podrán evaluarse medidas de la imagen, tamaños máximos, extensiones aceptadas
 -->

<script>
	import {uploadFile} from './api/driveV2';
	/* Se utiliza uuid para generar un nombre de archivo aleatorio temporal */
	// import {v4 as uuidV4} from 'uuid'; - probando en padre
	/* Ruta donde guardaremos dentro del directorio static */
	export const filesPath = './img/temp-pics'; // in this example: static root

	/* The File object from the form */
	let fileToUpload = false;
	let avatar;
	export let fileName = "dummyFilename";
	export let fileExtension; 

	/* The button status */
	let disabled;
	$: disabled = !fileToUpload || !fileName ? 'disabled' : '';

	/* Handles the input file change event */
	const handleFileChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			fileToUpload = event.target.files[0];
			fileExtension = fileToUpload.type.split('/').pop(); // toma la extensión de la propiedad 'type'
			onFileSelected(fileToUpload);
		}
	};

	/* Manejo del submit */
	const handleSubmit = () => {
		/* Verifica que todas las variables se inicialicen */
		if (fileToUpload && fileName) {
			
			/* Se crea el form data */
			let formData = new FormData();
			formData.append('size', fileToUpload.size);
			formData.append('file', fileToUpload);
			formData.append('name', fileName + '.' + fileExtension);
			formData.append('mimeType', fileToUpload.mimeType);
			formData.append('path', filesPath);
			/* Llamando al plugin 'upload' en el servidor */
			fetch('upload', {
				method: 'POST',
				body: formData
				/* Te amamos, Muffinman!!( https://muffinman.io/uploading-files-using-fetch-multipart-form-data/ ) */
			})
				/* Manejo de la respuesta */
				.then((res) => {
					if (!res.ok) {
						// Status 500
						throw new Error('error en la carga ' + res.status + ', descripción: ' + res.statusText);
					} else {
						// Todo salió bien!!
						console.log('Archivo cargado en la carpeta static');
					}
				})
				.catch((err) => console.log('Ooops: ' + err));
		}
	};

	const onFileSelected = (fileToShow) => {
		let image = fileToShow;
		if (!window.FileReader) {
			alert('El navegador no soporta la lectura de archivos');
			return;
		}
		if (!/.(jpg|jpeg|png|gif)$/i.test(image.name)) {
			alert('El archivo a adjuntar no es una imagen');
		} else {
			let img = new Image();
			img.src = URL.createObjectURL(image);
			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				avatar = e.target.result;
			};
		}
	};
</script>

<div>
	<!-- Formulario subida de archivo -->
	<div>
		<div>
			<label for="input-file">Seleccionar imagen:</label>
			<input
				type="file"
				id="input-file"
				name="input-file"
				accept=".jpg, .jpeg, .png, .gif, .webp"
				on:change={handleFileChange}
			/>
		</div>
		{#if avatar}
			<img class="avatar" src={avatar} alt="foto de perfil" />
		{:else}
			<img class="avatar" src="/static/img/usr-await.png" alt="foto de perfil sin cargar" />
		{/if}
		<div class="top-1">
			<button class="btn" {disabled} type="submit" on:click={handleSubmit}> Subir imagen </button>
		</div>
	</div>
	<button on:click={uploadFile}>
		Apretame
	</button>

</div>

<style>
	.avatar {
		width: 150px;
		height: 150px;
	}
</style>
