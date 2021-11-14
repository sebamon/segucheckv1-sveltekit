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
	import WorkInfo from '$lib/Details/WorkInfo.svelte';
	import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, Alert } from 'sveltestrap';

	/* export let data;
	export let userDetails=data.userDetails
	let color = 'success' */

	// Datos placeholder:
	let userDetails = {
		user_id: 1,
		firstName: 'Juan',
		lastName: 'Perez'
	};
	let userWorkInfo = {
		user_id: 1,
		dischargeDate: new Date('2019-08-21'),
		employementRel: 'Relación de dependencia',
		hiringMode: 'A tiempo completo',
		unionAgreement: 'Federación Sindicatos Unidos Petroleros',
		job: 'Técnico Vertical'
	};

	// Configurar componente AddressDetails para editar
	let isReadOnly = false;
</script>

<svelte:head>
	<title
		>Editar datos laborales: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title
	>
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
			<a href="/panel/{userWorkInfo.user_id}">{userWorkInfo.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Laborales</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-briefcase me-4" />Editar datos laborales</h1>
	<p class="lead">Modifique los detalles a continuación.</p>
</header>

<main>
	<WorkInfo {...userWorkInfo} {isReadOnly} />
</main>
