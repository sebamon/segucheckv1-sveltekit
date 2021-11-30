<script context="module">
	export async function load({page , fetch}){
		let data = await Promise.all([
			fetch(`./detalle`),
			fetch(`http://localhost:3000/panel/clientes/clientes`),			
			])
			.then(async(result) => {
				
				const locationDetails = await result[0].json()
				const customerList = await result[1].json()

				console.log('ssrrrr',customerList)

				return { locationDetails , customerList }
				
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
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import { stringify } from 'querystring';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	
	export let data
	export let locationDetails = data.locationDetails.locationDetails
	export let customerList = data.customerList.customers
	console.log('script interno locationDetails', data)
	
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
	{#if data.status!=='OK'}
		<LocationDetails {...locationDetails} {isReadOnly} {customerList} />
	{:else}
		<SeguAlert message={data.message} status={data.status} path=locaciones />
	{/if}
	<!-- Formulario detalles locación -->
</main>
