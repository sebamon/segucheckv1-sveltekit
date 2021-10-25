<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem,
		TabContent,
		TabPane, } from 'sveltestrap';

	// Info cliente placeholder (esto lo recibe del servidor en estructura similar):
	let customerDetails = {
		customer_id: '1',
		bussinessName: 'YPF',
		contact: 'Juan Perez',
		phone: '2993334444',
		email: 'juan.perez@ejemplo.com',
		jobs: {},
		location: [
			{ location_id: 1, locationName: 'Locación A' },
			{ location_id: 2, locationName: 'Locación B' },
			{ location_id: 3, locationName: 'Locación C' }
		],
		requiereddocumentation: {}
	}
	// Atributos
	/* 	customer_id           
	bussinessName          
	contact               
	phone                 
	email                 
	jobs                  []
	location              []
	requiereddocumentation [] */
</script>

<svelte:head>
	<title>Cliente: {customerDetails.bussinessName} - SeguCheck</title>
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
		<h1><i class="fas fa-industry me-4" />{customerDetails.bussinessName}</h1>
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
						value={customerDetails.customer_id}
						readonly
					/>
				</div>
				<div class="col-md-6">
					<label for="bussinessName" class="form-label">Nombre de empresa</label>
					<input
						type="text"
						id="bussinessName"
						name="bussinessName"
						class="form-control"
						placeholder="YPF"
						aria-label="Nombre de empresa"
						value={customerDetails.contact}
						readonly
					/>
				</div>
				<div class="col-md-6">
					<label for="bussinessName" class="form-label">Nombre del contacto</label>
					<input
						type="text"
						id="contact"
						name="contact"
						class="form-control"
						placeholder="Juan Perez"
						aria-label="Nombre del contacto"
						value={customerDetails.contact}
						readonly
					/>
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-md-6">
					<label for="bussinessName" class="form-label">Nombre del contacto</label>
					<input
						type="text"
						id="contact"
						name="contact"
						class="form-control"
						placeholder="Juan Perez"
						aria-label="Nombre del contacto"
						value={customerDetails.contact}
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
						value={customerDetails.email}
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
						value={customerDetails.phone}
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