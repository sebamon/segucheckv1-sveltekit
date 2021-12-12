<script context="module">
	export async function load({ fetch , page }) {
		try {
			// const response = await fetch(`./${page.params.slug}/detalle`);
			const response = await fetch(`./${page.params.slug}/detalle`);
			const data = await response.json();
			console.log('** SSR LOAD Usuarios slug**', data);
			return {
				props: {
					data
				}
			};
		} catch (e) {
			console.log('catch error: ', e);
			return {
				props: {}
			};
		}
	}
</script>

<script lang="ts">
	import UserDetails from '$lib/Details/UserDetails.svelte'
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	export let data;
	// let data
	console.log('data en usuario slug', data);
	export let userDetails = data.userDetails;
	export let isReadOnly = true;
	// let f = new Date(data.userDetails.dateOfBirth)
	// let fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
</script>

<svelte:head>
	{#if data.status == 'OK'}
		<title>Usuario: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
	{:else}
		<title>Usuario: Inexistente - SeguCheck</title>
	{/if}
</svelte:head>
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/usuarios">Usuarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/usuarios/{userDetails.user_id}/">{userDetails.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<h1>{userDetails.firstName + ' ' + userDetails.lastName}</h1>
	<h5>Detalles del usuario</h5>
</header>

<main>
	<!-- Formulario detalles usuario -->
	<UserDetails {...userDetails} {isReadOnly} />
</main>
