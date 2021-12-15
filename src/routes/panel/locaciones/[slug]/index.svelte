<script context="module">
	export async function load({page , fetch}){
		console.log(page.params.slug)
		try{
			
			let data = await Promise.all([
			fetch('http://localhost:3000/panel/clientes/clientes'),
			fetch(`./${page.params.slug}/detalle`),

		])
		.then(async(result) => {
			const customerList = await result[0].json()
			const locationDetails = await result[1].json()
			console.log('ssr' ,locationDetails)

			
			return { customerList , locationDetails }
		})
			return {
				props: {
					...data
				}
			}
		}catch(error)
		{
			console.log(error)
			return {
				props: {
					status : 'ERROR',
					message : error
				}
			}
		}
	}
</script>

<script lang="ts">
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
import { onMount } from 'svelte';
import { json } from 'stream/consumers';


	// export let data
	// export let data2
	// let locationDetails = data.locationDetails.locationDetails
	export let customerList
	// = data.customerList.customers
	export let locationDetails
	export let status = locationDetails.status || 'ERROR'
	export let message = locationDetails.message || 'ERROR'
	// let location = locationDetails
	// = data.locationDetails.locationDetails

	// export let locationDetails = data.locationDetails.locationDetails
	// export let customerList = data.customerList.customers

	// Configurar componente LocationDetails para solo lectura
	export let isReadOnly = true;
	// console.log('data en script',data)
</script>
<svelte:head>
	<title>Locación: locationDetails.locationDetail.locationName - SeguCheck</title>
	
</svelte:head>
{#await locationDetails then locationDetails}
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones/{locationDetails.locationDetails.location_id}/">{locationDetails.locationDetails.locationName}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
</header>

<main>
	<!-- Formulario detalles locación -->


	{#if status == 'OK'}
		<LocationDetails {...locationDetails.locationDetails} {isReadOnly} {...customerList}/>
	{:else}
		<SeguAlert status={status} message={message} path=locaciones />
	{/if} 


</main>
{/await}