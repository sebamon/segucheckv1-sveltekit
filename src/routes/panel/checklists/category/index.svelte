<script context="module">
	export async function load({fetch ,page}){
		const response = await fetch('../../api/category')
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
	
	import SeguAlert from '$lib/SeguAlert.svelte'
	import SeguCheck from '$lib/SeguCheck.svelte';

	export let data
	export let categories = data.categories
	console.log('categorias: ', categories);

</script>

<svelte:head>
	<title>Checkgroups - SeguCheck</title>
</svelte:head>
<!-- {JSON.stringify(categories)} -->

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Checkgroups</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-clipboard-check me-4" />Checkgroups</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/checklists/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	<SeguCheck />
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
					<th scope="col">ID checkgroup</th>
					<th scope="col">Nombre</th>
				</tr>
			</thead>
			<tbody>
				{#each categories as { category_id , categoryName} }
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{category_id}">
							{category_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{category_id}">
							{categoryName}
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