<!-- 
	IMG Upload
	Este componente permite cargar una imagen, mostrando una vista previa de la misma.
	Argumentos:
    height: altura máxima de la imagen en pixeles
    width: ancho máximo de la imagen en pixeles
	size_bytes: tamaño máximo del archivo en bytes
	file_name: nombre con el que se guardará el archivo (la extensión se agregará automáticamente)
    file_post: archivo para tratar la imagen enviada mediante POST
	save_route: ubicación donde se guardará el archivo
	accepted_file_ext: string de extensiones que pueden aceptarse. Deben llevar el punto y separarse 
		con coma (ej: ".jpg, .jpeg, .png") 
 -->
<script>
	export let maxHeight = 1024,
		maxWidth = 768,
		size_bytes = 500000,
		file_name = 'img_test.png',
		file_post = 'im_upload.js',
		save_route = '../static/user_pics/',
		accepted_file_ext = '.jpg, .jpeg, .png, .webp';

	let avatar,
		fileInput,
		ready_to_save = false;
	let size_mb = size_bytes / 100000;

	const onFileSelected = (e) => {
		let image = e.target.files[0];

		//revisar
		if (!window.FileReader) {
			alert('El navegador no soporta la lectura de archivos');
			return;
		}
		if (!/.(jpg|jpeg|png|gif|webp)$/i.test(image.name)) {
			alert('El archivo a adjuntar no es una imagen');
		} else {
			let img = new Image();
			img.onload = function () {
				if (this.width.toFixed(0) > maxWidth && this.height.toFixed(0) > maxHeight) {
					alert(
						`Las medidas deben ser: ${maxWidth} x ${maxHeight}px \nEl peso de la imagen no puede exceder los ${size_mb}mb`
					);
				} else if (image.size > size_bytes) {
					alert(
						`Las medidas deben ser: ${maxWidth} x ${maxHeight}px \nEl peso de la imagen no puede exceder los ${size_mb}mb`
					);
				} else {
					ready_to_save = true;
					/* 					let req = new XMLHttpRequest();
					let form_data = new FormData();

					form_data.append(file_name, avatar);
					form_data.append('Save route', save_route);

					req.open('POST', file_post);
					req.send(form_data);
					console.log(file_post);
 */
					document.getElementById('info_upload').innerHTML = 'El archivo fue subido con éxito.';
				}
			};
			img.src = URL.createObjectURL(image);
		}
		let fileBlob;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
			fileBlob = e.target.result;
/* 			console.log(typeof(e.target.result));
 */			uploadToGDrive(e.target.result);
		};

		const uploadToGDrive = (fileBlob) => {
			function start() {
				// 2. Initialize the JavaScript client library.
				gapi.client
					.init({
						apiKey: 'AIzaSyCTjqlSKWPus63Mqz4W40cx8hq0xodXBUk',
						// clientId and scope are optional if auth is not required.
						clientId: 'segucheck-bot@segucheck-329320.iam.gserviceaccount.com',
						scope: 'profile'
					})
					.then(function () {
						// 3. Initialize and make the API request.
						return gapi.client.request({
							path: 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names'
						});
					})
					.then(
						function (response) {
							console.log(response.result);
						},
						function (reason) {
							console.log('Error: ' + reason.result.error.message);
						}
					);
			}
			// 1. Load the JavaScript client library.
			gapi.load('client', start);

			var metadata = {
				name: 'sampleIMG', // Filename at Google Drive
				mimeType: 'image/jpeg', // mimeType at Google Drive
				parents: ['1yOmEFValOaKQz6BoMjSvmhk7dE8qnTBx'] // Folder ID at Google Drive
			};

			var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
			var form = new FormData();
			form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
			form.append('file', fileBlob);

			var xhr = new XMLHttpRequest();
			xhr.open(
				'post',
				'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id'
			);
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			xhr.responseType = 'json';
			xhr.onload = () => {
				console.log(xhr.response.id); // Retrieve uploaded file ID.
			};
			xhr.send(form);
		};
	};
</script>


<svelte:head>
	<script src="https://apis.google.com/js/api.js"></script>
</svelte:head>

<div id="file_upload">
	<p id="info_upload">
		<strong>Subir una foto para el perfil del operario</strong>
		<br />
		Subir foto carnet de {maxWidth} x {maxHeight} px, máximo {size_mb} Mb.
		<br />Los formatos permitidos son JPG y PNG.
	</p>
	{#if avatar && ready_to_save}
		<img class="avatar" src={avatar} alt="foto de perfil" />
	{:else}
		<img class="avatar" src="../static/img/usr-await.png" alt="foto de perfil sin cargar" />
	{/if}

	<img
		class="upload"
		src="../static/img/pic-upload.png"
		alt="subir una foto"
		on:click={() => {
			fileInput.click();
		}}
	/>
	<div
		class="upload_button"
		on:click={() => {
			fileInput.click();
		}}
	>
		Seleccionar imagen
	</div>
	<input
		id="file-to-upload"
		style="display:none"
		type="file"
		accept={accepted_file_ext}
		on:change={(e) => onFileSelected(e)}
		bind:this={fileInput}
	/>
<!-- 	<button id="save-image">Guardar</button>
	<div id="test" /> -->
</div>

<style>
	#file_upload {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}

	.upload {
		display: flex;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}
	.avatar {
		display: flex;
		height: 184px;
		width: 184px;
	}
</style>
