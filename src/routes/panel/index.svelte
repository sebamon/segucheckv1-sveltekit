<script context="module">
	export async function load() {
		const data = await Promise.all([
			fetch('../usuarios/usuarios'),
			fetch('../operarios/operarios'),
			fetch('../vehiculos/vehiculos'),
			fetch('../trabajos/trabajos')
		]).then(async (result) => {
			const userData = await result[0].json();
			const operatorData = await result[1].json();
			const vehiclesData = await result[2].json();
			const jobsData = await result[3].json();

			return { userData, operatorData, vehiclesData, jobsData };
		});
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	// import { onMount } from 'svelte';
	// import { authenticated } from 'src/stores/auth';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardSubtitle, CardTitle } from 'sveltestrap';
	export let data;

	type warning = {
		none: string;
		low: string;
		medium: string;
		high: string;
	};

	let operatorData = data.operatorData;
	let vehicleData = data.vehicleData;
	let userData = data.userData;
	let jobData = data.jobData;
	let operatorWarning, vehicleWarning, userWarning, jobWarning: warning;

	operatorData.operators.forEach((element) => {
		console.log('Operador: ', element.users);
	});
	vehicleData.vehicles.forEach((element) => {
		console.log('Vehículo: ', element);
	});
	userData.users.forEach((element) => {
		console.log('Usuario: ', element);
	});
	jobData.jobs.forEach((element) => {
		console.log('Trabajo: ', element);
	});

	// Datos de usuario - Ver si esto lo maneja un hook
	let currentUser = 'Juan Perez';
	let message = '';

	const dateDifference = (date1, date2) => {
		// var date1 = new Date('06/30/2019');
		// var date2 = new Date('07/30/2019');

		// Calcula la diferencia de tiempo entre dos fechas
		var difference_In_Time = date2.getTime() - date1.getTime();

		// Convierte el dato anterior en diferencia en días
		var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);

		return difference_In_Days;
	};
</script>

<svelte:head>
	<title>Resumen - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem active>Inicio</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-home me-4" />Resumen</h1>
	<p class="lead">Bienvenido de nuevo, {currentUser}</p>
</header>

<main class="row g-2">
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<a href="/panel/operarios?filter=vencePronto">
					<p class="fs-1 text-center text-primary fw-bolder">18</p>
				</a>
			</div>
			<CardTitle class="fw-bold">Próximos vencimientos en operarios</CardTitle>
			<CardSubtitle>Operarios con documentación a expirar en menos de una semana</CardSubtitle>
			<p class="text-end">
				<a href="/panel/operarios?filter=vencePronto" class="text-decoration-none fw-bold">
					Ver operarios <i class="fas fa-arrow-right me-2" />
				</a>
			</p>
		</CardBody>
	</Card>
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<a href="/panel/vehiculos?filter=vencePronto">
					<p class="fs-1 text-center text-primary fw-bolder">15</p>
				</a>
			</div>
			<CardTitle class="fw-bold">Próximos vencimientos en vehículos</CardTitle>
			<CardSubtitle>Vehículos con documentación a expirar en menos de una semana</CardSubtitle>
			<p class="text-end">
				<a href="/panel/vehiculos?filter=vencePronto" class="text-decoration-none fw-bold">
					Ver vehículos <i class="fas fa-arrow-right me-2" />
				</a>
			</p>
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
			<p class="text-end">
				<a href="/panel/usuarios" class="text-decoration-none fw-bold">
					Gestionar usuarios <i class="fas fa-arrow-right me-2" />
				</a>
			</p>
		</CardBody>
	</Card>
	<Card class="col-xl-3 col-md-6">
		<CardBody>
			<div class="align-content-center" style="height:200px;">
				<p class="fs-1 text-center text-primary fw-bolder">Etc</p>
			</div>
			<CardTitle class="fw-bold">Historial de trabajos</CardTitle>
			<CardSubtitle>Últimas órdenes de trabajo vigentes</CardSubtitle>
			<p class="text-end">
				<a href="/panel/trabajos" class="text-decoration-none fw-bold">
					Ver historial <i class="fas fa-arrow-right me-2" />
				</a>
			</p>
		</CardBody>
	</Card>
</main>
