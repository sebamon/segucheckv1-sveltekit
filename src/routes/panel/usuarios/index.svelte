<script context="module">
	// panel/usuarios.svelte: Lee de la BD y lista los usuarios registrados
	export async function load({ page, fetch , session}) {
		try {
			const response = await fetch(`./usuarios/usuarios`)
			const data = await response.json();

			return {
				props: {
					data,
					session
				}
			};
		} catch (e) {
			console.log('error', e);
			return {
				props: {}
			}
		}
	}
</script>

<script>
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem, Alert } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	export let data = {
		users: [{}]
	}
	export let users = data.users
	// export let users = data.users;
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
	{#if data.status!=='OK'}
	<SeguAlert status={data.status} message={data.message} path=usuarios/>
	{/if}
	{#if users.length>0}
	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle text-center">
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
				{#each users as user}
					<tr>
						<td>
							<a class="text-decoration-none text-dark" href="./usuarios/{user.user_id}">
								{user.user_id}
							</a>
						</td>
						<td>
							<a class="text-decoration-none text-dark" href="./usuarios/{user.user_id}">
								{user.cuit}
							</a>
						</td>
						<td>
							<a class="text-decoration-none text-dark" href="./usuarios/{user.user_id}">
								{user.firstName}
							</a>
						</td>
						<td>
							<a class="text-decoration-none text-dark" href="./usuarios/{user.user_id}">
								{user.lastName}
							</a>
						</td>
						<td>
							<a class="text-decoration-none text-dark" href="./usuarios/{user.user_id}">
								{user.email}
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{/if}
</main>

<style>
	/* Solución filas de tablas como links: https://stackoverflow.com/questions/1460958/html-table-row-like-a-link */
	table tr td a {
		display: block;
		height: 100%;
		width: 100%;
	}
	table tr td {
		padding-left: 0;
		padding-right: 0;
	}
</style>
