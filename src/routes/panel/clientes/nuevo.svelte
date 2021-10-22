<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, bussinessName: 'Cliente A' },
		{ customer_id: 2, bussinessName: 'Cliente B' },
		{ customer_id: 3, bussinessName: 'Cliente C' }
	];
	// Atributos
	/* 	customer_id           
	bussinessName          
	contact               
	phone                 
	email                 
	jobs                  
	location              
	requiereddocumentation */
</script>

<svelte:head>
	<title>Nuevo cliente - SeguCheck</title>
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
		<h1><i class="fas fa-industry me-4" />Nuevo cliente</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

<!-- Formulario nuevo usuario -->
<form name="formCustomerDetails" id="formCustomerDetails">
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="bussinessName" class="form-label">Empresa cliente</label>
			<input
				type="text"
				id="bussinessName"
				name="bussinessName"
				class="form-control"
				placeholder="YPF"
				aria-label="Nombre del cliente"
				required
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
				required
			/>
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
				required
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
				required
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
