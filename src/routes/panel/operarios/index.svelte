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
			{#if operators.length>0}
				<tbody>
					{#each operators as operator}
						<tr>
							<!-- <td>{operator.user_id}></td>
							<td>{operator.cuit}></td>
							<td>{operator.firstName}></td>
							<td>{operator.lastName}></td> -->
							<td>Habilitado</td>
						</tr>
					{/each}
				</tbody>
			{/if}
			</table>
		</div>
	{#if data.status==='INFO'}
		<Alert color='success'> 
			<h4 class="alert-heading text-capitalize">Atención:</h4>
			<p>{data.message}</p>
		</Alert>
	{/if}
</main>
