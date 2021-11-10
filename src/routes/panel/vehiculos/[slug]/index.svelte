<script context="module">
	export async function load({fetch, page}){
		const id_find = page.params.slug
		const response = await fetch(`./${page.params.slug}/detalle`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			request: page.params.slug
		})
		const data = await response.json()
		console.log('response',data)
		return {
			props:{
				data
			}
		}
	}

</script>
<script lang="ts">
	// Importar secciones de detalles:
	import VehicleDetails from '$lib/Details/VehicleDetails.svelte';
	import DocDetails from '$lib/Details/DocDetails.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Image,
		TabContent,
		TabPane,
		Accordion,
		AccordionItem,
		Carousel,
		CarouselControl,
		CarouselIndicators,
		CarouselItem
	} from 'sveltestrap';

	// Info vehículo placeholder (esto lo recibe del servidor en estructura similar):
	// let vehicleDetails = {
	// 	vehicle_id: 10,
	// 	domain: 'AB123CD',
	// 	type: 43,
	// 	brand: 'Ford',
	// 	model: 'Ranger',
	// 	year: 2015,
	// 	internal_id: 1234,
	// 	chasisNumber: 1214161820,
	// 	motorNumber: 2356891256,
	// 	frontPicUrl: 'https://avatars.dicebear.com/api/bottts/1234.svg',
	// 	leftSidePicUrl: 'https://avatars.dicebear.com/api/bottts/1235.svg',
	// 	rigthSidePicUrl: 'https://avatars.dicebear.com/api/bottts/1236.svg',
	// 	backPicUrl: 'https://avatars.dicebear.com/api/bottts/1237.svg'
	// };
	export let data
	// export const message = data.message
	export let status = data.status
	console.log('status', status)
	export let vehicleDetails = data.vehicleDetails
	export let isReadOnly = true
	let vehicleDocumentation = [
		{
			documentation_id: 20,
			documentType: { documentType_id: 5, description: 'Verificación Técnica Vehicular' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 1',
			created_at: new Date('2021-10-31'),
			updated_at: new Date('2021-11-31'),
			expirated_at: new Date('2021-12-31')
		},
		{
			documentation_id: 25,
			documentType: { documentType_id: 6, description: 'Registro Único Transporte Automotor' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 2',
			created_at: new Date('2021-08-31'),
			updated_at: new Date('2021-08-31'),
			expirated_at: new Date('2021-09-31')
		}
	];

	// Fotos del vehículo para carrusel:
	const items = [
		// vehicleDetails.frontPicUrl,
		// vehicleDetails.leftSidePicUrl,
		// vehicleDetails.rigthSidePicUrl,
		// vehicleDetails.backPicUrl
	];
	let activeIndex = 0;
	
	const onsubmit = async(event) =>{
		console.log('onsubmit', event)
	}

	function showAlert(event){
		status='Hola' 
		console.log('event',event)
	}
</script>

<svelte:head>
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
		<h1><i class="fas fa-car me-4" />{vehicleDetails.domain}</h1>
		<h5>Detalles del vehículo</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/vehiculos/{vehicleDetails.vehicle_id}/editar"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<main>
	<TabContent>
		<TabPane tabId="vehicleDetails" tab="Datos básicos" active>
			<!-- Datos básicos -->
			<h2 class="my-4">Datos básicos</h2>
			<VehicleDetails {...vehicleDetails} on:submit={showAlert}/>
		</TabPane>
		<TabPane tabId="vehicleDocumentation" tab="Habilitaciones">
			<h2 class="my-4">Habilitaciones</h2>
			{#if vehicleDocumentation.length == 0}
				<div class="alert alert-warning" role="alert">
					<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta ahora.
					Haz click en Editar para subir archivos.
				</div>
			{:else}
				<div class="row g-3">
					{#each vehicleDocumentation as thisDoc}
						<Accordion stayOpen class="col-md-6">
							<AccordionItem header={thisDoc.documentType.description}>
								<DocDetails {...thisDoc} />
							</AccordionItem>
						</Accordion>
					{/each}
				</div>
			{/if}
		</TabPane>
		<TabPane tabId="vehiclePictures" tab="Fotos">
			<h2 class="my-4">Fotos</h2>
			<div class="d-grid gap-2 col-6 mx-auto">
				<Carousel dark {items} bind:activeIndex>
					<CarouselIndicators bind:activeIndex {items} />
					<div class="carousel-inner">
						{#each items as item, index}
							<CarouselItem bind:activeIndex itemIndex={index}>
								<img src={item} class="d-block w-100" alt={`${item} ${index + 1}`} />
							</CarouselItem>
						{/each}
					</div>
					<CarouselControl direction="prev" bind:activeIndex {items} />
					<CarouselControl direction="next" bind:activeIndex {items} />
				</Carousel>
			</div>
		</TabPane>
	</TabContent>
</main>
