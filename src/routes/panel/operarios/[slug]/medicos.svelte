<script context="module">
    /* Configurar!
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
    */
</script>

<script lang="ts">
	import HealthInfo from '$lib/Details/HealthInfo.svelte';
import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Breadcrumb,
		BreadcrumbItem,
		Alert
	} from 'sveltestrap';

	/* export let data;
	export let userDetails=data.userDetails
	let color = 'success' */
	
    // Datos placeholder:
	let userDetails = {
		user_id: 1234,
		firstName: 'Juan',
		lastName: 'Perez'
	};
	let userHealthInfo = {
		user_id: 1234,
		bloodType: 'A',
		rh: true,
		allergies: 'Ninguno'
	};

	// Configurar componente AddressDetails para editar
	let isReadOnly = false;

</script>

<svelte:head>
	<title>Editar datos médicos: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/{userHealthInfo.user_id}">{userHealthInfo.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Médicos</BreadcrumbItem>
	</Breadcrumb>
    <h1><i class="fas fa-briefcase me-4" />Editar datos médicos</h1>
    <p class="lead">Modifique los detalles a continuación.</p>
</header>

<HealthInfo {...userHealthInfo} {isReadOnly} />