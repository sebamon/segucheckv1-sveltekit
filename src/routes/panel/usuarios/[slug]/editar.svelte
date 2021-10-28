<script context="module">
	export async function load({fetch , page}){
		const response = await fetch(`./${page.params.slug}/detalle.json`, {
			method: "GET",
			request: page.params.slug
		})
		const data  = await response.json()
		return {
			props:{
				data,
			}	
		}
	}
</script>

<script lang="ts">
	import UserDetails from '$lib/Details/UserDetails.svelte';
import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Breadcrumb,
		BreadcrumbItem,
		Alert
	} from 'sveltestrap';

	export let data;
	export let userDetails=data.userDetails
	let color = 'success'
	
	// Configurar componente UserDetails para editar
	let isReadOnly = false;

</script>

<svelte:head>
	<title>Editar usuario: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/usuarios">Usuarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-users me-4" />Editar usuario</h1>
		<p class="lead">Modifique los detalles a continuación.</p>
	</div>
</header>

	<UserDetails {...userDetails} {isReadOnly} />
