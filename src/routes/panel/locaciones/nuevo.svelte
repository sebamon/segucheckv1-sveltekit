<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, bussinessName: 'Cliente A' },
		{ customer_id: 2, bussinessName: 'Cliente B' },
		{ customer_id: 3, bussinessName: 'Cliente C' }
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
</script>

<svelte:head>
	<title>Nueva locación - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-map-marked me-4" />Nueva locación</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

<!-- Formulario nuevo usuario -->
<form name="formLocationDetails" id="formLocationDetails">
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
				required
			/>
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select id="customer" class="form-select" aria-label="Cliente" required>
				<option selected disabled>Elija una opción...</option>
				{#each customerList as { customer_id, bussinessName }}
					<option value={customer_id}>{bussinessName}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="coordenates" class="form-label">Coordenadas</label>
			<input
				type="text"
				id="coordenates"
				name="coordenates"
				class="form-control"
				placeholder="-38.74,-67.66"
				aria-label="Coordenadas"
			/>
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select id="customer" class="form-select" aria-label="Cliente" required>
				<option selected disabled>Elija una opción...</option>
				{#each provinceList as province}
					<option value={province}>{province}</option>
				{/each}
			</select>
			<!-- Editar BD si lo usamos:
			<label for="coordenates" class="form-label">Coordenada Y</label>
			<input
				type="text"
				id="coordenateY"
				name="coordenateY"
				class="form-control"
				placeholder="-67.66"
				aria-label="Coordenada Y"
				disabled
			/> -->
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
