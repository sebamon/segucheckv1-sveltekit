<script context="module">
	export async function load({fetch ,page}){
		const response = await fetch('./checklists/checklist')
		console.log(response)
		const data = await response.json()
		return {
			props: {
				data
			}
		}
	}
</script>
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	
	import Checklists from '$lib/Checklists.svelte';
	import SeguAlert from '$lib/SeguAlert.svelte'
	import SeguCheck from '$lib/SeguCheck.svelte';

	export let data
	let checkList = data.checkList

</script>

<svelte:head>
	<title>Checkgroups - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>CheckList</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-clipboard-check me-4" />CheckList</h1>
		<h5>Mostrando todos los elementos.</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/checklists/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle">
			<thead>
				<tr>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<!-- <th scope="col"><input type="search" placeholder="Filtrar" /></th> -->
				</tr>
				<tr>
					<th scope="col">ID CheckList</th>
					<th scope="col">Nombre</th>
					<!-- <th scope="col">Fecha</th> -->
				</tr>
			</thead>
			<tbody>
				{#each checkList as thisCheckList }
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{thisCheckList.checkList_id}">
							{thisCheckList.checkList_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{thisCheckList.checkList_id}">
							{thisCheckList.checkListName}
						</a>
					</td>
					
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
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