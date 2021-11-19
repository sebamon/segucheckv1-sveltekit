<script lang="ts">
	import DocDetails from '$lib/Details/DocDetails.svelte';
	import VehicleDetails from '$lib/Details/VehicleDetails.svelte';
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

	// Datos placeholder:
	let userDocumentation = [
		{
			documentation_id: 10,
			documentType: { documentType_id: 1, description: 'Certificación para Trabajo en Altura' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 1',
			created_at: new Date('2021-10-31'),
			updated_at: new Date('2021-11-31'),
			expirated_at: new Date('2021-12-31')
		},
		{
			documentation_id: 15,
			documentType: { documentType_id: 2, description: 'Carnet de Manejo Defensivo' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 2',
			created_at: new Date('2021-08-31'),
			updated_at: new Date('2021-08-31'),
			expirated_at: new Date('2021-09-31')
		}
	];

	let userVehicles = [
		{
			vehicle_id: 10,
			domain: 'AB123CD',
			type: '43',
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
			vehicleDocumentation: [
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
			]
		},
        {
			vehicle_id: 22,
			domain: 'AB222CD',
			type: '43',
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
			vehicleDocumentation: [
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
			]
		},
        {
			vehicle_id: 33,
			domain: 'AB333CD',
			type: '43',
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
			vehicleDocumentation: [
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
			]
		}
	];

	// Arreglo de tipo de vehículos:
	let vehicleTypeList = [
		'Aeronaves - Avión Comercial',
		'Aeronaves - Avión De Carga',
		'Aeronaves - Dron',
		'Aeronaves - Helicóptero',
		'Embarcaciones - Bote Sin Motor',
		'Embarcaciones - Lancha',
		'Embarcaciones - Semirrígido - Gomón',
		'Maquinaria Con Carreteo - Cargadora',
		'Maquinaria Con Carreteo - Equipo Especial',
		'Maquinaria Con Carreteo - Excavadora',
		'Maquinaria Con Carreteo - Grúa',
		'Maquinaria Con Carreteo - Motoniveladora',
		'Maquinaria Con Carreteo - Pala Frontal',
		'Maquinaria Con Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Con Carreteo - Retroexcavadora',
		'Maquinaria Con Carreteo - Topadora',
		'Maquinaria Con Carreteo - Tractor',
		'Maquinaria Sin Carreteo - Autoelevador - Sampi',
		'Maquinaria Sin Carreteo - Camión Guinche',
		'Maquinaria Sin Carreteo - Cargadora',
		'Maquinaria Sin Carreteo - Compactador',
		'Maquinaria Sin Carreteo - Equipo Especial',
		'Maquinaria Sin Carreteo - Excavadora',
		'Maquinaria Sin Carreteo - Grúa',
		'Maquinaria Sin Carreteo - Maquinaria',
		'Maquinaria Sin Carreteo - Motoniveladora',
		'Maquinaria Sin Carreteo - Pala Frontal',
		'Maquinaria Sin Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Sin Carreteo - Retroexcavadora',
		'Maquinaria Sin Carreteo - Topadora',
		'Rodado Extranjero De Cargas Peligrosas',
		'Rodados - Acoplado',
		'Rodados - Ambulancia',
		'Rodados - Automóvil',
		'Rodados - Batea',
		'Rodados - Camión',
		'Rodados - Camión Con Hidrogrúa',
		'Rodados - Carretón',
		'Rodados - Furgón',
		'Rodados - Guinche',
		'Rodados - Minibús',
		'Rodados - Ómnibus',
		'Rodados - Pick Up - Cargas Peligrosas',
		'Rodados - Pick-Up',
		'Rodados - Semirremolque',
		'Rodados - Tanque',
		'Rodados - Tractor',
		'Rodados - Tráiler',
		'Rodados Cargas Peligrosas - Acoplado Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Camión Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Semirremolque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tanque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tractor Cargas Peligrosas'
	];
</script>

<header>
	<h1 class="my-4 text-center"><i class="fas fa-car me-4" />Vehículos</h1>
</header>
<main>
	{#if userVehicles.length == 0}
		<div class="alert alert-secondary" role="alert">
			<h5>
				<i class="fas fa-exclamation-triangle me-2" />No hay ningún vehículo asignado a usted.
			</h5>
			Consulte a su gestor documental para actualizar esta información.
		</div>
	{:else}
		<TabContent>
			{#each userVehicles as vehicleDetails}
				<TabPane tabId="{vehicleDetails.domain}" tab={vehicleDetails.domain} active>
					<div class="row g-3">
						<Accordion stayOpen class="my-4 col-md-12">
							<AccordionItem active>
								<h5 class="m-0" slot="header">Información básica</h5>
								<VehicleDetails {...vehicleDetails} />
							</AccordionItem>
						</Accordion>
						{#if vehicleDetails.vehicleDocumentation.length == 0}
							<div class="alert alert-secondary" role="alert">
								<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta
								ahora. Consulte a su gestor documental para cargar las habilitaciones de su vehículo
								a cargo.
							</div>
						{:else}
							<h3 class="my-2 text-center">
								<i class="fas fa-paperclip me-2" />Habilitaciones
							</h3>

							{#each vehicleDetails.vehicleDocumentation as thisDoc}
								<DocDetails {...thisDoc} />
							{/each}
						{/if}
					</div>
				</TabPane>
			{/each}
		</TabContent>
	{/if}
	<!--     <TabContent>
		<TabPane tabId="vehicleDetails" tab="Datos básicos" active>
			<h2 class="my-4">Datos básicos</h2>
			<VehicleDetails {...vehicleDetails} on:submit={showAlert} />
		</TabPane>
    {#if userDocumentation.length == 0}
    <div class="alert alert-secondary" role="alert">
        <i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta ahora.
        Consulte a su gestor documental para realizar la carga de sus habilitaciones.
    </div>
{:else}
    <div class="row g-3">
        {#each userDocumentation as thisDoc}
            <DocDetails {...thisDoc} />
        {/each}
    </div>
{/if} -->
</main>
