<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Locación de ejemplo:
	let locationDetails = {
		location_id: 1,
		locationName: 'Refinería Plaza Huincul',
		coordenates: '-38.74,-67.66',
		// coordenateY: '-67.66',
		province: 'Neuquén',
		customer: { customer_id: 3, bussinessName: 'YPF' }
	};

	// Configurar componente LocationDetails para solo lectura
	export let isReadOnly = true;
</script>

<svelte:head>
	<title>Locación: {locationDetails.locationName} - SeguCheck</title>
</svelte:head>

<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones/{locationDetails.location_id}/">{locationDetails.locationName}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
</header>

<main>
	<!-- Formulario detalles locación -->
	<LocationDetails {...locationDetails} {isReadOnly} />
</main>
