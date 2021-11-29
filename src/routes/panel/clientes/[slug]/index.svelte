<script context="module">
	export async function load({ fetch, page }) {
		try {
			const response = await fetch(`./${page.params.slug}/detalle`);
			const data = await response.json();

			return {
				props: {
					data
				}
			};
		} catch (error) {
			console.error(error);
		}
	}
</script>

<script lang="ts">
	import CustomerDetails from '$lib/Details/CustomerDetails.svelte';
	import { dataset_dev } from 'svelte/internal';
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';

	// Info cliente placeholder (esto lo recibe del servidor en estructura similar):
	// let customerDetails = {
	// 	customer_id: '1',
	// 	businessName: 'YPF',
	// 	contact: 'Juan Perez',
	// 	phone: '2993334444',
	// 	email: 'juan.perez@ejemplo.com',
	// 	jobs: {},
	// 	location: [
	// 		{ location_id: 1, locationName: 'Locación A' },
	// 		{ location_id: 2, locationName: 'Locación B' },
	// 		{ location_id: 3, locationName: 'Locación C' }
	// 	],
	// 	requiereddocumentation: {}
	// }
	export let data;
	export let customerDetails = data.customerDetails;
	// Configurar componente CustomerDetails para solo lectura
	export let isReadOnly = true;
</script>

<svelte:head>
	<title>Cliente: {customerDetails.businessName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/clientes">Clientes</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/clientes/{customerDetails.customer_id}">{customerDetails.customer_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalle</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />{customerDetails.businessName}</h1>
		<p class="lead">Detalles del cliente</p>
	</div>
</header>

<main>
	{#if data.status === 'OK'}
		<TabContent>
			<TabPane tabId="customerDetails" tab="Datos básicos" active>
				<CustomerDetails {...customerDetails} {isReadOnly} />
			</TabPane>
			<TabPane tabId="customerJobs" tab="Trabajos">
				<h2 class="my-4">Trabajos</h2>
			</TabPane>
			<TabPane tabId="customerLocations" tab="Locaciones">
				<h2 class="my-4">Locaciones</h2>
			</TabPane>
			<TabPane tabId="customerReqDocs" tab="Documentación requerida">
				<h2 class="my-4">Documentación requerida</h2>
			</TabPane>
		</TabContent>
	{:else}
		<SeguAlert status={data.status} message={data.message} path="clientes" />
	{/if}
</main>
