<script context="module">
	export async function load ({fetch , page}){
		try{

			const response = await fetch('./vehiculos/vehiculos')
			const data = await response.json()

			return {
				props: {
					data
				}
			}
		}catch(e){
			console.log('error',e)
			return {
				props:
					{}
			}
		}
}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';

	export let data
	export let vehicles = data.vehicles
</script>

<svelte:head>
	<title>Vehículos - SeguCheck</title>
</svelte:head>

<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Vehículos</BreadcrumbItem>
	</Breadcrumb>
	<div class="row">
		<div class="col-auto">
			<h1><i class="fas fa-car me-4" />Vehículos</h1>
			<h5>Mostrando todos los elementos.</h5>
		</div>
		<div class="col-2 ms-auto">
			<Button color="primary" href="/panel/vehiculos/nuevo">
				<i class="fas fa-plus me-2" />Nuevo
			</Button>
		</div>
	</div>
</header>
<main>
	{#if data.status!=='OK'}
		<SeguAlert status={data.status} message={data.message} path=vehiculos/>
	{/if}
	{#if vehicles.length > 0}
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
					<th scope="col">Patente</th>
					<th scope="col">Tipo</th>
					<th scope="col">Marca</th>
					<th scope="col">Modelo</th>
					<th scope="col">Estado Habilitación</th>
				</tr>
			</thead>
			<tbody>
				{#each vehicles as vehicle}	
						<tr>
							<td>
								<a class="text-decoration-none text-dark" href="./vehiculos/{vehicle.vehicle_id}">
									{vehicle.domain}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./vehiculos/{vehicle.vehicle_id}">
									{vehicle.type}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./vehiculos/{vehicle.vehicle_id}">
									{vehicle.brand}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./vehiculos/{vehicle.vehicle_id}">
									{vehicle.model}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark text-center" href="./vehiculos/{vehicle.vehicle_id}">
									{#if vehicle.status }
										<i class="fas fa-check-circle me-2 text-success" />
									{:else}
										<i class="fas fa-times-circle me-2 text-danger" />
									{/if}
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