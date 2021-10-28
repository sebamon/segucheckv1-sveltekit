<script context="module">
export async function load({ page, fetch }) {
	const response = await fetch(`./${page.params.slug}/detalle.json`, {
		method: "GET",
		request: page.params.slug
	})
	const data = await response.json()
	return {
		props:{
			data,
		}	
	}
}
</script>
<script lang="ts">
	import UserDetails from '$lib/Details/UserDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem
	} from 'sveltestrap';
	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):

	export let data;
	export let userDetails = data.userDetails

	
</script>

<svelte:head>
	<title>Usuario: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/usuarios">Usuarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<!-- <h1>{userDetails.firstName + ' ' + userDetails.lastName}</h1> -->
		<h5>Detalles del usuario</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/usuarios/{userDetails.user_id}/editar"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<main>
<UserDetails {...userDetails} />
</main>