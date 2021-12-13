<script context="module">
	export async function load({fetch, page})
	{
		try {
			const data = await Promise.all([
				fetch(`./${page.params.slug}/detalle`),
				fetch(`../locaciones/locaciones`),
				fetch(`../operarios/operarios`),
				fetch('../../../api/category'),
				fetch('../checklists/checklist'),
			])
			.then(async(result) => {
				const jobDetails = await result[0].json()
				const locationFetch = await result[1].json()
				const operators = await result[2].json()
				const categoryList = await result[3].json()
				const checkList = await result[4].json()
				// console.log(jobDetails , locationFetch , operators , categoryList)
				return {jobDetails , locationFetch , operators , categoryList, checkList}
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
	let messageCheckList = ''
	let statusCheckList  = ''
	
	export let jobDetails = data ? data.jobDetails : {
		job_id : 0,
	}
	let assignedCheckList = jobDetails.job.checkList_id
	export let operatorsInJob = jobDetails.job.operatoronjobs 
	export let locationList = data ? data.locationFetch : {}
	export let operators = data.operators
	
	let checkList = data.checkList.checkList
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
	async function submitCheckList(e){
		console.log('hola',assignedCheckList)
		try{
			
			const submit = await fetch(`./${jobDetails.job.job_id}/asignarCheckList`,{
				method : 'PUT',
				body: JSON.stringify({
					assignedCheckList : assignedCheckList,
				})
			})

			const newAssignedCheckList = await submit.json()
			statusCheckList = newAssignedCheckList.status
			messageCheckList = newAssignedCheckList.message
			console.log(newAssignedCheckList)
		}catch(error){
			console.log(error)
		}
	}
	// Configurar componente JobDetails para solo lectura
	export let isReadOnly = true;
</script>

<svelte:head>
	<title>Trabajo n° {jobDetails.job.job_id} - SeguCheck</title>
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
		{#if statusCheckList!=''}
			<SeguAlert message={messageCheckList} status={statusCheckList} path="checklists"/>
		{/if}	
				<label for="customer" class="form-label">CheckList Seleccionada</label>
				<select
				id="checkList"
				class="form-select"
				aria-label="CheckList"
				bind:value={assignedCheckList}
				
				>
				<option selected disabled>Elija una opción...</option>
					{#each checkList as  aCheckList }
						<option checked={assignedCheckList===aCheckList.checkList_id} value={aCheckList.checkList_id}>{aCheckList.checkListName}</option>
					{/each}
				</select>
	
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" disabled={false} on:click={submitCheckList}>
					{#if false}
						<i class="fas fa-spinner fa-pulse me-2" />Enviando...
					{:else}
						<i class="fas fa-pen me-2" />Confirmar cambios
					{/if}
				</button>
			</div>
		</TabPane>
	</TabContent>
</main>