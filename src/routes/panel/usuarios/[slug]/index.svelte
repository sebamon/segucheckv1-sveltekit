<script context="module">
	export async function load({ page, fetch }) {
		const response = await fetch(`./${page.params.slug}/detalle`);
		const data = await response.json();
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	import UserDetails from '$lib/Details/UserDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	export let data;
	// console.log(data);
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
	<UserDetails {...userDetails} {isReadOnly} />
</main>
