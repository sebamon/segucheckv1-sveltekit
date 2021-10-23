<script context="module">
export async function load({ page, fetch }) {
	console.log('load usuarios/slug/detalle')
	console.log('page.params.slug', page.params.slug)
	const response = await fetch(`./${page.params.slug}/detalle.json`, {
		method: "GET",
		request: page.params.slug
	})
	const userDetails = await response.json()
	// console.log( await response.json())
	
	console.log('userDetails', userDetails)
	return {
		props: {
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
		BreadcrumbItem,
		Image
	} from 'sveltestrap';
	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):

	export let userDetails;
	console.log('userDetails segundo script',userDetails)
	userDetails=userDetails.result
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
		<h1>{userDetails.firstName + ' ' + userDetails.lastName}</h1>
		<h5>Detalles del usuario</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/usuarios/editar"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<main>
<UserDetails {...userDetails} />
</main>