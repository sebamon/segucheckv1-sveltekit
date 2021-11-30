<script context="module">
	export async function load({fetch , page}){
		try {
			const response = await fetch('./trabajos/trabajos')
			const data = await response.json()

			return{
				props: {
					data
				}
			}
		} catch (error) {
			console.log(error)
			return {
				props:{}
			}
		}
	}
</script>
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import moment from 'moment';
	export let data
	export let jobs = data.jobs
	export let dateString = moment.utc(jobs.startDate).format('YYYY/MM/DD');
	let convertedStartDate = new Date(
		new Date(dateString).getTime() - new Date().getTimezoneOffset()
	)
		.toISOString()
		.split('T')[0];

</script>

<svelte:head>
	<title>Trabajos - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Trabajos</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-briefcase me-4" />Trabajos</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/trabajos/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	{#if data.status!=='OK'}
		<SeguAlert status={data.status} message={data.message} path=trabajos/>
	{/if}
	{#if jobs.length > 0}
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
					<th scope="col">Número</th>
					<th scope="col">Locación</th>
					<th scope="col">Fecha inicio</th>
					<th scope="col">Estado</th>
					<th scope="col">Cliente</th>
				</tr>
			</thead>
			<tbody>
				{#each jobs as job}
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./trabajos/{job.job_id}">
							{job.job_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./trabajos/{job.job_id}">
							{job.location.locationName}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./trabajos/{job.job_id}">
							{moment(job.startDate).add(1,'day').format('DD/MM/YYYY')}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./trabajos/{job.job_id}">
							{job.statusJob}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./trabajos/{job.job_id}">
							{job.customer.businessName}
						</a>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{/if}
</main>

<style>
	/* Solución filas de tablas como links: https://stackoverflow.com/questions/1460958/html-table-row-like-a-link */
	table tr td a {
		display: block;
		height: 100%;
		width: 100%;
	}
	table tr td {
		padding-left: 0;
		padding-right: 0;
	}
</style>