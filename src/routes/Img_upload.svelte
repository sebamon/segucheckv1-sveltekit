<script>
	export let height = 184, width = 184, file_name = "img.png";
	let avatar, fileInput;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		if (!window.FileReader) {
			alert('El navegador no soporta la lectura de archivos');
			return;
		}
		if (!/.(jpg|jpeg|png|gif)$/i.test(image.name)) {
			alert('El archivo a adjuntar no es una imagen');
		} else {
			var img = new Image();
			img.onload = function () {
				if (this.width.toFixed(0) != 184 && this.height.toFixed(0) != 184) {
					alert('Las medidas deben ser: 184 * 184');
				} else if (image.size > 20000) {
					alert('El peso de la imagen no puede exceder los 200kb');
				} else {
					alert('Imagen correcta :)');
				}
			};
			img.src = URL.createObjectURL(image);
		}
		console.log(image);
		let reader = new FileReader();
		reader.readAsDataURL(image);
		console.log(reader);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};

</script>

<div id="file_upload">
	<h1>Subir una foto para el perfil del operario</h1>
	<h2>Subir foto carnet de 184 x 184 px. Los formatos permitidos son JPG y PNG.</h2>
	{#if avatar}
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
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileInput}
	/>
</div>
<div id="probando_img">
	<img src={'avatar-usuario.png'} alt="" />
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