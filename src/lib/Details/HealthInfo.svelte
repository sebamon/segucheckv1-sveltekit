<script lang="ts">
	// Datos de salud a mostrar
	export let user_id = 1;
	export let bloodType = '';
	export let rh = true;
	export let allergies = '';

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;
</script>

<form name="formHealthInfo" id="formHealthInfo">
	{#if isReadOnly}
		<div class="hstack gap-3">
			<h2 class="my-4"><i class="fas fa-notes-medical me-4" />Datos médicos</h2>
			<div class="ms-auto">
				<a class="btn btn-primary" href="/panel/operarios/{user_id}/medicos">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{/if}
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="bloodType" class="form-label">Tipo de sangre</label>
			<input
				type="text"
				id="bloodType"
				name="bloodType"
				class="form-control"
				placeholder="1234"
				aria-label="Número ID"
				value={bloodType}
				readonly={isReadOnly}
			/>
		</div>
		<div class="col-md-6">
			<label for="rh" class="form-label">Factor</label>
			{#if isReadOnly}
				<input
					type="text"
					id="rh"
					name="rh"
					class="form-control"
					placeholder="20301001008"
					aria-label="Factor"
					value={rh ? 'Positivo' : 'Negativo'}
					readonly={isReadOnly}
				/>
			{:else}
				<select id="studyLevel" class="form-select" aria-label="Nivel de formación"> <!-- No funciona aún selected -->
					<option disabled>Elija una opción...</option>
					<option value="true" selected={rh}>Positivo</option>
					<option value="false" selected={!rh}>Negativo</option>
				</select>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12">
			<label for="allergies" class="form-label">Alergias</label>
			<input
				type="text"
				id="allergies"
				name="allergies"
				class="form-control"
				placeholder="1234"
				aria-label="Ninguno"
				value={allergies}
				readonly={isReadOnly}
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col" />
		{#if !isReadOnly}
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary">
					<i class="fas fa-pen me-2" />Confirmar cambios
				</button>
			</div>
		{/if}
	</div>
</form>
