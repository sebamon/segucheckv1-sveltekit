<script>
	// select file input
	const input = document.getElementById('avatar');
	let avatar;
	// add event listener
	input.addEventListener('change', () => {
		uploadFile(avatar);
	});

	const uploadFile = (file) => {
		// add file to FormData object
		const fd = new FormData();
		fd.append('avatar', file);

		// send `POST` request
		fetch('/api', {
			method: 'POST',
			body: fd
		})
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err));
	};
</script>

<div>
	<input type="file" id="avatar" bind:value={avatar}/>
</div>
 
<!-- 
 <script>
	let files, botoncito;

	const uploadFile = (files) => {
		// add file to FormData object

		const fd = new FormData();
		fd.append('avatar', files[0]);
		// send `POST` request
		fetch('src/routes/api/api_try_2.js', {
			method: 'POST',
			body: fd
		})
			.then((res) => res.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err));
		
	};
</script>

<input type="file" bind:files>

{#if files && files[0]}
	<p>
		{files[0].name}
		{Math.round(files[0].size/1024/1024)+" Mb"}
		{botoncito.disabled = false}
	</p>
{/if}
<button id="upload" on:click="{uploadFile}" bind:this="{botoncito}" disabled>Guardar</button> -->