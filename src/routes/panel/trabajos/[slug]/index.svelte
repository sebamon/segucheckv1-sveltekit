<script context="module">
	export async function load({fetch, page})
	{
		try {
			const data = await Promise.all([
				fetch(`./${page.params.slug}/detalle`),
				fetch(`../locaciones/locaciones`),
				fetch(`../operarios/operarios`)
			])
			.then(async(result) => {
				const jobDetails = await result[0].json()
				const locationFetch = await result[1].json()
				const operators = await result[2].json()
				console.log(jobDetails , locationFetch , operators)
				return {jobDetails , locationFetch , operators}
			})

				return{
					props: {
						data
					}
				}
			
		} catch (error) {
			console.log(error)
			return {
				props:{
					message : error,
					status : 'ERROR',
					JobDetails : {},
					locationFetch : {}
				}
			}
		}
	}
</script>
<script lang="ts">
	import JobDetails from '$lib/Details/JobDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	import OperatorManager from '$lib/OperatorManager.svelte';
	import OperatorsOnJobList from '$lib/Details/OperatorsOnJobList.svelte'
	import SeguAlert from '$lib/SeguAlert.svelte';

	export let data	

	let message = ''
	let status = ''
		
	export let jobDetails = data ? data.jobDetails : {
		job_id : 0,
	}
	export let operatorsInJob = jobDetails.job.operatoronjobs 

	export let locationList = data ? data.locationFetch : {}
	export let operators = data.operators
	let assingOperatorList = []
	let newListOperator = []


	async function assignOperators(e){
		assingOperatorList=e.detail.operatorList
		// console.log('operarios asignados',operatorsInJob)
		const submit = await fetch(`./${jobDetails.job.job_id}/asignarOperarios`,{
        method : 'PUT',
		headers : {
			'context-type' : 'application/json',
		},
        body : JSON.stringify({
            assingOperatorList,
			job_id : jobDetails.job.job_id
        })
    })
	const data = await submit.json()

	message = data.message
	status = data.status
	newListOperator = data.operatorsInJob

	operatorsInJob = newListOperator
	}

	// Configurar componente JobDetails para solo lectura
	export let isReadOnly = true;
</script>

<svelte:head>
	<!-- <title>Trabajo n° {jobDetails.job_id} - SeguCheck</title> -->
</svelte:head>
<!-- Encabezado -->

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/trabajos">Trabajo</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/trabajos/{jobDetails.job.job_id}">{jobDetails.job.job_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-briefcase me-4" />N° {jobDetails.job.job_id}</h1>
		<p class="lead">Detalles del trabajo</p>
	</div>
</header>

<main>
	{#if status!=''}
		<SeguAlert {message} {status} path="trabajos"/>
	{/if}
	<TabContent>
		<TabPane tabId="jobDetails" tab="Datos básicos" active>
			<JobDetails {...jobDetails.job} {isReadOnly} />
		</TabPane>
		<TabPane tabId="docDetails" tab="Operarios asignados">
			<!-- <p class="lead">Operarios...</p> -->
			<OperatorManager {...operators} {operatorsInJob} on:asignarOperarios={assignOperators}/>
			<OperatorsOnJobList {operatorsInJob}/>
		</TabPane>
		<TabPane tabId="userHealthInfo" tab="Checklists asignados">
			<p class="lead">Checklists...</p>
		</TabPane>
	</TabContent>
</main>
