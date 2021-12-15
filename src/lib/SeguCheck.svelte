<script lang="ts">

let categoryName = ''

function submit(){

    console.log(categoryName)
}

</script>

<hr>
<form name="formCheckCategory" id="formCheckCategory" on:submit|preventDefault={submit}>
    <div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="categoryName" class="form-label">Nombre Categoria:</label>
			<input
				type="text"
				id="categoryName"
				name="categoryName"
				class="form-control"
				placeholder="Nombre de la Categoria"
				aria-label="Nombre de la categoria"
                bind:value={categoryName}
				required
			/>
		</div>
    </div>
    <div class="row mb-3 g-3">
		<div class="col-md-6" />
		<div class="col-md-6 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary" disabled={false}>
				{#if 1!==1}
					<i class="fas fa-spinner fa-pulse me-2" />Enviando...
				{:else}
					<i class="fas fa-plus me-2" />Crear
				{/if}
			</button>
		</div>
	</div>
</form>