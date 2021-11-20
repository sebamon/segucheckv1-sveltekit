<script context="module">
	export async function load({fetch,page}){
		try {
			const response = await fetch(`./${page.params.slug}/detalle`);
			const data =  await response.json()

			return {
				props:{
					data
				}
			}
		} catch (error) {
			console.error(error)
		}
	}
</script>
<script lang="ts">
import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem,
		TabContent,
		TabPane, } from 'sveltestrap';

	// Info cliente placeholder (esto lo recibe del servidor en estructura similar):
	// let customerDetails = {
	// 	customer_id: '1',
	// 	businessName: 'YPF',
	// 	contact: 'Juan Perez',
	// 	phone: '2993334444',
	// 	email: 'juan.perez@ejemplo.com',
	// 	jobs: {},
	// 	location: [
	// 		{ location_id: 1, locationName: 'Locación A' },
	// 		{ location_id: 2, locationName: 'Locación B' },
	// 		{ location_id: 3, locationName: 'Locación C' }
	// 	],
	// 	requiereddocumentation: {}
	// }
	export let data
	export let customerDetails=data.customerDetails
	
</script>

<svelte:head>
	<title>Cliente: {customerDetails.businessName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/clientes">Clientes</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />{customerDetails.businessName}</h1>
		<p class="lead">Detalles del cliente</p>
	</div>
</header>

<TabContent>
	<TabPane tabId="customerDetails" tab="Datos básicos" active>
		<h2 class="my-4">Datos básicos</h2>
		<form name="formCustomerDetails" id="formCustomerDetails">
			<div class="row mb-3 g-3">
				<div class="col-md-6">
					<label for="customer_id" class="form-label">Número de empresa</label>
					<input
						type="text"
						id="user_id"
						name="user_id"
						class="form-control"
						placeholder="1234"
						aria-label="Número ID"
						bind:value={customerDetails.customer_id}
						readonly
					/>
				</div>
				<div class="col-md-6">
					<label for="businessName" class="form-label">Nombre de empresa</label>
					<input
						type="text"
						id="businessName"
						name="businessName"
						class="form-control"
						placeholder="YPF"
						aria-label="Nombre de empresa"
						bind:value={customerDetails.businessName}
						readonly
					/>
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-md-6">
					<label for="businessName" class="form-label">Nombre del contacto</label>
					<input
						type="text"
						id="contact"
						name="contact"
						class="form-control"
						placeholder="Juan Perez"
						aria-label="Nombre del contacto"
						bind:value={customerDetails.contact}
						readonly
					/>
				</div>
				<div class="col-md-6">
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-md-6">
					<label for="email" class="form-label">Correo electrónico</label>
					<input
						type="email"
						id="email"
						name="email"
						class="form-control"
						placeholder="juan.perez@ejemplo.com"
						aria-label="Correo electrónico"
						bind:value={customerDetails.email}
						readonly
					/>
				</div>
				<div class="col-md-6">
					<label for="phone" class="form-label">Teléfono</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						class="form-control"
						placeholder="2993334444"
						aria-label="Teléfono"
						bind:value={customerDetails.phone}
						readonly
					/>
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-md-6" />
				<div class="col-md-6 d-flex justify-content-end">
					<Button type="submit" color="primary">
						<i class="fas fa-plus me-2" />Crear
					</Button>
				</div>
			</div>
		</form>

	</TabPane>
	<TabPane tabId="customerJobs" tab="Trabajos">
		<h2 class="my-4">Trabajos</h2>
		
	</TabPane>
	<TabPane tabId="customerLocations" tab="Locaciones">
		<h2 class="my-4">Locaciones</h2>
		
	</TabPane>
	<TabPane tabId="customerReqDocs" tab="Documentación requerida">
		<h2 class="my-4">Documentación requerida</h2>
		
	</TabPane>
</TabContent>