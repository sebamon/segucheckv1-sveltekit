<!-- 
	PDF File Upload
	Este componente permite cargar un documento PDF.
	Argumentos:
	size_bytes: tamaño máximo del archivo en bytes
	file_name: nombre con el que se guardará el archivo (la extensión se agregará automáticamente)
	save_route: ubicación donde se guardará el archivo
	accepted_file_test: string de extensiones que pueden aceptarse. Deben llevar el punto y separarse 
		con coma (ej: ".pdf, .doc, .xls") 
 -->
<script>
	/*     import { Save_File } from "./api/file_save.js";
	 */ 
	export let 
		size_bytes = 5120000,
		file_name = 'doc_test.pdf',
		save_route = '../static/docs/',
		accepted_file_ext = '.pdf';
	let pdf_file,
		fileInput,
		ready_to_save = false;
	let size_mb = size_bytes / 10000;

	const onFileSelected = (e) => {
		if (!window.FileReader) {
			alert('El navegador no soporta la lectura de archivos');
			return;
		}else{
			let pdf = "";
		}
	};
</script>

<div id="file_upload">
	<p id="info_upload">
		<strong>Subir archivo PDF</strong>
		<br />
		Subir el documento en formato PDF.
	</p>
	<img
		class="upload"
		src="https://static.thenounproject.com/png/377198-200.png"
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
		Seleccionar archivo
	</div>
	<input
		style="display:none"
		type="file"
		accept={accepted_file_ext}
		on:change={(e) => onFileSelected(e)}
		bind:this={fileInput}
	/>
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
	.pdf_file {
		display: flex;
		height: 184px;
		width: 184px;
	}
</style>
