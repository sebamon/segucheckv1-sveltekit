<!-- 
	ImgUpload
	Componente para poder subuir una imagen, previsualizarla y almacenarla en el servidor.Acerca
	Permite recibir los siguientes parámetros:
	filesPath: directorio donde se guardará el archivo dentro de '/static/'
	fileName: nombre deseado para almacenar el archivo. La extensión se deduce del archivo subido, no hace falta colocarla.

	Próximamente: podrán evaluarse medidas de la imagen, tamaños máximos, extensiones aceptadas -->

<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()
// import { uploadFile } from './api/driveSet';
	/* Se utiliza uuid para generar un nombre de archivo aleatorio temporal */
	import { v4 as uuidV4 } from 'uuid';

	/* Ruta donde guardaremos dentro del directorio static */
	export let name // Nombre de la variable profilePic || frontPic || leftSidePic || RightSidePic
	
	export let filesPath = './img/profile-pics'; // in this example: static root

	/* The File object from the form */
	let fileToUpload = false;
	let avatar;
	let fileName, fileExtension, readyToUpload, googleDriveAccessLink; //variables globales

	/* Inicializamos el nombre del archivo a guardar */
	fileName = uuidV4();

	/* The button status */
	let disabled;
	$: disabled = !fileToUpload || !fileName ? 'disabled' : '';
	// $: subir = readyToUpload == true
	
	/* Handles the input file change event */
	const handleFileChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			fileToUpload = event.target.files[0];
			// @ts-ignore
			fileExtension = fileToUpload.type.split('/').pop(); // toma la extensión de la propiedad 'type'
			/* Seteamos el nombre con el que se almacenará el archivo de imagen en nuestro store */
			// imgFileExtension.set(fileExtension);
			onFileSelected(fileToUpload);
		}
	};

	/* Manejo del submit */
	const handleSubmit = () => {
		/* Verifica que todas las variables se inicialicen */
		if (fileToUpload && fileName) {
			readyToUpload = true;
			console.log('Ready: ' + readyToUpload + ', File: ' + fileName+ '.' + fileExtension);
			/* Se crea el form data */
			let formData = new FormData();
			// @ts-ignore
			formData.append('size', fileToUpload.size);
			// @ts-ignore
			formData.append('file', fileToUpload);
			formData.append('name', fileName + '.' + fileExtension);
			// @ts-ignore
			formData.append('mimeType', fileToUpload.mimeType);
			formData.append('path', filesPath);
			formData.append('folder', filesPath);
			console.log('FormData previo al upload: ' + JSON.stringify(formData));
			/* Llamando al plugin 'upload' en el servidor */
			fetch('http://localhost:3000/upload', {
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
}

	const onFileSelected = (fileToShow) => {
		let image = fileToShow;
		if (!window.FileReader) {
			console.log('El navegador no soporta la lectura de archivos');
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
			<!-- <button class="btn" {disabled} type="submit" on:click|preventDefault={handleSubmit} on:click={() => dispatch('loadImage', {fileName, fileExtension, readyToUpload, googleDriveAccessLink})} 
				on:click={() => dispatch('subir',subir())}> -->
			<button class="btn" {disabled} type="submit" on:click|preventDefault={handleSubmit} on:click={() => dispatch('loadImage', {fileName, fileExtension, readyToUpload, googleDriveAccessLink, name, filesPath})}>
				Subir imagen
			</button>
		</div>
	</div>
	<!-- <button id = "functionSubir" class="btn" on:click={subir} disabled> Apretame </button> --> 
</div>

<style>
	.avatar {
		width: 150px;
		height: 150px;
	}
</style>
