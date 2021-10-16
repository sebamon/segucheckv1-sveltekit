<script lang="ts">
	import UserDetails from "$lib/Details/UserDetails.svelte";

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		TabContent,
		TabPane,
		Image
	} from 'sveltestrap';

	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	let userDetails = {
		user_id: '1234',
		cuit: '20301001008',
		name: 'Juan',
		lastName: 'Perez',
		email: 'juan.perez@ejemplo.com',
		phone: '2993334444',
		gender: 'M',
		dateOfBirth: '1980-12-31',
		nationality: 'Argentina',
		studyLevel: 'Universitario completo',
		degree: 'Licenciado',
		profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg',
		roles: [
			{ rol_id: 1, rolDescription: 'Gestor documental' },
			{ rol_id: 2, rolDescription: 'Personal de seguridad' }
		]
	};

	let habilitaciones = {};
	let userWorkInfo = {};
	let userAddress = {};
	let userHealthInfo = {};

	// Info completa del operario:
	let operatorDetails = {
		userDetails,
		habilitaciones,
		userWorkInfo,
		userAddress,
		userHealthInfo
	};
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Detalles: {userDetails.name + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-md-3">
		<Image
			fluid
			thumbnail
			src={userDetails.profilePic}
			alt="Aplicación móvil"
			class="m-2"
			style="max-width:150px"
		/>
	</div>
	<div class="col-auto">
		<h1>{userDetails.name + ' ' + userDetails.lastName}</h1>
		<p class="lead">Detalles del operario</p>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/operarios/nuevo"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<TabContent>
	<TabPane tabId="userDetails" tab="Datos básicos" class="mt-4" active>
		<!-- Datos básicos -->
		<h2>Datos básicos</h2>
		<UserDetails { operatorDetails.userDetails } /> <!-- ACA ESTA EL ERROR, si quito la llave, el componente funciona porque tiene un objeto con valores vacíos -->
	</TabPane>
	<TabPane tabId="habilitaciones" tab="Habilitaciones">
		<h2>Habilitaciones</h2>
	</TabPane>
	<TabPane tabId="userWorkInfo" tab="Datos laborales">
		<h2>Datos laborales</h2>
	</TabPane>
	<TabPane tabId="userAddress" tab="Domicilios">
		<h2>Domicilios</h2>
	</TabPane>
	<TabPane tabId="userHealthInfo" tab="Datos médicos">
		<h2>Datos laborales</h2>
	</TabPane>
</TabContent>
