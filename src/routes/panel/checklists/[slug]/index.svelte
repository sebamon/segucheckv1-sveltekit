<script context="module">
	export async function load({ fetch, page }) {
		try {
			const response = await fetch(`./${page.params.slug}/checklist`);
			const data = await response.json();

			return {
				props: {
					data
				}
			};
		} catch (error) {
			console.error(error);
		}
	}
</script>
<script lang="ts">

	
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	

    export let data
    export let checkList = data.checkList
    export let isReadOnly = true
    let message = data.message
    let status = data.status
	let listaCategorias=''
	let valuesCollection = []

	checkList.VerifyCheckList.forEach(element => {
		console.log('element: ',element)
		valuesCollection = [...valuesCollection ,  {
									checkItem_id : element.checkItem.checkItem_id,
									item : element.checkItem.item,
									description : element.checkItem.description,
									checked : element.checked,
									observation : element.observation,
									categories : element.checkItem.categories
								}]
	});
    
	console.log(valuesCollection)
</script>

<svelte:head>
    <title>CheckList: {checkList.checkListName} - SeguCheck</title>
</svelte:head>
<!-- Encabezado -->

<header class="row">
    <Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists">CheckList</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists/{checkList.checkList_id}">{checkList.checkListName}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalle</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />{checkList.checkListName}</h1>
		<p class="lead">Detalles del CheckGroup</p>
	</div>
</header>
{#if status !== 'OK'}
    <SeguAlert {message} {status} path='checklists' />
{/if}
<main>
	<div class="table-responsive">
	<table class="table table-striped table-hover align-middle">
		<thead>
			<tr>
				<th scope="col">Item Id</th>
				<th scope="col">Item</th>
				<th scope="col">Descripción</th>
				<th scope="col">Checked</th>
				<th scope="col">Categoría</th>
				<th scope="col">Observación</th>
			</tr>
		</thead>
		<tbody>
			{#each valuesCollection as checkItem }
			<tr>	
				<td>{checkItem.checkItem_id}</td>
				<td>{checkItem.item}</td>
				<td>{checkItem.description}</td>
				<td class="text-center"><input type="checkbox" class="form-check-input" name="" id="" checked={checkItem.checked}></td>
				<td>{checkItem.categories.map((category) => {
					return category.categoryName +' '
				})}
				</td>
				<td>{checkItem.observation}</td>
			</tr>
			{/each}
		</tbody>
	</table>
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