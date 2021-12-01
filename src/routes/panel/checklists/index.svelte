<script context="module">
	export async function load({fetch ,paage}){
		const response = await fetch('./checklists/checklist')
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

	export let data
	let checkList = data.checkList

</script>

<svelte:head>
	<title>Checkgroups - SeguCheck</title>
</svelte:head>
{JSON.stringify(checkList)}
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
					<th scope="col">etc1</th>
					<th scope="col">etc2</th>
					<th scope="col">etc3</th>
				</tr>
			</thead>
			<tbody>
				{#each checkList as checkgroup }
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{checkgroup.checkItemGroup_id}">
							{checkgroup.checkItemGroup_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{checkgroup.checkItemGroup_id}">
							{checkgroup.groupName}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{checkgroup.checkItemGroup_id}">
							Personalizable
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{checkgroup.checkItemGroup_id}">
							Personalizable
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./checklists/{checkgroup.checkItemGroup_id}">
							Personalizable
						</a>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div id="checktest">
		<Checklists />
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