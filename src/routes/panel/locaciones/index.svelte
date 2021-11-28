<script context="module">
	export async function load ({fetch , page}){
		try {
			const response = await fetch('./locaciones/locaciones')
			const data = await response.json()
			return {
				props: {
					data
				}
			}
		} catch (error) {
			console.error(error)
			return {
				body: {
					data : {},
					message: 'Error al cargar la pagina',
					status : 'ERROR'
				}
			}
		}
	}
</script>
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import LocationDetails from '$lib/Details/LocationDetails.svelte';
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	export let data
	export let locations = data.locations
</script>

<svelte:head>
	<title>Locaciones - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Locaciones</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-map-marked me-4" />Locaciones</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/locaciones/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	{#if data.status!=='OK'}
		<SeguAlert status={data.status} message={data.message} path=locaciones/>
	{/if}
	{#if locations.length>0}
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
					<th scope="col">ID locación</th>
					<th scope="col">Nombre</th>
					<th scope="col">Cliente</th>
					<th scope="col">Coordenadas</th>
					<th scope="col">etc</th>
				</tr>
			</thead>
			<tbody>
				{#each locations as location}
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./locaciones/{location.location_id}">
							{location.location_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./locaciones/{location.location_id}">
							{location.locationName}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./locaciones/{location.location_id}">
							{location.customer.contact}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./locaciones/{location.location_id}">
							{location.coordenites}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./locaciones/{location.location_id}">
							chau
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