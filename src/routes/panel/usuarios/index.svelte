<script context="module">

export async function load({ page, fetch }) {
	console.log('load usuario/index.svelte')
	try{
	const response = await fetch(`./usuarios/usuarios.json?`,)
	const users = await response.json()
	console.log('funcion load: response: ',response)
	console.log('funcion load: response.body: ',response.body)
	console.log('funcion load: user.user: ', users.users)
	return {
		props: {	
			users,
		}
	};
	}catch(e){
		console.log("error",e)
	}

}

</script>
<script>
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	// import { onMount } from 'svelte';
	//import { page, session } from '$app/stores';
	export let users;

	// onMount(() => console.log(`mounted component`));
  
	console.log('script interno users: ',{users})
</script>

<svelte:head>
	<title>Usuarios - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Usuarios</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-users me-4" />Usuarios</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/usuarios/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<!-- Contenido principal -->
<main>
	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle">
			<thead>
				<tr>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
				</tr>
				<tr>
					<th scope="col">ID Cuenta</th>
					<th scope="col">DNI</th>
					<th scope="col">Nombre</th>
					<th scope="col">Apellido</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{#each users.users as user }
				<tr>
					<td>{user.user_id}</td>
					<td>{user.cuit}</td>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.email}</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
