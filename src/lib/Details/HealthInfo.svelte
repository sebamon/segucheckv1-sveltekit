<script lang="ts">
	// Datos de salud a mostrar
    export let bloodType = "";
    export let rh = true;
    export let allergies = "";
</script>

<form name="formHealthInfo" id="formHealthInfo">
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
				readonly
			/>
		</div>
		<div class="col-md-6">
			<label for="rh" class="form-label">Factor</label>
			<input
				type="text"
				id="rh"
				name="rh"
				class="form-control"
				placeholder="20301001008"
				aria-label="Factor"
				value={rh ? "Positivo" : "Negativo"}
				readonly
			/>
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
				readonly
			/>
		</div>
	</div>
</form>