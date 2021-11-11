<script lang="ts">
	import { format } from 'path/posix';
	import { validate_store } from 'svelte/internal';

	// Datos del usuario a mostrar
	export let vehicle_id: number;
	export let domain = '';
	export let type: string;
	export let brand: string;
	export let model: string;
	export let year: number;
	export let internal_id = vehicle_id;
	export let chasisNumber = 0;
	export let motorNumber = 0;

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

	export let error: string;
	export let message: string;
	export let color;
	export let status;

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
	const submitForm = async (): Promise<void> => {
		// Protip: Pasar domain, chasisNumber y motorNumber a uppercase!
		const formBody = JSON.stringify({
			domain,
			brand,
			model,
			type,
			year,
			internal_id,
			chasisNumber,
			motorNumber
			// frontPic,
			// rightSidePic,
			// leftSidePic,
		});
		/* console.log(formBody); */
		// 	const submit = await fetch(`editar`,{
		// 	method : 'PUT',
		// 	body: JSON.stringify({
		// 	})
		// })
		// 	const data = await submit.json()
		// 	message = data.message
		// 	error = data.error
		// 	if(data.status==='OK') {
		// 			color='success'
		// 		}
		// 		if(data.status==='ERROR') color='danger'

		// 		if(data.status===200)
		// 		{
		// 			console.log('message', message)
		// 		}
	};

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	/* regexNombre: Cualquier nombre con tildes y caracteres latinos (no japonés, hebreo, árabe, etc.).
	Permite espacios, comas puntos y guiones para nombres complejos. Excepto números y otros símbolos
	Fuente: https://andrewwoods.net/blog/2018/name-validation-regex/
	*/
	let regexNombre =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð&,.'\s-]+$/u;
	let regexAZNum = /^[A-Z0-9]+$/i;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			domain: domain,
			brand: brand,
			model: model,
			type: type,
			year: year,
			internal_id: internal_id,
			chasisNumber: chasisNumber,
			motorNumber: motorNumber
			// frontPic: frontPic,
			// rightSidePic: rightSidePic,
			// leftSidePic: leftSidePic
		},
		validationSchema: yup.object().shape({
			domain: yup
				.string()
				.required('Debes completar este campo.')
				.max(7, 'Este campo debe ser de hasta ${max} caracteres')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.'),
			brand: yup
				.string()
				.required('Debes completar este campo.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			model: yup
				.string()
				.required('Debes completar este campo.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			type: yup
				.string()
				.required('Debes completar este campo.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.oneOf(vehicleTypeList, 'El tipo no se encuentra en el listado.'),
			year: yup
				.number()
				.required('Debes completar este campo.')
				.min(1900, 'El año es demasiado bajo.')
				.max(9999, 'El año es demasiado alto.'),
			internal_id: yup
				.string()
				.required('Debes completar este campo.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			chasisNumber: yup
				.string()
				.required('Debes completar este campo.')
				.min(11, 'Este campo debe ser al menos ${max} caracteres.')
				.max(17, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.'),
			motorNumber: yup
				.string()
				.max(15, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
		}),
		onSubmit: (values) => {
			// -- Muestra resultado en submit: BORRAR --
			alert(JSON.stringify(values));
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
				value={$form.domain}
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
			<select
				id="type"
				name="type"
				class="form-select"
				aria-label="Tipo de vehículo"
				bind:value={$form.type}
				on:blur={handleChange}
				class:invalid={$errors.type}
				required
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
				value={$form.brand}
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
				value={$form.model}
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
				value={$form.year}
				on:blur={handleChange}
				class:invalid={$errors.year}
				readonly={isReadOnly}
			/>
			{#if $errors.year}
				<small class="form-error">{$errors.year}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="internal_id" class="form-label">Número interno</label>
			<input
				type="text"
				id="internal_id"
				name="internal_id"
				class="form-control"
				placeholder="001234"
				aria-label="Número interno"
				value={$form.internal_id}
				on:blur={handleChange}
				class:invalid={$errors.internal_id}
				readonly={isReadOnly}
			/>
			{#if $errors.internal_id}
				<small class="form-error">{$errors.internal_id}</small>
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
				value={$form.chasisNumber}
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
				value={$form.motorNumber}
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
	#domain, #chasisNumber, #motorNumber {
		text-transform: uppercase;
	}
</style>