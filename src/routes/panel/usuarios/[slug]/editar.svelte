<script context="module">
	export async function load({ fetch, page }) {
		const response = await fetch(`./detalle`);
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
	import SeguAlert from '$lib/SeguAlert.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem} from 'sveltestrap';
	export let data;
	export let userDetails = data.userDetails;
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
		<BreadcrumbItem>
			<a href="/panel/usuarios/{userDetails.user_id}">{userDetails.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-user me-4" />Editar usuario</h1>
		<p class="lead">Modifique los detalles a continuación.</p>
	</div>
</header>

<main>

	<UserDetails {...userDetails} {isReadOnly} />
</main>