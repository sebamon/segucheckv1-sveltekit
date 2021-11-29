<script context="module">
	export async function load({page , fetch}){
		try{
			const response = await fetch(`./detalle`)
			const data = await response.json()
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
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import { stringify } from 'querystring';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	
	export let data
	export let locationDetails = data.locationDetails
	console.log('script interno locationDetails', locationDetails)
	
	// Configurar componente LocationDetails para editar
	export let isReadOnly = false;
</script>

<svelte:head>
	<title>Editar locación: {locationDetails.locationName} - SeguCheck</title>
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
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
</header>

<main>
	{#if data.status==='OK'}
		<LocationDetails {...locationDetails} {isReadOnly} />
	{:else}
		<SeguAlert message={data.message} status={data.status} path=locaciones />
	{/if}
	<!-- Formulario detalles locación -->
</main>
