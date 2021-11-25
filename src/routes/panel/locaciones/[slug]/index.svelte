<script context="module">
	export async function load({page , fetch}){
		try{
			const response = await fetch(`./${page.params.slug}/detalle`)
			const data = await response.json()
			console.log(JSON.stringify(data))
			return {
				props: {
					data
				}
			}

		}catch(error)
		{
			console.log(error)
			return {
				props: {}
			}
		}
	}
</script>

<script lang="ts">
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';

	export let data
	export let locationDetails = data.locationDetails
	// Locación de ejemplo:
	// let locationDetails = {
	// 	location_id: 1,
	// 	locationName: 'Refinería Plaza Huincul',
	// 	coordenates: '-38.74,-67.66',
	// 	// coordenateY: '-67.66',
	// 	province: 'Neuquén',
	// 	customer: { customer_id: 3, businessName: 'YPF' }
	// };

	// Configurar componente LocationDetails para solo lectura
	export let isReadOnly = true;
	console.log('data en script',data)
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
	{#if data.status==='OK'}
		<LocationDetails {...locationDetails} {isReadOnly} />
	{:else}
		<SeguAlert status={data.status} message={data.message} path=locaciones />
	{/if}
</main>
