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
/*         import  "../static/user_pics/image.js"; */
        export let height = 184,
		width = 184,
		size_bytes = 90000,
		file_name = 'img_test.png',
		file_post = '../static/user_pics/image.js',
		save_route = '../static/user_pics/',
		accepted_file_ext = '.jpg, .jpeg, .png, .webp';

	let avatar,
		fileInput,
		ready_to_save = false;
	let size_kb = size_bytes / 100;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		if (!window.FileReader) {
			alert('El navegador no soporta la lectura de archivos');
			return;
		}
		if (!/.(jpg|jpeg|png|gif)$/i.test(image.name)) {
			alert('El archivo a adjuntar no es una imagen');
		} else {
			let img = new Image();
			img.onload = function () {
				if (this.width.toFixed(0) != width && this.height.toFixed(0) != height) {
					alert(
						`Las medidas deben ser: ${width} x ${height}px \nEl peso de la imagen no puede exceder los ${size_kb}kb`
					);
				} else if (image.size > size_bytes) {
					alert(
						`Las medidas deben ser: ${width} x ${height}px \nEl peso de la imagen no puede exceder los ${size_kb}kb`
					);
				} else {
					console.log('Imagen correcta');
					ready_to_save = true;
					let req = new XMLHttpRequest();
					let form_data = new FormData();
                    
					form_data.append(file_name, avatar);
                    form_data.append("Save route", save_route);
                    
					req.open('POST', file_post);
					req.send(form_data);
					
                    document.getElementById('info_upload').innerHTML = 'El archivo fue subido con éxito.';
                    /* Save_File(save_route, file_name, img); */
				}
			};
			img.src = URL.createObjectURL(image);
		}
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
</script>

<div id="file_upload">
	<p id="info_upload">
		<strong>Subir una foto para el perfil del operario</strong>
		<br />
		Subir foto carnet de 184 x 184 px, máximo 900 Kb.
		<br />Los formatos permitidos son JPG y PNG.
	</p>
	{#if avatar && ready_to_save}
		<img class="avatar" src={avatar} alt="foto de perfil" />
	{:else}
		<img
			class="avatar"
			src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
			alt="foto de perfil sin cargar"
		/>
	{/if}

	<img
		class="upload"
		src="https://static.thenounproject.com/png/625182-200.png"
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
		style="display:none"
		type="file"
		accept={accepted_file_ext}
		on:change={(e) => onFileSelected(e)}
		bind:this={fileInput}
	/>
    <div id="test">
        
    </div>
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
