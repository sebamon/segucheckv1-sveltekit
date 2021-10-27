<script context="module">
export async function load({ page, fetch }) {
	console.log('load usuarios/slug/index')
	console.log('page.params.slug', page.params.slug)
	const response = await fetch(`./${page.params.slug}/detalle.json`, {
		method: "GET",
		request: page.params.slug
	})
	console.log('response index: ','response')
	const userDetails = await response.json()
	// console.log( await response.json())
	
	console.log('userDetails index', userDetails.userDetails)
	return {
		props:{
			userDetails,
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

	export let userDetails;
	// userDetails=userDetails.userDetails
	// console.log('userDetails segundo script',userDetails.userDetails)
	
</script>

<svelte:head>
	
	<title>Usuario: {userDetails.userDetails.firstName + ' ' + userDetails.userDetails.lastName} - SeguCheck</title>
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
		<Button color="primary" href="/panel/usuarios/{userDetails.userDetails.user_id}/editar"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<main>
<UserDetails {...userDetails.userDetails} />
</main>