<script lang="ts">
	import JobDetails from '$lib/Details/JobDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';

	// Trabajo de ejemplo:
	let jobDetails = {
		job_id: 1,
		startDate: new Date('2021-12-31'),
		finishDate: new Date('2022-12-31'),
		status: 'Programado',
		riskAnalysis: '/docs/doc-placeholder.pdf',
		customer: 1,
		location: 1,
		internalNumber: 1,
		checkItemGroup_id: 1
	};

	// Configurar componente JobDetails para solo lectura
	export let isReadOnly = true;
</script>

<svelte:head>
	<title>Trabajo n° {jobDetails.job_id} - SeguCheck</title>
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
			<a href="/panel/trabajos/{jobDetails.job_id}">{jobDetails.job_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-briefcase me-4" />N° {jobDetails.job_id}</h1>
		<p class="lead">Detalles del trabajo</p>
	</div>
</header>

<main>
	<TabContent>
		<TabPane tabId="jobDetails" tab="Datos básicos" active>
			<JobDetails {...jobDetails} {isReadOnly} />
		</TabPane>
		<TabPane tabId="docDetails" tab="Operarios asignados">
			<p class="lead">Operarios...</p>
		</TabPane>
		<TabPane tabId="userHealthInfo" tab="Checklists asignados">
			<p class="lead">Checklists...</p>
		</TabPane>
	</TabContent>
</main>
