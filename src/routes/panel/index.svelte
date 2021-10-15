<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Breadcrumb,
		BreadcrumbItem,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle
	} from 'sveltestrap';

	// Datos de usuario - Ver si esto lo maneja un hook
	let actualUser = 'Juan Perez';
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Resumen - SeguCheck</title>
</svelte:head>

<!-- Posición -->
<Breadcrumb>
	<BreadcrumbItem active>Resumen</BreadcrumbItem>
</Breadcrumb>
<h1>Resumen</h1>
<p class="lead">Bienvenido de nuevo, {actualUser}</p>
<div class="row g-2">
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<p class="fs-1 text-center text-primary fw-bolder">18</p>
			</div>
			<CardTitle class="fw-bold">Próximos vencimientos en operarios</CardTitle>
			<CardSubtitle>Operarios con documentación a expirar en menos de una semana</CardSubtitle>
			<a href="/panel/operarios?filter=vencePronto" class="text-decoration-none fw-bold">
				Ver operarios <i class="fas fa-arrow-right mx-2" />
			</a>
		</CardBody>
	</Card>
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<p class="fs-1 text-center text-primary fw-bolder">18</p>
			</div>
			<CardTitle class="fw-bold">Próximos vencimientos en vehículos</CardTitle>
			<CardSubtitle>Vehículos con documentación a expirar en menos de una semana</CardSubtitle>
			<a href="/panel/vehiculos?filter=vencePronto" class="text-decoration-none fw-bold">
				Ver vehículos <i class="fas fa-arrow-right mx-2" />
			</a>
		</CardBody>
	</Card>
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<p class="fs-1 text-center text-primary fw-bolder">10</p>
			</div>
			<CardTitle class="fw-bold">Usuarios activos</CardTitle>
			<CardSubtitle>
				Puede registrar nuevos usuarios, modificar sus datos o realizar la baja de los mismos
			</CardSubtitle>
			<a href="/info/plataforma" class="text-decoration-none fw-bold">
				Gestionar usuarios <i class="fas fa-arrow-right mx-2" />
			</a>
		</CardBody>
	</Card>
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<p class="fs-1 text-center text-primary fw-bolder">Etc</p>
			</div>
			<CardTitle class="fw-bold">Historial de trabajos</CardTitle>
			<CardSubtitle>Últimas órdenes de trabajo vigentes</CardSubtitle>
			<a href="/info/plataforma" class="text-decoration-none fw-bold">
				Ver historial <i class="fas fa-arrow-right mx-2" />
			</a>
		</CardBody>
	</Card>
</div>
