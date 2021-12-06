<script context="module">
	export async function load() {
		const response = await fetch('http://localhost:3000/api/category');
		const data = await response.json();
		//console.log(data)
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import Checklists from '$lib/ChecklistsV2.svelte';

	export let data;
</script>

<svelte:head>
	<title>Nuevo checklist - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
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
<Checklists {data}/>

