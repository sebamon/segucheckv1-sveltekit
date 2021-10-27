<script>
	import Pdf_file_upload from './Pdf_file_upload.svelte';
	import ImgUpload from './Img_upload.svelte';
	import NavbarHome from '$lib/NavbarHome.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Card, CardBody, CardSubtitle, CardTitle, Image } from 'sveltestrap';
</script>

<!-- Menú de navegación -->
<NavbarHome />
<div class="container">
	<div class="upload_img">
		<ImgUpload />
	</div>
	<div class="upload_file">
		<Pdf_file_upload />
	</div>
</div>

<style>
	.container {
        width: 80%;
        height: 80%;
        align-self: center;
    }
    .upload_img {
        margin:auto;
		width: 50%;
		height: 30%;
		position: relative;
		color: white;
		background-color: #4C2A80;
	}
	.upload_file {
        margin:auto;
		width: 50%;
		height: 30%;
		position: relative;
		color: white;
		background-color: #CB8B19;
	}
</style>
