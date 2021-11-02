<script context="module">
	export async function load ({fetch , page}){
		const response = await fetch('./vehiculos/vehiculos',{
			method : "GET",
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		console.log('data')
		return {
			props: {
				data
			}
		}
}
</script>

<script lang="ts">
import type { vehicle } from '.prisma/client';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	export let data
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
			<h5>Descripción breve</h5>
		</div>
		<div class="col-2 ms-auto">
			<Button color="primary" href="/panel/vehiculos/nuevo">
				<i class="fas fa-plus me-2" />Nuevo
			</Button>
		</div>
	</div>
</header>

<main>
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
				{#each data.vehicles as vehicle}
				<tr>
					<td>{vehicle.domain}</td>
					<td>{vehicle.type}</td>
					<td>{vehicle.brand}</td>
					<td>{vehicle.model}</td>
					<td>text</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
