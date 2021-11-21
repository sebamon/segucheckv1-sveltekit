<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, businessName: 'Cliente A' },
		{ customer_id: 2, businessName: 'Cliente B' },
		{ customer_id: 3, businessName: 'Cliente C' }
	];
	// Arreglo de locaciones - Esto lo lee de la DB:
	let locationList = [
		{ location_id: 1, locationName: 'Locación A' },
		{ location_id: 2, locationName: 'Locación B' },
		{ location_id: 3, locationName: 'Locación C' }
	];
	// Arreglo de vehículos - Esto lo lee de la DB:
	let internalNumberList = [
		{ vehicle_id: 1, internalNumber: 1000, domain: 'AA123BB', brand: 'Marca A', model: 'Modelo X' },
		{ vehicle_id: 2, internalNumber: 1001, domain: 'CC456DD', brand: 'Marca B', model: 'Modelo Y' },
		{ vehicle_id: 3, internalNumber: 1002, domain: 'EE789FF', brand: 'Marca C', model: 'Modelo Z' }
	];
	// Arreglo de checkgroups - Esto lo lee de la DB:
	let checkItemGroupList = [
		{ checkItemGroup_id: 1, groupName: 'Checkgroup A' },
		{ checkItemGroup_id: 2, groupName: 'Checkgroup B' },
		{ checkItemGroup_id: 3, groupName: 'Checkgroup C' }
	];

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			startDate: '',
			finishDate: '',
			status: '',
			riskAnalysis: '',
			customer: '',
			location: '',
			internalNumber: '',
			checkItemGroup_id: ''
		},
		validationSchema: yup.object().shape({
			startDate: yup.date().required('Debes completar este campo.'),
			finishDate: yup.date().required('Debes completar este campo.'),
			status: yup
				.string()
				.oneOf(
					['Programado', 'En curso', 'Finalizado'],
					'La selección no se encuentra en la lista.'
				)
				.required('Debes completar este campo.'),
			riskAnalysis: yup.mixed().required('Debes adjuntar el archivo.'),
			customer: yup
				.mixed()
				.oneOf(customerList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
			location: yup
				.mixed()
				.oneOf(locationList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
			internalNumber: yup
				.mixed()
				.oneOf(internalNumberList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.'),
			checkItemGroup_id: yup
				.mixed()
				.oneOf(checkItemGroupList, 'La selección no se encuentra en la lista.')
				.required('Debes completar este campo.')
		}),
		onSubmit: (values) => {
			// Realiza la carga de datos al cliquear Enviar
			alert(JSON.stringify(values));
		}
	});
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
			<label for="status" class="form-label">Estado</label>
			<select
				id="status"
				class="form-select"
				aria-label="Estado"
				bind:value={$form.status}
				on:blur={handleChange}
				class:invalid={$errors.status}
			>
				<option selected disabled>Elija una opción...</option>
				<option value="Programado">Programado</option>
				<option value="En curso">En curso</option>
				<option value="Finalizado">Finalizado</option>
			</select>
			{#if $errors.status}
				<small class="form-error">{$errors.status}</small>
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
				on:blur={handleChange}
				class:invalid={$errors.customer}
			>
				<option selected disabled>Elija una opción...</option>
				{#each customerList as { customer_id, businessName }}
					<option value={customer_id}>{businessName}</option>
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
				on:blur={handleChange}
				class:invalid={$errors.location}
			>
				<option selected disabled>Elija una opción...</option>
				{#each locationList as { location_id, locationName }}
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
				list="internalNumberList"
				bind:value={$form.internalNumber}
				on:blur={handleChange}
				class:invalid={$errors.internalNumber}
			/>
			<datalist id="internalNumberList">
				{#each internalNumberList as { internalNumber, domain, brand, model }}
					<option value={internalNumber} label="{domain} - {brand} {model}" />
				{/each}
			</datalist>
			{#if $errors.internalNumber}
				<small class="form-error">{$errors.internalNumber}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="checkItemGroup_id" class="form-label">Número de checkgroup</label>
			<select
				id="checkItemGroup_id"
				class="form-select"
				aria-label="Número de checkgroup"
				bind:value={$form.checkItemGroup_id}
				on:blur={handleChange}
				class:invalid={$errors.checkItemGroup_id}
			>
				<option selected disabled>Elija una opción...</option>
				{#each checkItemGroupList as { checkItemGroup_id, groupName }}
					<option value={checkItemGroup_id}>{groupName}</option>
				{/each}
			</select>
			{#if $errors.checkItemGroup_id}
				<small class="form-error">{$errors.checkItemGroup_id}</small>
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
