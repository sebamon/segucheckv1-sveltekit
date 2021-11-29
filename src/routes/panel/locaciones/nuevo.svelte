<script context="module">
	export async function load({fetch , page}){
		try {

		const customerRequest = await fetch('http://localhost:3000/panel/clientes/clientes', {
			method : 'GET',
		})
		const data = await customerRequest.json()

		return {
			props:{
				data
			}
		}
		}catch (error) {
			console.error(error)
			return {
				props : {}
			}
		}
	}	
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';

	export let data

	// Arreglo de clientes - Esto lo lee de la DB:

	export let status = ''
	export let message = ''
	export let customers = data.customers ? data.customers : []
	// export let status = 'NEW'
	// export let customers = data.customers

	$: status
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
	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
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
			locationName: '',
			coordinates: '',
			province: '',
			customer: customers,
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
			/* customer: yup.mixed()
			 yup.mixed().oneOf(customers, 'El cliente indicado no se encuentra en la lista.') */
		}),
		onSubmit: async (values) => {
			// Realiza la carga de datos al cliquear Enviar
			const submit = await fetch(`locaciones`, {
				method : 'POST',
				body : JSON.stringify({
					values,
				}),
			})
			const data = await submit.json()
			status = data.status
			message = data.message

			$form.locationName = ''
			$form.coordinates = ''
			$form.province = ''
			$form.customer = 0
		}
	});
</script>

<svelte:head>
	<title>Nueva locación - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-map-marked me-4" />Nueva locación</h1>
	<p class="lead">Ingrese los detalles a continuación</p>
</header>

<!-- Formulario nueva locación -->
{#if data.status!=='OK' }
	<SeguAlert message={data.message} status={data.status} path=locaciones/>
{/if}
<form name="formLocationDetails" id="formLocationDetails" on:submit|preventDefault={handleSubmit}>
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
			class:invalid={$errors.locationName}
			/>
			{#if $errors.locationName}
			<small class="form-error">{$errors.locationName}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select
			id="customer"
			class="form-select"
			aria-label="Cliente"
			value={$form.customer}
			on:blur={handleChange}
			class:invalid={$errors.customer}
			>
			<option selected disabled>Elija una opción...</option>
			{#each customers as customer}
				<option value={customer.customer_id}>{customer.businessName}</option>
			{/each}
		</select>
		{#if $errors.customer}
		<small class="form-error">{$errors.customer}</small>
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
		aria-label="Coordenidas"
		bind:value={$form.coordinates}
		on:blur={handleChange}
		class:invalid={$errors.coordinates}
		/>
		{#if $errors.coordinates}
		<small class="form-error">{$errors.coordinates}</small>
		{/if}
	</div>
	<!-- Editar BD si lo usamos:
		<label for="coordinates" class="form-label">Coordenida Y</label>
		<input
		type="text"
		id="coordinateY"
		name="coordinateY"
		class="form-control"
		placeholder="-67.66"
		aria-label="Coordenida Y"
		bind:value={$form.coordeniteY}
		on:blur={handleChange}
		class:invalid={$errors.coordinates}
		/> -->
		<div class="col-md-6">
			<label for="province" class="form-label">Provincia</label>
			<select
			id="province"
			class="form-select"
			aria-label="Provincia"
				bind:value={$form.province}
				on:blur={handleChange}
				class:invalid={$errors.province}
				>
				<option selected disabled>Elija una opción...</option>
				{#each provinceList as province}
				<option value={province}>{province}</option>
				{/each}
			</select>
			{#if $errors.province}
			<small class="form-error">{$errors.province}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6" />
		<div class="col-md-6 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary" disabled={!$isValid}>
				{#if $isSubmitting}
				<i class="fas fa-spinner fa-pulse me-2" />Enviando...
				{:else}
				<i class="fas fa-plus me-2" />Crear
				{/if}
			</button>
		</div>
	</div>
</form>

