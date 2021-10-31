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
	import AddressDetails from '$lib/Details/AddressDetails.svelte';
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
	let userAddress = {
		user_id: 1234,
		countryOfOrigin: 'Estados Unidos',
		stateOfOrigin: 'Texas',
		cityOfOrigin: 'Houston',
		zipCodeOfOrigin: 77001,
		addressOfOrigin: '6815 Eastwood St.',
		phoneOfOrigin: '+1-281-555-0185',
		countryOfResidence: 'Argentina',
		stateOfResidence: 'Neuquén',
		cityOfResidence: 'Rincón de los Sauces',
		zipCodeOfResidence: 8319,
		addressOfResidence: 'Roca 893',
		phoneOfResidence: '299-412-3469'
	};

	// Configurar componente AddressDetails para editar
	let isReadOnly = false;

</script>

<svelte:head>
	<title>Editar domicilios: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
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
			<a href="/panel/{userAddress.user_id}">{userAddress.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Domicilios</BreadcrumbItem>
	</Breadcrumb>
    <h1><i class="fas fa-home me-4" />Editar domicilios</h1>
    <p class="lead">Modifique los detalles a continuación.</p>
</header>

<AddressDetails {...userAddress} {isReadOnly} />