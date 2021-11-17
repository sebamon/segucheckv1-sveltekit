<script lang="ts">
	// Datos de salud a mostrar
	export let user_id = 1;
	export let bloodType = '';
	export let rh = true;
	export let allergies = '';

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

	// Arreglo de tipo de vehículos:
	let bloodTypeList = ['A', 'B', 'AB', 'O'];

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			bloodType: bloodType,
			rh: rh,
			allergies: allergies
		},
		validationSchema: yup.object().shape({
			bloodType: yup
				.string()
				.oneOf(bloodTypeList, 'Indique una opción de la lista.'),
			rh: yup
				.boolean(),
			allergies: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
		}),
		onSubmit: (values) => {
			// -- Muestra resultado en submit: BORRAR --
			alert(JSON.stringify(values));
		}
	});
</script>

<form name="formHealthInfo" id="formHealthInfo" on:submit|preventDefault={handleSubmit}>
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
			{#if isReadOnly}
				<input
					type="text"
					id="bloodType"
					name="bloodType"
					class="form-control"
					placeholder="A"
					aria-label="Tipo de sangre"
					value={bloodType}
					readonly
				/>
			{:else}
				<select id="bloodType" class="form-select" aria-label="Nivel de formación" class:invalid={$errors.bloodType}>
					<option selected disabled>Elija una opción...</option>
					{#each bloodTypeList as thisType}
						{#if bloodType === thisType}
							<option value={thisType} selected>{thisType}</option>
						{:else}
							<option value={thisType}>{thisType}</option>
						{/if}
					{/each}
				</select>
				{#if $errors.bloodType}
					<small class="form-error">{$errors.bloodType}</small>
				{/if}
			{/if}
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
					readonly
				/>
			{:else}
				<div class="form-check form-switch form-inline">
					<div class="row">
						<div class="col justify-content-end">
							<label class="form-check-label" for="rh">Negativo</label>
						</div>
						<div class="col-auto">
							<input
								type="checkbox"
								id="rh"
								name="roles"
								class="form-check-input"
								role="switch"
								checked={rh}
							/>
						</div>
						<div class="col">
							<label class="form-check-label" for="rh">Positivo</label>
						</div>
					</div>
				</div>
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
				value={$form.allergies}
				readonly={isReadOnly}
				class:invalid={$errors.allergies}
			/>
			{#if $errors.allergies}
				<small class="form-error">{$errors.allergies}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col" />
		{#if !isReadOnly}
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" disabled={!$isValid}>
					{#if $isSubmitting}
						<i class="fas fa-spinner fa-pulse me-2" />Enviando...
					{:else}
						<i class="fas fa-pen me-2" />Confirmar cambios
					{/if}
				</button>
			</div>
		{/if}
	</div>
</form>
