<script context="module">
	export async function load({fetch, page}){
		const data = await Promise.all([
			fetch('../clientes/clientes'),
			fetch('../locaciones/locaciones'),
			fetch('../vehiculos/vehiculos'),
		])
		.then(async(result) => {
			const customerList = await result[0].json()
			const locationList = await result[1].json()
			const vehiclesList = await result[2].json()
			
			return {customerList , locationList, vehiclesList}
		})
	return {
			props: {
				data
			}
		}
	}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	export let data

	let message = ''
	let status = ''


	// Arreglo de clientes - Esto lo lee de la DB:
	export let customerList = data.customerList.customers || null

	let yupCustomer = []
	if(customerList.status==='OK')
		customerList.forEach((element) => {
			let asoc = {
				customer_id: element.customer_id,
				businessName: element.businessName
			}			
			yupCustomer.push(asoc)
		});	

	// Arreglo de locaciones - Esto lo lee de la DB:
	export let locationList = data.locationList.locations
	if(locationList.status==='OK'){
		let yupLocation =  []	
		locationList.forEach((element) => {
			yupLocation.push(element.locationName)
		});
	}
	export let newLocationList = locationList

	// Arreglo de vehículos - Esto lo lee de la DB:
	export let vehiclesList = data.vehiclesList.vehicles
	if(vehiclesList.status==='OK'){
		let yupVehicles = []
		vehiclesList.forEach(element => {
			yupVehicles.push(element.vehicle_id)
		});

	}

	// Arreglo de checkgroups - Esto lo lee de la DB:
	let checkLists = [
		{ checkItemGroup_id: 1, groupName: 'Checkgroup A' },
		{ checkItemGroup_id: 2, groupName: 'Checkgroup B' },
		{ checkItemGroup_id: 3, groupName: 'Checkgroup C' }
	];

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	import { array } from 'yup/lib/locale';
	yup.setLocale(es);
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			startDate: '',
			finishDate: '',
			statusJob: '',
			riskAnalysis: '',
			customer: '',
			location: '',
			internalNumber: '',
			checkList_id: '' ,
			vehicleSelect: '',
		},
		validationSchema: yup.object().shape({
			startDate: yup.date().required('Debes completar este campo.'),
			finishDate: yup.date().required('Debes completar este campo.'),
			statusJob: yup
				.string()
				.oneOf(
					['Programado', 'En curso', 'Finalizado'],
					'La selección no se encuentra en la lista.'
				)
				.required('Debes completar este campo.'),
			riskAnalysis: yup.mixed().required('Debes adjuntar el archivo.'),
			customer: yup
				.mixed()
				// .oneOf(yupCustomer, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
			location: yup
				.mixed()
				// .oneOf(yupLocation, 'La selección no se encuentra en la lista.')	
				.required('Debes completar este campo.'),
			vehicleSelect: yup
				.mixed()
				// .oneOf(vehiclesList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
				checkList_id: yup
				.mixed()
				// .oneOf(checkItemGroupList, 'La selección no se encuentra en la lista.'),
				
		
		}),
		onSubmit: async(values) => {
			console.log('values submit',values)
			try {
				const response = await fetch('trabajos', {
					method: 'POST',
					body: JSON.stringify({
						values
					}),
				})
				const data = await response.json()
				message = data.message
				status = data.status
				cleanPage()
			} catch (error) {
				console.error(error)
			}
		},
	});
	function cleanPage(){
		$form.startDate = ''
		$form.finishDate = ''
		$form.statusJob = ''
		$form.riskAnalysis = ''
		$form.customer = ''
		$form.location = ''
		$form.internalNumber = ''
		$form.checkList_id = ''
		$form.vehicleSelect = ''
	}

	export function showLocation(e){
		console.log('showLocation', e.target.value)
		newLocationList = locationList.filter(location => location.customer.customer_id == e.target.value)	
	}
</script>

<svelte:head>
	<title>Nuevo trabajo - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/trabajos">Trabajo</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-briefcase me-4" />Nuevo trabajo</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

{#await data then data} 
{#if status}
	<SeguAlert message={message} status={status} path=trabajos />
{/if}
<!-- Formulario nuevo trabajo -->
<form name="formJobDetails" id="formJobDetails" on:submit|preventDefault={handleSubmit}>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="startDate" class="form-label">Fecha de Inicio</label>
			<input
				type="date"
				id="startDate"
				name="startDate"
				class="form-control"
				placeholder="2000-12-31"
				aria-label="Fecha de Inicio"
				bind:value={$form.startDate}
				on:blur={handleChange}
				class:invalid={$errors.startDate}
			/>
			{#if $errors.startDate}
				<small class="form-error">{$errors.startDate}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="finishDate" class="form-label">Fecha de Fin</label>
			<input
				type="date"
				id="finishDate"
				name="finishDate"
				class="form-control"
				placeholder="2000-12-31"
				aria-label="Fecha de Fin"
				bind:value={$form.finishDate}
				on:blur={handleChange}
				class:invalid={$errors.finishDate}
			/>
			{#if $errors.finishDate}
				<small class="form-error">{$errors.finishDate}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="statusJob" class="form-label">Estado</label>
			<select
				id="statusJob"
				class="form-select"
				aria-label="Estado"
				bind:value={$form.statusJob}
				on:blur={handleChange}
				class:invalid={$errors.statusJob}
			>
				<option selected disabled>Elija una opción...</option>
				<option value="Programado">Programado</option>
				<option value="En curso">En curso</option>
				<option value="Finalizado">Finalizado</option>
			</select>
			{#if $errors.statusJob}
				<small class="form-error">{$errors.statusJob}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="riskAnalysis" class="form-label">Análisis de riesgos</label>
			<!-- Acepta documentos, planillas, presentaciones, imágenes y sus variantes libres-->
			<input
				class="form-control"
				type="file"
				accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
				application/vnd.oasis.opendocument.text, 
				application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
				application/vnd.oasis.opendocument.spreadsheet
				application/vnd.ms-powerpoint, pplication/vnd.openxmlformats-officedocument.presentationml.slideshow, 
				application/vnd.openxmlformats-officedocument.presentationml.presentation, 
				application/vnd.oasis.opendocument.presentation,
				text/plain, application/vnd.oasis.opendocument.text
				application/pdf, image/*"
				id="riskAnalysis"
				bind:value={$form.riskAnalysis}
				on:blur={handleChange}
				class:invalid={$errors.riskAnalysis}
			/>
			{#if $errors.riskAnalysis}
				<small class="form-error">{$errors.riskAnalysis}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select
				id="customer"
				class="form-select"
				aria-label="Cliente"
				bind:value={$form.customer}
				on:change={showLocation}				
				class:invalid={$errors.customer}
			>
				<option selected disabled>Elija una opción...</option>
				{#each customerList as  customer }
					<option value={customer.customer_id}>{customer.businessName}</option>
				{/each}
			</select>
			{#if $errors.customer}
				<small class="form-error">{$errors.customer}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="location" class="form-label">Locación</label>
			<select
				id="location"
				class="form-select"
				aria-label="Locación"
				bind:value={$form.location}
				
				class:invalid={$errors.location}
			>
				<option selected disabled>Elija una opción...</option>
				{#each newLocationList as { location_id, locationName }}
					<option value={location_id}>{locationName}</option>
				{/each}
			</select>
			{#if $errors.location}
				<small class="form-error">{$errors.location}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="internalNumber" class="form-label">Número interno de vehículo</label>
			<input
				type="text"
				id="internalNumber"
				name="internalNumber"
				class="form-control"
				placeholder="1234"
				aria-label="Número interno de vehículo"
				list=internalNumberList
				bind:value={$form.vehicleSelect}
			
				class:invalid={$errors.vehicleSelect}
			/>
			<datalist id="internalNumberList">
				{#each vehiclesList as { vehicle_id, domain, brand, model }}
					<option value={vehicle_id} label="{domain} - {brand} {model}">{domain} - {brand} {model}</option>
				{/each}
			</datalist>
			{#if $errors.vehicleSelect}
				<small class="form-error">{$errors.internalNumber}</small>
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
{/await}