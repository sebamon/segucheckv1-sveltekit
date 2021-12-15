<script context="module">

	export async function load({page , fetch}){
		console.log(page.params.slug)
		if(!isNaN(page.params.slug)){

			try{
				
				let data = await Promise.all([
					fetch('http://localhost:3000/panel/clientes/clientes'),
					fetch(`http://localhost:3000/panel/locaciones/${page.params.slug}/detalle`),
					
				])
				.then(async(result) => {
					const customerList = await result[0].json()
					const locationDetails = await result[1].json()
					
					// return { customerList }
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
	}
</script> 
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	
	// export let data
	export let locationDetails
	export let customerList

	// export let status = locationDetails.status || 'ERROR'
	// export let message = locationDetails.message || 'ERROR'
	
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
			<a href="/panel/locaciones/{locationDetails.locationDetails.location_id}/">{locationDetails.locationDetails.locationName}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
</header>

<main>
	<!-- Formulario detalles locación -->
	{#if locationDetails.status!=='OK'}
		<SeguAlert message={locationDetails.message} status={locationDetails.status} path=locaciones />
	{:else}
		<LocationDetails {...locationDetails.locationDetails} {isReadOnly} {...customerList} />
	{/if} 
</main>

<!-- {/await} -->
