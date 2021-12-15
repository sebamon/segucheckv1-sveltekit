<script context="module">
	export async function load({ fetch, page }) {
		try {
			const response = await fetch('./operarios/operarios', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
		
			return {
				props: {
					data
				}
			};
		} catch (e) {
			console.log('error', e);
			return {
				props: {}
			};
		}
	}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte'; 
	export let data;
	export let operators = data.operators;

	interface user {
		user_id: number;
		firstName: string;
		lastName: string;
		cuit: string;
	}

</script>

<svelte:head>
	<title>Operarios - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Operarios</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-walking me-4" />Operarios</h1>
		<h5>Mostrando todos los elementos.</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/usuarios/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>	
	{#if data.status !== 'OK'}
		<SeguAlert status={data.status} message={data.message} path=operarios/>
	{/if}
	{#if operators.length > 0}
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
						<th scope="col">Estado Habilitación</th>
					</tr>
				</thead>
				<tbody>
					{#each operators as operator}
						<tr>
							<td>
								<a
									class="text-decoration-none text-dark"
									href="./operarios/{operator.operator_id}"
								>
									{operator.users.user_id}
								</a>
							</td>
							<td>
								<a
									class="text-decoration-none text-dark"
									href="./operarios/{operator.operator_id}"
								>
									{operator.users.cuit}
								</a>
							</td>
							<td>
								<a
									class="text-decoration-none text-dark"
									href="./operarios/{operator.operator_id}"
								>
									{operator.users.firstName}
								</a>
							</td>
							<td>
								<a
									class="text-decoration-none text-dark"
									href="./operarios/{operator.operator_id}"
								>
									{operator.users.lastName}
								</a>
							</td>
							<td>
								<a
									class="text-decoration-none text-dark px-5"
									href="./operarios/{operator.operator_id}"
								>
								{#if operator.users.active}
										<i class="fas fa-check-circle me-2 text-success" />
									{:else}
										<i class="fas fa-times-circle me-2 text-danger" />
									{/if}
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