<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, bussinessName: 'Cliente A' },
		{ customer_id: 2, bussinessName: 'Cliente B' },
		{ customer_id: 3, bussinessName: 'Cliente C' }
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
<form name="formJobDetails" id="formJobDetails">
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
				required
			/>
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
				required
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="status" class="form-label">Estado</label>
			<select id="status" class="form-select" aria-label="Estado" required>
				<option selected disabled>Elija una opción...</option>
				<option value="Programado">Programado</option>
				<option value="En curso">En curso</option>
				<option value="Finalizado">Finalizado</option>
			</select>
		</div>
		<div class="col-md-6">
			<label for="riskAnalysis" class="form-label">Análisis de riesgos</label>
			<input class="form-control" type="file" id="riskAnalysis" />
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select id="customer" class="form-select" aria-label="Cliente" required>
				<option selected disabled>Elija una opción...</option>
				{#each customerList as { customer_id, bussinessName }}
					<option value={customer_id}>{bussinessName}</option>
				{/each}
			</select>
		</div>
		<div class="col-md-6">
			<label for="location" class="form-label">Locación</label>
			<select id="location" class="form-select" aria-label="Locación" required>
				<option selected disabled>Elija una opción...</option>
				{#each locationList as { location_id, locationName }}
					<option value={location_id}>{locationName}</option>
				{/each}
			</select>
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
			/>
			<datalist id="internalNumberList">
				{#each internalNumberList as { internalNumber, domain, brand, model }}
					<option value={internalNumber} label="{domain} - {brand} {model}" />
				{/each}
			</datalist>
		</div>
		<div class="col-md-6">
			<label for="checkItemGroup_id" class="form-label">Número de checkgroup</label>
			<select id="checkItemGroup_id" class="form-select" aria-label="Número de checkgroup">
				<option selected disabled>Elija una opción...</option>
				<option value="1">Checkgroup A</option>
				<option value="2">Checkgroup B</option>
				<option value="3">Checkgroup C</option>
			</select>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6" />
		<div class="col-md-6 d-flex justify-content-end">
			<Button type="submit" color="primary">
				<i class="fas fa-plus me-2" />Crear
			</Button>
		</div>
	</div>
</form>
