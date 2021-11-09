<script context="module">
	export async function load ({fetch , page}){
		try{

			const response = await fetch('./operarios/operarios',{
				method : "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
			console.log('data',data)
			return {
				props: {
					data
				}
			}
		}catch(e){
			console.log('error',e)
			return {
				props:
					{}
			}
		}
}
</script>
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem , Alert} from 'sveltestrap';
	export let data
	export let operators = data.operators


	interface user  {
		user_id : number,
		firstName : string,
		lastName : string,
		cuit : string,
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
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/usuarios/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	{#if data.status==='INFO'}
		<Alert color='secondary'> 
			<h4 class="alert-heading text-capitalize">Atención:</h4>
			<p>{data.message}</p>
		</Alert>
	{:else}
	{#if operators.length>0}
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
								<a class="text-decoration-none text-dark" href="./operarios/{operator.users.user_id}">
									{operator.users.user_id}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./operarios/{operator.users.user_id}">
									{operator.users.cuit}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./operarios/{operator.users.user_id}">
									{operator.users.firstName}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./operarios/{operator.users.user_id}">
									{operator.users.lastName}
								</a>
							</td>
							<td>
								<a class="text-decoration-none text-dark" href="./operarios/{operator.users.user_id}">
									Habilitado
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{/if}
</main>
