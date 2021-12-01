<script context="module">
	export async function load({ page, fetch}) {
		try {
			const response = await fetch('./clientes/clientes')
			const data = await response.json()
			if(data.customers)
			{
				return {
					props: {
						data
					}
				}
			}else{
				return {
					props: {
						data : {}
					}
				}
			}
		} catch (error) {
			console.error(error)	
			return {
				props : {}
			}
		}
	}
</script>
<script lang="ts">

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem , Alert} from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte'
	export let data
	export let customers = data.customers
	
	// console.log(customers)
	
</script>

<svelte:head>
	<title>Clientes - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Clientes</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />Clientes</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/clientes/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
{#if data.status!=='OK'}
	<SeguAlert status={data.status} message={data.message} path=clientes/>
{/if}

{#if customers.length > 0}
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
					<th scope="col">ID cliente</th>
					<th scope="col">Nombre empresa</th>
					<th scope="col">Nombre contacto</th>
					<th scope="col">Email</th>
					<th scope="col">Teléfono</th>
				</tr>
			</thead>
			<tbody>
			{#each customers as customer}
				<tr>
					<td>
						<a class="text-decoration-none text-dark" href="./clientes/{customer.customer_id}">
							{customer.customer_id}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./clientes/{customer.customer_id}">
							{customer.businessName}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./clientes/{customer.customer_id}">
							{customer.contact}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./clientes/{customer.customer_id}">
							{customer.email}
						</a>
					</td>
					<td>
						<a class="text-decoration-none text-dark" href="./clientes/{customer.customer_id}">
							{customer.phone}
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