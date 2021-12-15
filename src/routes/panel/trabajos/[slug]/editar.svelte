<script context="module">
	export async function load({fetch, page})
	{
		
			let data = await Promise.all([
			fetch('http://localhost:3000/panel/clientes/clientes'),
			fetch('http://localhost:3000/panel/locaciones/locaciones'),
			fetch('http://localhost:3000/panel/vehiculos/vehiculos'),
			fetch(`./detalle`),
			])
			.then(async(result) => {
				
				const customerList = await result[0].json()
				const locationList = await result[1].json()
				const vehiclesList = await result[2].json()
				const jobDetails   = await result[3].json()

				return {customerList , locationList, vehiclesList, jobDetails}
				
		})
		return {
			props: {
				data
			}
		}
		
	}
</script>
<script lang="ts">
	import JobDetails from '$lib/Details/JobDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte'
	export let data

	// export let jobDetails =(data.JobDetails.status==='OK') ? data.JobDetails.job : []

	export let jobDetails = data.jobDetails.job
	export let customerList = data.customerList.customers
	export let locationList = data.locationList.locations
	export let vehiclesList = data.vehiclesList.vehicles
	console.log('jobDetails dataaa', data)

	// Configurar componente LocationDetails para editar
	export let isReadOnly = false;
</script>

<svelte:head>
	<title>Editar trabajo: {jobDetails.job_id} - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/trabajos">Trabajo</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/trabajos/{jobDetails.job_id}">{jobDetails.job_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-briefcase me-4" />Editar trabajo</h1>
		<p class="lead">Modifique los detalles a continuación.</p>
	</div>
</header>

<main>
	<!-- Formulario detalles trabajo -->
	<JobDetails {...jobDetails} {isReadOnly}
	 {customerList} {locationList} {vehiclesList}
	 /> 
</main>


