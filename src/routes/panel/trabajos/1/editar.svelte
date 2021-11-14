<script lang="ts">
	import JobDetails from '$lib/Details/JobDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

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

	// Configurar componente LocationDetails para editar
	export let isReadOnly = false;
</script>

<svelte:head>
	<title>Editar trabajo n° {jobDetails.job_id} - SeguCheck</title>
</svelte:head>

<header>
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
</header>

<main>
	<!-- Formulario detalles trabajo -->
	<JobDetails {...jobDetails} {isReadOnly} />
</main>
