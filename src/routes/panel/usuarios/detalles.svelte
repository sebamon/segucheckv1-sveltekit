<script lang="ts">
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
		profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg'
	};
	// Pasar inicial de género a texto legible:
	let genderText;
	if (userDetails.gender == "M") {
		genderText = "Varón";
	} else if (userDetails.gender == "F") {
		genderText = "Mujer";
	} else {
		genderText = userDetails.gender;
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
			<a href="/panel/usuarios">Usuarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-md-3">
		<Image fluid thumbnail src="{userDetails.profilePic}" alt="Aplicación móvil" class="m-2" style="max-width:200px" />
	</div>
	<div class="col-auto">
		<h1>{userDetails.name + ' ' + userDetails.lastName}</h1>
		<p class="lead">Detalles del usuario</p>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/operarios/nuevo"
			><i class="fas fa-pen me-2" />Editar</Button
		>
	</div>
</header>

<!-- Detalles -->
<form name="formDetails" id="formDetails">
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="user_id" class="form-label">Número ID</label>
			<input type="text" id="user_id" name="user_id" class="form-control" placeholder="1234" aria-label="Número ID" value="{userDetails.user_id}" readonly/>
		</div>
		<div class="col-md-6">
			<label for="cuit" class="form-label">Número CUIT</label>
			<input type="text" id="cuit" name="cuit" class="form-control" placeholder="20301001008" aria-label="Número CUIT" value="{userDetails.cuit}" readonly/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Nombre</label>
			<input type="text" id="name" name="name" class="form-control" placeholder="Juan" aria-label="Nombre" value="{userDetails.name}" readonly/>
		</div>
		<div class="col-md-6">
			<label for="lastName" class="form-label">Apellido</label>
			<input type="text" id="lastName" name="lastName" class="form-control" placeholder="Perez" aria-label="First name" value="{userDetails.lastName}" readonly/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="email" class="form-label">Correo electrónico</label>
			<input type="text" id="email" name="email" class="form-control" placeholder="Juan" aria-label="Correo electrónico" value="{userDetails.email}" readonly/>
		</div>
		<div class="col-md-6">
			<label for="phone" class="form-label">Teléfono</label>
			<input type="text" id="phone" name="phone" class="form-control" placeholder="2993334444" aria-label="Teléfono" value="{userDetails.phone}" readonly/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-4">
			<label for="lastName" class="form-label"><small>Género</label>
			<input type="text" id="lastName" name="lastName" class="form-control user-select-all" placeholder="Perez" aria-label="Género" value="{genderText}" readonly/>
		</div>
		<div class="col-md-4">
			<label for="name" class="form-label">Fecha de nacimiento</label>
			<input type="text" id="name" name="name" class="form-control" placeholder="Juan" aria-label="Fecha de nacimiento" value="{userDetails.dateOfBirth}" readonly/>
		</div>
		<div class="col-md-4">
			<label for="lastName" class="form-label">Nacionalidad</label>
			<input type="text" id="lastName" name="lastName" class="form-control" placeholder="Perez" aria-label="Nacionalidad" value="{userDetails.nationality}" readonly/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación</label>
			<input type="text" id="studyLevel" name="studyLevel" class="form-control" placeholder="Universitario completo" aria-label="Correo electrónico" value="{userDetails.studyLevel}" readonly/>
		</div>
		<div class="col-md-6">
			<label for="degree" class="form-label">Título de formación</label>
			<input type="text" id="degree" name="degree" class="form-control" placeholder="Licenciado" aria-label="Título de formación" value="{userDetails.degree}" readonly/>
		</div>
	</div>
</form>
