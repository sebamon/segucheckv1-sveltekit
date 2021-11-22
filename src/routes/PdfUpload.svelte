<!-- 
	PdfUpload
	Componente para poder subir un documento PDF, previsualizarla y almacenarla en el servidor.
	Permite recibir los siguientes parámetros:
	filesPath: directorio donde se guardará el archivo dentro de '/static/'
	fileName: nombre deseado para almacenar el archivo. La extensión se deduce del archivo subido, no hace falta colocarla.

	Próximamente: podrán evaluarse medidas de la imagen, tamaños máximos, extensiones aceptadas
 -->
 <svelte:head>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.min.js"> </script>
 </svelte:head>
<script>
	/* Se utiliza uuid para generar un nombre de archivo aleatorio temporal */
	import {v4 as uuidV4} from 'uuid';
	/* Ruta donde guardaremos dentro del directorio static */
	export const filesPath = './docs/temp-docs'; 

	/* The File object from the form */
	let fileToUpload = false;
	let pdfFile;
	export let fileName = uuidV4();
	let fileExtension;

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

	/* Handles the submit event */
	const handleSubmit = () => {
		/* Checks if all the data is set */
		if (fileToUpload && fileName) {
			/* Creates the form data */
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
			console.log('El navegador no soporta la lectura de archivos');
			return;
		}

	};
</script>

<div>
	<!-- Formulario subida de archivo -->
	<div>
		<div>
			<label for="input-file">Seleccionar documento:</label>
			<input
				type="file"
				id="input-file"
				name="input-file"
				accept=".pdf"
				on:change={handleFileChange}
			/>
		</div>
			<img class="pdfFile" src="../static/img/doc-upload.png" alt="logo archivo pdf" />		
		<div class="top-1">
			<button class="btn" {disabled} type="submit" on:click={handleSubmit}> Subir documento </button>
		</div>
	</div>
</div>

<style>
	.pdfFile {
		width: 150px;
		height: 150px;
	}
</style>
