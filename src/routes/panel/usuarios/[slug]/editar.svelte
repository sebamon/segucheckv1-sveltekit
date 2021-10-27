<script context="module">
	export async function load({fetch , page}){
		console.log('load usuarios/slug/editar')
		console.log('page.params.slug', page.params.slug)
		const response = await fetch(`./detalle.json`, {
		method: "GET",
		request: page.params.slug
		})
		console.log('response editar: ',response)
		const userDetails  = await response.json()
		console.log('userDetails editar.svlete: ', userDetails)
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
		Breadcrumb,
		BreadcrumbItem,
		Alert
	} from 'sveltestrap';

	export let userDetails
	let color = 'success'
	
	// console.log('Editar.svelte userDetails: ', userDetails.firstName)
    // Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	// let userDetails = {
	// 	user_id: 1234,
	// 	cuit: 20301001008,
	// 	firstName: 'Juan',
	// 	lastName: 'Perez',
	// 	email: 'juan.perez@ejemplo.com',
	// 	phone: '2993334444',
	// 	gender: 'M',
	// 	dateOfBirth: new Date('1980-12-31'),
	// 	nationality: 'Argentina',
	// 	studyLevel: 'Universitario completo',
	// 	degree: 'Licenciado',
	// 	profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg',
	// 	roles: [
	// 		{ rol_id: 1, rolDescription: 'Gestor documental' },
	// 		{ rol_id: 2, rolDescription: 'Personal de seguridad' }
	// 	]
	// };

	// Configurar componente UserDetails para editar
	let isReadOnly = false;

</script>

<svelte:head>
	<title>Editar usuario: {userDetails.userDetails.firstName + ' ' + userDetails.userDetails.lastName} - SeguCheck</title>
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

	<UserDetails {...userDetails.userDetails} {isReadOnly} />
