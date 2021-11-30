<script context="module">
	export async function load({fetch , page}){
		const response = await fetch(`./detalle`)
		const data  = await response.json()
		return {
			props:{
				data,
			}	
		}
	}
</script>
<script lang="ts">
	import VehicleDetails from '$lib/Details/VehicleDetails.svelte';
	import { dataset_dev } from 'svelte/internal';
	import type { Color } from 'sveltestrap/src/shared';

// Importar por nombre de componentes: https://sveltestrap.js.org/
import {
	Breadcrumb,
	BreadcrumbItem,
	Alert
} from 'sveltestrap';

	export let data;
	let status
	let error = data.error
	let message = data.message
	
	export let vehicleDetails=data.vehicleDetails
	let color:Color = 'success'
	
	// Configurar componente UserDetails para editar
	let isReadOnly = false;

	function handleSubmit() {
		console.log('llego el submit')
	}

</script>

<svelte:head>
	<title>Editar Vehiculo: {vehicleDetails.domain} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/vehiculos">Vehiculos</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/vehiculos/{vehicleDetails.vehicle_id}">{vehicleDetails.vehicle_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-user me-4" />Editar vehiculo</h1>
		<p class="lead">Modifique los detalles a continuación.</p>
	</div>
</header>

<VehicleDetails {...vehicleDetails} {isReadOnly} on:submit{handleSubmit}/>