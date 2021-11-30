<script lang="ts">
	import SeguAlert from '$lib/SeguAlert.svelte'
	export let location_id: number;
	export let locationName: string;
	// export let coordenateY: '-67.66':string
	export let coordinates: string;
	export let province: string;
	export let customer = {
		customer_id: 0,
		businessName: ''
	};
	export let data
	let message, status
	
	console.log('data!!!!!!!!!!!!!!!!!!!!! location',)
	export let customerList = [
		{ customer_id: 1, businessName: 'Cliente A' },
		{ customer_id: 2, businessName: 'Cliente B' },
		{ customer_id: 3, businessName: 'Cliente C' }
	];

	// Arreglo de provincias
	let provinceList = [
		'Buenos Aires',
		'Capital Federal',
		'Catamarca',
		'Chaco',
		'Chubut',
		'Córdoba',
		'Corrientes',
		'Entre Ríos',
		'Formosa',
		'Jujuy',
		'La Pampa',
		'La Rioja',
		'Mendoza',
		'Misiones',
		'Neuquén',
		'Río Negro',
		'Salta',
		'San Juan',
		'San Luis',
		'Santa Cruz',
		'Santa Fe',
		'Santiago del Estero',
		'Tierra del Fuego',
		'Tucumán'
	];

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
import { dataset_dev } from 'svelte/internal';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	/* regexName: Cualquier nombre con tildes y caracteres latinos (no japonés, hebreo, árabe, etc.).
	Permite espacios, comas puntos y guiones para nombres complejos. Excepto números y otros símbolos
	Fuente: https://andrewwoods.net/blog/2018/name-validation-regex/
	*/
	let regexName =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'\s-]+$/u;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			locationName: locationName,
			coordinates: coordinates,
			province: province,
			customer: customer.customer_id
		},
		validationSchema: yup.object().shape({
			locationName: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			coordinates: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			province: yup
				.mixed()
				.oneOf(provinceList, 'La provincia indicada no se encuentra en la lista.'),
			customer: yup.mixed(),
			// .oneOf(customerList, 'El cliente indicado no se encuentra en la lista.')
		}),
		onSubmit: async(values) => {
			// Realiza la carga de datos al cliquear Enviar
			console.log(values)
			try{
				const submit = await fetch(`editar`, {
					method : 'PUT',
					body : JSON.stringify({
						values
					}),
				})
				console.log(submit)
					const data = await submit.json()
					console.log('message',data.message)
					if(data){
						message = data.message
						status = data.status
					}
			}catch(e){
				console.log(JSON.stringify(e))
			}
		}
	});
</script>

{#if status}
	<SeguAlert {message} {status} path="locaciones" />
{/if}
<form name="formLocationDetails" id="formLocationDetails" on:submit|preventDefault={handleSubmit}>
	{#if isReadOnly}
		<div class="row">
			<div class="col-auto">
				<h1><i class="fas fa-map-marked me-4" />{locationName}</h1>
				<p class="lead">Detalles de la locación</p>
			</div>
			<div class="col-2 ms-auto">
				<a class="btn btn-primary" href="/panel/locaciones/{location_id}/editar">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{:else}
		<h1><i class="fas fa-map-marked me-4" />{locationName}</h1>
		<p class="lead">Indique los detalles a continuación</p>
	{/if}
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="locationName" class="form-label">Nombre del sitio</label>
			<input
				type="text"
				id="locationName"
				name="locationName"
				class="form-control"
				placeholder="Refinería Plaza Huincul"
				aria-label="Nombre del sitio"
				bind:value={$form.locationName}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.locationName}
			/>
			{#if $errors.locationName}
				<small class="form-error">{$errors.locationName}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			{#if isReadOnly}
				<input
					type="text"
					id="customer"
					name="customer"
					class="form-control"
					placeholder="Cliente X"
					aria-label="Cliente"
					bind:value={$form.customer}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.customer}
				/>
			{:else}
				<select id="customer" class="form-select" aria-label="Cliente" required>
					<option selected disabled>Elija una opción...</option>
					{#each customerList as { customer_id, businessName }}
						<option value={customer_id} selected={customer_id == customer.customer_id}>
							{businessName}
						</option>
					{/each}
				</select>
				{#if $errors.customer}
					<small class="form-error">{$errors.customer}</small>
				{/if}
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="coordinates" class="form-label">Coordenadas</label>
			<input
				type="text"
				id="coordinates"
				name="coordinates"
				class="form-control"
				placeholder="-38.74,-67.66"
				aria-label="Coordenadas"
				bind:value={$form.coordinates}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.coordinates}
			/>
			{#if $errors.coordinates}
				<small class="form-error">{$errors.coordinates}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="province" class="form-label">Provincia</label>
			{#if isReadOnly}
				<input
					type="text"
					id="province"
					name="province"
					class="form-control"
					placeholder="Neuquén"
					aria-label="Provincia"
					bind:value={$form.province}
					readonly
				/>
			{:else}
				<select
					id="province"
					class="form-select"
					aria-label="Provincia"
					bind:value={$form.province}
					on:blur={handleChange}
					class:invalid={$errors.province}
				>
					<option disabled>Elija una opción...</option>
					{#each provinceList as thisProvince}
						<option value={thisProvince} selected={thisProvince === province}>{thisProvince}</option>
					{/each}
				</select>
				{#if $errors.province}
					<small class="form-error">{$errors.province}</small>
				{/if}
			{/if}
		</div>
	</div>
	{#if isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-12">
				<small class="fst-italic">Mapa placeholder: No está integrado como API</small>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0104807882767!2d-69.1899611978548!3d-38.92952028151186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960c6f2c11011405%3A0xe0df2e0585067db2!2sRefineria%20Ypf!5e0!3m2!1ses-419!2sar!4v1634860550780!5m2!1ses-419!2sar"
					width="100%"
					height="500px"
					loading="lazy"
					alt="Mapa de {locationName}"
					title="Mapa de {locationName}"
				/>
			</div>
		</div>
	{:else}
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
