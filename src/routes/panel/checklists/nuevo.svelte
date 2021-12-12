<script context="module">
	export async function load({fetch ,page}){
		const data = await Promise.all([
			fetch('./checklist'),
			fetch('../../api/category'),
			
		])
		.then(async(result) => {
			const checkList = await result[0].json()
			const categoryList = await result[1].json()

			return {checkList , categoryList}
		})
			
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

import ChecklistsV2 from '$lib/ChecklistsV2.svelte';

	export let data;

</script>

<svelte:head>
	<title>Nuevo checklist - SeguCheck</title>
</svelte:head>
<!-- Encabezado -->
<!-- {JSON.stringify(data.categoryList)} -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists">Checklists</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1>Nuevo checklist</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>
<ChecklistsV2 data={data.categoryList}/>

