<script context="module">
	export async function load({fetch, page}) {
		const data = await Promise.all([
			fetch('../panel/usuarios/usuarios'),
			fetch('../panel/operarios/operarios'),
			fetch('../panel/vehiculos/vehiculos'),
			fetch('../panel/trabajos/trabajos'),
			fetch('../panel/panel')
		]).then(async (result) => {
			const userData = await result[0].json();
			const operatorData = await result[1].json();
			const vehiclesData = await result[2].json();
			const jobsData = await result[3].json();
			const dashboard = await result[4].json();

			return { userData, operatorData, vehiclesData, jobsData ,dashboard};

		});
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/


import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardSubtitle, CardTitle } from 'sveltestrap';
	export let data;

	type warning = {
		none: string;
		low: string;
		medium: string;
		high: string;
	};

	export let operatorData = data.operatorData.operators;
	export let vehicleData = data.vehiclesData.vehicles;
	export let userData = data.userData.users;
	export let jobData = data.jobsData.jobs;
	export let dashboard = data.dashboard.dashboard;
	let operatorWarning, vehicleWarning, userWarning, jobWarning: warning;

	let operariosActivos = 0
	function dashboardOperariosActivos(){
		operatorData.forEach(element => {
			if(element.users.active){
				operariosActivos++
			}
			console.log('element', element.users.active)
		});
		return operariosActivos
	}
	// operatorData.forEach((element) => {
	// 	console.log('Operador: ', element.users);
	// });
	// vehicleData.forEach((element) => {
	// 	console.log('Vehículo: ', element);
	// });
	// userData.forEach((element) => {
	// 	console.log('Usuario: ', element);
	// });
	// jobData.forEach((element) => {
	// 	console.log('Trabajo: ', element);
	// });

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
<!-- operatorData{JSON.stringify(operatorData)}
<hr>
vehicleData{JSON.stringify(vehicleData)}
<hr>
userData{JSON.stringify(userData)}
<hr>
jobData{JSON.stringify(jobData)} -->

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem active>Inicio</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-home me-4" />Resumen</h1>
	<p class="lead">Bienvenido de nuevo, {currentUser}</p>
</header>

operariosActivos{JSON.stringify((dashboardOperariosActivos()))}
<hr>
operatorData{JSON.stringify(operatorData)}
<hr>
vehicleData{JSON.stringify(vehicleData)}
<hr>
userData{JSON.stringify(userData)}
<hr>
jobData{JSON.stringify(jobData)}
<hr>
dashboard{JSON.stringify(dashboard)}
<hr>

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
				<p class="fs-1 text-center text-primary fw-bolder">{userData.length}</p>
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
				<p class="fs-1 text-center text-primary fw-bolder">{operariosActivos}</p>
			</div>
			<CardTitle class="fw-bold">Operarios activos</CardTitle>
			<CardSubtitle>
				Puede registrar nuevos operarios, modificar sus datos o realizar la baja de los mismos
			</CardSubtitle>
			<p class="text-end">
				<a href="/panel/operarios" class="text-decoration-none fw-bold">
					Gestionar operarios <i class="fas fa-arrow-right me-2" />
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
