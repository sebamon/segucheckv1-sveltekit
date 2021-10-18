<script lang="ts">
	import VehicleDetails from '$lib/Details/VehicleDetails.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Image
	} from 'sveltestrap';

	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	let vehicleDetails = {
		vehicle_id: 10,
		domain: 'AB123CD',
		type: 43,
		brand: 'Ford',
		model: 'Ranger',
		year: 2015,
		internal_id: 1234,
		chasisNumber: 1214161820,
		motorNumber: 2356891256,
		frontPicUrl: 'https://avatars.dicebear.com/api/bottts/1234.svg',
		leftSidePicUrl: 'https://avatars.dicebear.com/api/bottts/1235.svg',
		rigthSidePicUrl: 'https://avatars.dicebear.com/api/bottts/1236.svg',
		backPicUrl: 'https://avatars.dicebear.com/api/bottts/1237.svg',
	};
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Vehículo: {vehicleDetails.domain} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/vehiculos">Vehículos</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-md-3">
		<Image
			fluid
			thumbnail
			src={vehicleDetails.frontPicUrl}
			alt="Foto de perfil"
			class="m-2"
			style="max-width:150px"
		/>
	</div>
	<div class="col-auto">
		<h1>{vehicleDetails.domain}</h1>
		<h5>Detalles del vehículo</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/vehiculos/editar"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<!-- Detalles -->
<VehicleDetails {...vehicleDetails} />
