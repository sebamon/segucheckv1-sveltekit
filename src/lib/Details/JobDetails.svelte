<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Modal, ResponsiveContainer } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import moment from 'moment';



	export let job_id: number;
	export let startDate: Date;
	export let finishDate: Date;
	export let statusJob: string;
	export let message: string
	export let status:string = 'OK'
	export let vehicle_id=0
	export let riskAnalysis
	export let customer
	export let location
	export let internalNumber: number;
	export let checkItemGroup_id: number;
	export let vehicle
	export let checkitemgroup ;
	
	let dateString = moment.utc(startDate).format('YYYY/MM/DD');
	let convertedStartDate= new Date(
		new Date(dateString).getTime() - new Date().getTimezoneOffset()
		)
		.toISOString()
		.split('T')[0];
		dateString = moment.utc(finishDate).format('YYYY/MM/DD');
		let convertedFinishDate= new Date(
			new Date(dateString).getTime() - new Date().getTimezoneOffset()
			)
			.toISOString()
			.split('T')[0];
			
			
			// Por defecto, el componente se llama como solo lectura:
			export let isReadOnly = true;
			
			// Arreglo de clientes - Esto lo lee de la DB:
			export let customerList = [
				{ customer_id: 1, businessName: 'Cliente A' },
				{ customer_id: 2, businessName: 'Cliente B' },
				{ customer_id: 3, businessName: 'Cliente C' }
			];
			// Arreglo de locaciones - Esto lo lee de la DB:
			export let locationList = [
				{ location_id: 1, locationName: 'Locación A' },
				{ location_id: 2, locationName: 'Locación B' },
				{ location_id: 3, locationName: 'Locación C' }
			];
			console.log('locationList', locationList)
			export let newLocationList = locationList
			// Arreglo de vehículos - Esto lo lee de la DB:
			export let vehiclesList = [
				{ vehicle_id: 1, internalNumber: 1000, domain: 'AA123BB', brand: 'Marca A', model: 'Modelo X' },
		{ vehicle_id: 2, internalNumber: 1001, domain: 'CC456DD', brand: 'Marca B', model: 'Modelo Y' },
		{ vehicle_id: 3, internalNumber: 1002, domain: 'EE789FF', brand: 'Marca C', model: 'Modelo Z' }
	];
	// Arreglo de operadores - Esto lo lee de la DB:
	let operatorsList = [
		{ cuit: 1234567890, firstName: 'Nombre A', lastName: 'Apellido A' },
		{ cuit: 1234567891, firstName: 'Nombre B', lastName: 'Apellido B' },
		{ cuit: 1234567892, firstName: 'Nombre C', lastName: 'Apellido C' },
	];
	// Arreglo de checkgroups - Esto lo lee de la DB:
	let checkItemGroupList = [
		{ checkItemGroup_id: 1, groupName: 'Checkgroup A' },
		{ checkItemGroup_id: 2, groupName: 'Checkgroup B' },
		{ checkItemGroup_id: 3, groupName: 'Checkgroup C' }
	];
	// Arreglo filtrado según si existe el checkgroup en el arreglo de seleccionados 
    // let checkgroupFilter = checkItemGroupList.filter(item => checkgroupRequired.includes(item.checkItemGroup_id))

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	import VehicleDetails from './VehicleDetails.svelte';
	import CustomerDetails from './CustomerDetails.svelte';
	yup.setLocale(es);
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			startDate: convertedStartDate,
			finishDate: convertedFinishDate,
			statusJob: statusJob,
			riskAnalysis: riskAnalysis,
			customer: customer.customer_id,
			location: location.location_id,
			vehicle_id: vehicle.vehicle_id,
			checkItemGroup_id: checkItemGroup_id,
			checkItemGroup : checkItemGroupList[0]
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
				.mixed(),
				// .oneOf(customerList, 'La selección no se encuentra en la lista.')
				// .required('Debes completar este campo.'),
			location: yup
				.mixed(),
				// .oneOf(locationList, 'La selección no se encuentra en la lista.')
				// .required('Debes completar este campo.'),
			vehicle_id: yup
				.mixed()
				// .oneOf(vehiclesList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
			 checkgroupRequired: yup
				.mixed()
				// .oneOf(checkItemGroupList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.')
		}),
		onSubmit: async (values) => {
			// Realiza la carga de datos al cliquear Enviar
			console.log(values);
			try{
				const submit = await fetch(`editar`, {
					method : 'PUT',
					body: JSON.stringify({
						values
					})
				})
				const data = await submit.json()
				message = data.message;				
				status = data.status

			}catch(e){
				console.log(e)
			}
		}
	});
	export function showLocation(e){
		console.log('showLocation', e.target.value)
		newLocationList = locationList.filter(location => location.customer.customer_id == e.target.value)	
	}

	// Abrir modal para ver adjunto:
	let modalOpen = false;
	const toggle = () => (modalOpen = !modalOpen);
</script>
{#if status !== 'OK'} 
	<SeguAlert {status} {message} path="trabajos" />
{/if}
<form name="formJobDetails" id="formJobDetails" on:submit|preventDefault={handleSubmit}>
	{#if isReadOnly}
		<div class="hstack gap-3">
			<h2 class="my-4"><i class="fas fa-info me-4" />Datos básicos</h2>
			<div class="ms-auto">
				<a class="btn btn-primary" href="/panel/trabajos/{job_id}/editar">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{:else}
		<h2><i class="fas fa-info me-4" />{job_id}</h2>
		<p class="lead">Indique los detalles a continuación</p>
	{/if}
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="startDate" class="form-label">Fecha de Inicio</label>
			<input
				type="date"
				id="startDate"
				name="startDate"
				class="form-control"
				placeholder="2021-12-31"
				aria-label="Fecha de Inicio"
				bind:value={$form.startDate}
				on:blur={handleChange}
				readonly={isReadOnly}
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
				placeholder="2022-12-31"
				aria-label="Fecha de Fin"
				bind:value={$form.finishDate}
				on:blur={handleChange}
				readonly={isReadOnly}
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
			{#if isReadOnly}
				<input
					type="text"
					id="statusJob"
					name="statusJob"
					class="form-control"
					placeholder="Programado"
					aria-label="Estado"
					bind:value={$form.statusJob}
					readonly
				/>
			{:else}
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
			{/if}
		</div>
		<div class="col-md-6">
			<label for="riskAnalysis" class="form-label">Análisis de riesgos</label>
			{#if isReadOnly}
				<br />
				<button type="button" on:click={toggle} class="btn btn-primary">
					<i class="fas fa-eye me-2" />Ver adjunto
				</button>
				<Modal body header="Análisis de riesgos" isOpen={modalOpen} {toggle} fullscreen>
					<embed src={riskAnalysis} width="100%" height="100%" />
				</Modal>
			{:else}
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
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-4">
			<label for="customer" class="form-label">Cliente</label>
			{#if isReadOnly}
				<p class="form-control">
					<a href="/panel/clientes/{customer.customer_id}">
						{customer.businessName}
					</a>
				</p>
			{:else}
				<select
					id="customer"
					class="form-select"
					aria-label="Cliente"
					bind:value={$form.customer}
					
					on:change={showLocation}
					class:invalid={$errors.customer}
				>
					<option selected disabled>Elija una opción...</option>
					{#each customerList as { customer_id, businessName }}
						<option value={customer_id} selected={customer_id == customer.customer_id}>{businessName}</option>
					{/each}
				</select>
				{#if $errors.customer}
					<small class="form-error">{$errors.customer}</small>
				{/if}
			{/if}
		</div>
		<div class="col-md-4">
			<label for="location" class="form-label">Locación</label>
			{#if isReadOnly}
				<p class="form-control">
					<a href="/panel/locaciones/{location.location_id}">
						{location.locationName}
					</a>
				</p>
			{:else}
				<select
					id="location"
					class="form-select"
					aria-label="Locación"
					bind:value={$form.location}					
					class:invalid={$errors.location}
				>
					<option selected disabled>Elija una opción...</option>
					{#each newLocationList as { location_id, locationName }}
						<option value={location_id} selected={location_id == location.location_id}>{locationName}</option>
					{/each}
				</select>
				{#if $errors.location}
					<small class="form-error">{$errors.location}</small>
				{/if}
			{/if}
		</div>
		<div class="col-md-4">
			<label for="internalNumber" class="form-label">Número interno de vehículo</label>
			{#if isReadOnly}
				<p class="form-control">
					<a href="/panel/vehiculos/{vehicle.vehicle_id}">
						{vehicle.domain} - {vehicle.brand} - {vehicle.model}
					</a>
				</p>
			{:else}
				<input
					type="text"
					id="vehicle_id"
					name="vehicle_id"
					class="form-control"
					placeholder="1234"
					aria-label="Número interno de vehículo"
					list="vehicleList"
					bind:value={$form.vehicle_id}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.vehicle_id}
				/>
				<datalist id="internalNumberList">
					{#each vehiclesList as { internalNumber, domain, brand, model ,vehicle_id}}
						<option value={vehicle_id} selected={vehicle_id === vehicle.vehicle_id} label="{domain} - {brand} {model}" />
					{/each}
				</datalist>
				{#if $errors.vehicle_id}
					<small class="form-error">{$errors.vehicle_id}</small>
				{/if}
			{/if}
		</div>
		<!-- <div class="col-md-6">
			<label for="checkItemGroup_id" class="form-label">Número de checkgroup</label>
			{#if isReadOnly}
				<p class="form-control">
					<a href="/panel/checklists/{checkItemGroup_id}">
						{checkItemGroupList[0].groupName}
					</a>
				</p>
			{:else}
				<select
					id="operatorsAssigned"
					class="form-select"
					aria-label="Número de checkgroup"
					bind:value={$form.checkItemGroup_id}
					
					class:invalid={$errors.checkItemGroup_id}
				>
				{#each operatorsList as { cuit, firstName, lastName }}
					{#if operatorsAssigned.includes(cuit) }
						<option value={cuit} selected>{firstName} {lastName}</option>
					{:else}
						<option value={cuit}>{firstName} {lastName}</option>
					{/if}
				{/each}
				</select>
				{#if $errors.operatorsAssigned}
					<small class="form-error">{$errors.operatorsAssigned}</small>
				{/if}
		</div>
		<div class="col-md-6">
			<label for="checkgroupRequired" class="form-label">Checkgroups requeridos</label>
			<select
				id="checkgroupRequired"
				class="form-select"
				aria-label="Checkgroups requeridos"
				bind:value={$form.checkgroupRequired}
				on:blur={handleChange}
				multiple
			>
			{#each checkItemGroupList as { checkItemGroup_id, groupName }}
				{#if checkgroupRequired.includes(checkItemGroup_id) }
				<option value={checkItemGroup_id} selected>{groupName}</option>
				{:else}
				<option value={checkItemGroup_id}>{groupName}</option>
				{/if}
			{/each}
			</select>
			{#if $errors.checkgroupRequired}
				<small class="form-error">{$errors.checkgroupRequired}</small>
			{/if}
		</div> -->
	</div>
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
    <!-- {/if} -->
</form>
