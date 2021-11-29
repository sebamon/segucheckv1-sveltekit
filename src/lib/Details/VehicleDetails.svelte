<script lang="ts">
	import { format } from 'path/posix';
	// import { createEventDispatcher, validate_store } from 'svelte/internal';
	// import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher();

	// function submit() {
	// 	dispatch('showAlert', {
	// 		status: status,
	// 		message: message
	// 	});
	// }

	// function showAlert() {
	// 	dispatch('showAlert', {
	// 		status: status,
	// 		message: message
	// 	});
	// }
	// Datos del usuario a mostrar
	export let vehicle_id: number;
	export let domain = '';
	export let type: string;
	export let brand: string;
	export let model: string;
	export let year: number;
	export let internNumber = vehicle_id;
	export let chasisNumber = 0;
	export let motorNumber = 0;

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

	let error: string;
	let message: string;
	let color;
	let status;

	// Arreglo de tipo de vehículos:
	let vehicleTypeList = [
		'Aeronaves - Avión Comercial',
		'Aeronaves - Avión De Carga',
		'Aeronaves - Dron',
		'Aeronaves - Helicóptero',
		'Embarcaciones - Bote Sin Motor',
		'Embarcaciones - Lancha',
		'Embarcaciones - Semirrígido - Gomón',
		'Maquinaria Con Carreteo - Cargadora',
		'Maquinaria Con Carreteo - Equipo Especial',
		'Maquinaria Con Carreteo - Excavadora',
		'Maquinaria Con Carreteo - Grúa',
		'Maquinaria Con Carreteo - Motoniveladora',
		'Maquinaria Con Carreteo - Pala Frontal',
		'Maquinaria Con Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Con Carreteo - Retroexcavadora',
		'Maquinaria Con Carreteo - Topadora',
		'Maquinaria Con Carreteo - Tractor',
		'Maquinaria Sin Carreteo - Autoelevador - Sampi',
		'Maquinaria Sin Carreteo - Camión Guinche',
		'Maquinaria Sin Carreteo - Cargadora',
		'Maquinaria Sin Carreteo - Compactador',
		'Maquinaria Sin Carreteo - Equipo Especial',
		'Maquinaria Sin Carreteo - Excavadora',
		'Maquinaria Sin Carreteo - Grúa',
		'Maquinaria Sin Carreteo - Maquinaria',
		'Maquinaria Sin Carreteo - Motoniveladora',
		'Maquinaria Sin Carreteo - Pala Frontal',
		'Maquinaria Sin Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Sin Carreteo - Retroexcavadora',
		'Maquinaria Sin Carreteo - Topadora',
		'Rodado Extranjero De Cargas Peligrosas',
		'Rodados - Acoplado',
		'Rodados - Ambulancia',
		'Rodados - Automóvil',
		'Rodados - Batea',
		'Rodados - Camión',
		'Rodados - Camión Con Hidrogrúa',
		'Rodados - Carretón',
		'Rodados - Furgón',
		'Rodados - Guinche',
		'Rodados - Minibús',
		'Rodados - Ómnibus',
		'Rodados - Pick Up - Cargas Peligrosas',
		'Rodados - Pick-Up',
		'Rodados - Semirremolque',
		'Rodados - Tanque',
		'Rodados - Tractor',
		'Rodados - Tráiler',
		'Rodados Cargas Peligrosas - Acoplado Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Camión Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Semirremolque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tanque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tractor Cargas Peligrosas'
	];
	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	let regexAZNum = /^[A-Z0-9]+$/i;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			vehicle_id: vehicle_id,
			domain: domain,
			brand: brand,
			model: model,
			type: type,
			year: year,
			internNumber: internNumber,
			chasisNumber: chasisNumber,
			motorNumber: motorNumber
			// frontPic: frontPic,
			// rightSidePic: rightSidePic,
			// leftSidePic: leftSidePic
		},
		validationSchema: yup.object().shape({
			domain: yup
				.string()
				.max(7, 'Este campo debe ser de hasta ${max} caracteres')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
				.required('Debes completar este campo.'),
			brand: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			model: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			type: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.oneOf(vehicleTypeList, 'El tipo no se encuentra en el listado.')
				.required('Debes completar este campo.'),
			year: yup
				.number()
				.min(1900, 'El año es demasiado bajo.')
				.max(9999, 'El año es demasiado alto.')
				.integer('El número debe ser entero.')
				.required('Debes completar este campo.'),
			internNumber: yup
				.number()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			chasisNumber: yup
				.string()
				.min(11, 'Este campo debe ser al menos ${max} caracteres.')
				.max(17, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
				.required('Debes completar este campo.'),
			motorNumber: yup
				.string()
				.max(15, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
		}),
		onSubmit: async (values) => {
			console.log(values);
			const submit = await fetch(`editar`, {
				method: 'PUT',
				body: JSON.stringify({
					values
				})
			});

			console.log('submit', submit);
			const data = await submit.json();
			message = data.message;
			error = data.error;
		}
	});
</script>

<form name="formVehicleDetails" id="formVehicleDetails" on:submit|preventDefault={handleSubmit}>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Patente</label>
			<input
				type="text"
				id="domain"
				name="domain"
				class="form-control"
				placeholder="AB123CD"
				aria-label="Patente"
				bind:value={$form.domain}
				on:blur={handleChange}
				class:invalid={$errors.domain}
				readonly={isReadOnly}
			/>
			{#if $errors.domain}
				<small class="form-error">{$errors.domain}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="type" class="form-label">Tipo de vehículo</label>
			{#if isReadOnly}
				<input
					type="text"
					id="type"
					name="type"
					class="form-control"
					placeholder="Pickup"
					aria-label="Tipo de vehículo"
					bind:value={$form.domain}
					readonly
				/>
			{:else}
				<select
					id="type"
					name="type"
					class="form-select"
					aria-label="Tipo de vehículo"
					bind:value={$form.type}
					on:blur={handleChange}
					class:invalid={$errors.type}
				>
					<option selected disabled>Elija una opción...</option>
					{#each vehicleTypeList as vehicleType}
						{#if type === vehicleType}
							<option value={vehicleType} selected>{vehicleType}</option>
						{:else}
							<option value={vehicleType}>{vehicleType}</option>
						{/if}
					{/each}
				</select>
				{#if $errors.type}
					<small class="form-error">{$errors.type}</small>
				{/if}
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="brand" class="form-label">Marca</label>
			<input
				type="text"
				id="brand"
				name="brand"
				class="form-control"
				placeholder="Ford"
				aria-label="Marca"
				bind:value={$form.brand}
				on:blur={handleChange}
				class:invalid={$errors.brand}
				readonly={isReadOnly}
			/>
			{#if $errors.brand}
				<small class="form-error">{$errors.brand}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="model" class="form-label">Modelo</label>
			<input
				type="text"
				id="model"
				name="model"
				class="form-control"
				placeholder="Ranger"
				aria-label="Modelo"
				bind:value={$form.model}
				on:blur={handleChange}
				class:invalid={$errors.model}
				readonly={isReadOnly}
			/>
			{#if $errors.model}
				<small class="form-error">{$errors.model}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="year" class="form-label">Año</label>
			<input
				type="number"
				id="year"
				name="year"
				class="form-control"
				placeholder="2015"
				aria-label="Año"
				min="1900"
				max="9999"
				bind:value={$form.year}
				on:blur={handleChange}
				class:invalid={$errors.year}
				readonly={isReadOnly}
			/>
			{#if $errors.year}
				<small class="form-error">{$errors.year}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="internNumber" class="form-label">Número interno</label>
			<input
				type="text"
				id="internNumber"
				name="internNumber"
				class="form-control"
				placeholder="001234"
				aria-label="Número interno"
				bind:value={$form.internNumber}
				on:blur={handleChange}
				class:invalid={$errors.internNumber}
				readonly={isReadOnly}
			/>
			{#if $errors.internNumber}
				<small class="form-error">{$errors.internNumber}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="chasisNumber" class="form-label">Número de chasis</label>
			<input
				type="text"
				id="chasisNumber"
				name="chasisNumber"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Número de chasis"
				bind:value={$form.chasisNumber}
				on:blur={handleChange}
				class:invalid={$errors.chasisNumber}
				readonly={isReadOnly}
			/>
			{#if $errors.chasisNumber}
				<small class="form-error">{$errors.chasisNumber}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="motorNumber" class="form-label">Número de motor</label>
			<input
				type="text"
				id="motorNumber"
				name="motorNumber"
				class="form-control"
				placeholder="Argentina"
				aria-label="Número de motor"
				bind:value={$form.motorNumber}
				on:blur={handleChange}
				class:invalid={$errors.motorNumber}
				readonly={isReadOnly}
			/>
			{#if $errors.motorNumber}
				<small class="form-error">{$errors.motorNumber}</small>
			{/if}
		</div>
	</div>
	{#if !isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-6" />
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" disabled={!$isValid}>
					{#if $isSubmitting}
						<i class="fas fa-spinner fa-pulse me-2" />Enviando...
					{:else}
						<i class="fas fa-pen me-2" />Confirmar cambios
					{/if}
				</button>
			</div>
		</div>
	{/if}
</form>

<style>
	#domain,
	#chasisNumber,
	#motorNumber {
		text-transform: uppercase;
	}
</style>
