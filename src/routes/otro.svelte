<!-- <svelte:head>
	<script type="text/javascript" src="./driveF.js">
	</script>
</svelte:head> -->

<script>
	async function uploadFile(){
		const response = await fetch('driveF', {
			method : "POST"
		})
		console.log('response',response)
		const date= await response.json()
	}
</script>


<button on:click={ uploadFile }> Apretame </button>
