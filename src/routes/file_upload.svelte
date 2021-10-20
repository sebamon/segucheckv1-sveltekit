<script>
	import Pdf_file_upload from './Pdf_file_upload.svelte';
	import ImgUpload from './Img_upload.svelte';
</script>

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
		width: 50%;
		height: 30%;
		align-self:right;
		color: white;
		background-color: lightblue;
	}
	.upload_file {
		width: 50%;
		height: 30%;
		align-self: right;
		color: white;
		background-color: palevioletred;
	}
</style>
