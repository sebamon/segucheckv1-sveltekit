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
		operatorsAssigned: [1234567890, 1234567892],
		checkgroupRequired: [1, 3]
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
		<TabPane tabId="opAssigned" tab="Operarios asignados">
			<p class="lead">Operarios...</p>
			<div class="table-responsive">
				<table class="table table-striped table-hover align-middle">
					<thead>
						<tr>
							<th scope="col"><input type="search" placeholder="Filtrar" /></th>
							<th scope="col"><input type="search" placeholder="Filtrar" /></th>
							<th scope="col"><input type="search" placeholder="Filtrar" /></th>
							<th scope="col"><input type="search" placeholder="Filtrar" /></th>
							<th scope="col"><input type="search" placeholder="Filtrar" /></th>
						</tr>
						<tr>
							<th scope="col">ID Cuenta</th>
							<th scope="col">DNI</th>
							<th scope="col">Nombre</th>
							<th scope="col">Apellido</th>
							<th scope="col">Estado Habilitación</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1,001</td>
							<td>random</td>
							<td>data</td>
							<td>placeholder</td>
							<td>text</td>
						</tr>
						<tr>
							<td>1,002</td>
							<td>placeholder</td>
							<td>irrelevant</td>
							<td>visual</td>
							<td>layout</td>
						</tr>
						<tr>
							<td>1,003</td>
							<td>data</td>
							<td>rich</td>
							<td>dashboard</td>
							<td>tabular</td>
						</tr>
						<tr>
							<td>1,003</td>
							<td>information</td>
							<td>placeholder</td>
							<td>illustrative</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,004</td>
							<td>text</td>
							<td>random</td>
							<td>layout</td>
							<td>dashboard</td>
						</tr>
						<tr>
							<td>1,005</td>
							<td>dashboard</td>
							<td>irrelevant</td>
							<td>text</td>
							<td>placeholder</td>
						</tr>
						<tr>
							<td>1,006</td>
							<td>dashboard</td>
							<td>illustrative</td>
							<td>rich</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,007</td>
							<td>placeholder</td>
							<td>tabular</td>
							<td>information</td>
							<td>irrelevant</td>
						</tr>
						<tr>
							<td>1,008</td>
							<td>random</td>
							<td>data</td>
							<td>placeholder</td>
							<td>text</td>
						</tr>
						<tr>
							<td>1,009</td>
							<td>placeholder</td>
							<td>irrelevant</td>
							<td>visual</td>
							<td>layout</td>
						</tr>
						<tr>
							<td>1,010</td>
							<td>data</td>
							<td>rich</td>
							<td>dashboard</td>
							<td>tabular</td>
						</tr>
						<tr>
							<td>1,011</td>
							<td>information</td>
							<td>placeholder</td>
							<td>illustrative</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,012</td>
							<td>text</td>
							<td>placeholder</td>
							<td>layout</td>
							<td>dashboard</td>
						</tr>
						<tr>
							<td>1,013</td>
							<td>dashboard</td>
							<td>irrelevant</td>
							<td>text</td>
							<td>visual</td>
						</tr>
						<tr>
							<td>1,014</td>
							<td>dashboard</td>
							<td>illustrative</td>
							<td>rich</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,015</td>
							<td>random</td>
							<td>tabular</td>
							<td>information</td>
							<td>text</td>
						</tr>
					</tbody>
				</table>
			</div>
		</TabPane>
		<TabPane tabId="checkAssigned" tab="Checklists asignados">
			<p class="lead">Checklists...</p>
			<div class="table-responsive">
				<table class="table table-striped table-hover align-middle">
					<thead>
						<tr>
							<th scope="col">ID checkgroup</th>
							<th scope="col">Nombre</th>
							<th scope="col">etc1</th>
							<th scope="col">etc2</th>
							<th scope="col">etc3</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1,001</td>
							<td>random</td>
							<td>data</td>
							<td>placeholder</td>
							<td>text</td>
						</tr>
						<tr>
							<td>1,002</td>
							<td>placeholder</td>
							<td>irrelevant</td>
							<td>visual</td>
							<td>layout</td>
						</tr>
						<tr>
							<td>1,003</td>
							<td>data</td>
							<td>rich</td>
							<td>dashboard</td>
							<td>tabular</td>
						</tr>
						<tr>
							<td>1,003</td>
							<td>information</td>
							<td>placeholder</td>
							<td>illustrative</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,004</td>
							<td>text</td>
							<td>random</td>
							<td>layout</td>
							<td>dashboard</td>
						</tr>
						<tr>
							<td>1,005</td>
							<td>dashboard</td>
							<td>irrelevant</td>
							<td>text</td>
							<td>placeholder</td>
						</tr>
						<tr>
							<td>1,006</td>
							<td>dashboard</td>
							<td>illustrative</td>
							<td>rich</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,007</td>
							<td>placeholder</td>
							<td>tabular</td>
							<td>information</td>
							<td>irrelevant</td>
						</tr>
						<tr>
							<td>1,008</td>
							<td>random</td>
							<td>data</td>
							<td>placeholder</td>
							<td>text</td>
						</tr>
						<tr>
							<td>1,009</td>
							<td>placeholder</td>
							<td>irrelevant</td>
							<td>visual</td>
							<td>layout</td>
						</tr>
						<tr>
							<td>1,010</td>
							<td>data</td>
							<td>rich</td>
							<td>dashboard</td>
							<td>tabular</td>
						</tr>
						<tr>
							<td>1,011</td>
							<td>information</td>
							<td>placeholder</td>
							<td>illustrative</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,012</td>
							<td>text</td>
							<td>placeholder</td>
							<td>layout</td>
							<td>dashboard</td>
						</tr>
						<tr>
							<td>1,013</td>
							<td>dashboard</td>
							<td>irrelevant</td>
							<td>text</td>
							<td>visual</td>
						</tr>
						<tr>
							<td>1,014</td>
							<td>dashboard</td>
							<td>illustrative</td>
							<td>rich</td>
							<td>data</td>
						</tr>
						<tr>
							<td>1,015</td>
							<td>random</td>
							<td>tabular</td>
							<td>information</td>
							<td>text</td>
						</tr>
					</tbody>
				</table>
			</div>
		</TabPane>
	</TabContent>
</main>
