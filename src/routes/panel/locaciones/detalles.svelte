<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Locación de ejemplo::
	let locationDetails = {
		location_id: 1,
		locationName: 'Refinería Plaza Huincul',
		coordenates: '-38.74,-67.66',
		// coordenateY: '-67.66',
		province: 'Neuquén',
		customer: { customer_id: 3, bussinessName: 'YPF' }
	};
</script>

<svelte:head>
	<title>Locación: {locationDetails.locationName} - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-map-marked me-4" />{locationDetails.locationName}</h1>
		<p class="lead">Detalles de la locación</p>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/operarios/editar">
			<i class="fas fa-pen me-2" />Editar
		</Button>
	</div>
</header>

<!-- Formulario detalles locación -->
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
				value={locationDetails.locationName}
				readonly
			/>
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<input
				type="text"
				id="customer"
				name="customer"
				class="form-control"
				placeholder="Cliente X"
				aria-label="Cliente"
				value={locationDetails.customer.bussinessName}
				readonly
			/>
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
				value={locationDetails.coordenates}
				readonly
			/>
		</div>
		<div class="col-md-6">
			<label for="province" class="form-label">Provincia</label>
			<input
				type="text"
				id="province"
				name="province"
				class="form-control"
				placeholder="Neuquén"
				aria-label="Provincia"
				value={locationDetails.province}
				readonly
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0104807882767!2d-69.1899611978548!3d-38.92952028151186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960c6f2c11011405%3A0xe0df2e0585067db2!2sRefineria%20Ypf!5e0!3m2!1ses-419!2sar!4v1634860550780!5m2!1ses-419!2sar"
				width="100%"
				height="500px"
				loading="lazy"
				alt="Mapa de {locationDetails.locationName}"
				title="Mapa de {locationDetails.locationName}"
			/>
		</div>
	</div>
</form>
