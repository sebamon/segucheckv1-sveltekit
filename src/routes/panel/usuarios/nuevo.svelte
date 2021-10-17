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
		Image
	} from 'sveltestrap';

	// Arreglo de roles - Esto lo lee de la DB:
	let roles = [
		{ rol_id: 0, rolDescription: 'Gestor documental' },
		{ rol_id: 2, rolDescription: 'Personal de seguridad' },
		{ rol_id: 3, rolDescription: 'Operario' }
	];
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Nuevo usuario - SeguCheck</title>
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
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1>Nuevo usuario</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

<!-- Formulario nuevo usuario -->
<form name="formUserDetails" id="formUserDetails" action="./create">
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Nombre</label>
			<input
				type="text"
				id="name"
				name="name"
				class="form-control"
				placeholder="Juan"
				aria-label="Nombre"
			/>
		</div>
		<div class="col-md-6">
			<label for="lastName" class="form-label">Apellido</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				class="form-control"
				placeholder="Perez"
				aria-label="Apellido"
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="cuit" class="form-label">Número CUIT</label>
			<input
				type="text"
				id="cuit"
				name="cuit"
				class="form-control"
				placeholder="20301001008"
				aria-label="Número CUIT"
			/>
		</div>
		<div class="col-md-6">
			<label for="gender" class="form-label">Género</label>
			<select id="gender" class="form-select" aria-label="Género">
				<option selected disabled>Elija una opción...</option>
				<option value="M">Masculino</option>
				<option value="F">Femenino</option>
				<option value="X">No binario</option>
			</select>
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
				placeholder="Juan"
				aria-label="Correo electrónico"
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
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Fecha de nacimiento</label>
			<input
				type="date"
				id="name"
				name="name"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Fecha de nacimiento"
			/>
		</div>
		<div class="col-md-6">
			<label for="lastName" class="form-label">Nacionalidad</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				class="form-control"
				placeholder="Argentina"
				aria-label="Nacionalidad"
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación alcanzado</label>
			<select id="studyLevel" class="form-select" aria-label="Nivel de formación alcanzado">
				<option selected disabled>Elija una opción...</option>
				<option value="Primario incompleto">Primario incompleto</option>
				<option value="Primario completo">Primario completo</option>
				<option value="Secundario incompleto">Secundario incompleto</option>
				<option value="Secundario incompleto">Secundario completo</option>
				<option value="Superior no universitario">Superior no universitario incompleto</option>
				<option value="Superior no universitario">Superior no universitario completo</option>
				<option value="Universitario">Universitario incompleto</option>
				<option value="Universitario">Universitario completo</option>
				<option value="Post universitario">Post universitario incompleto</option>
				<option value="Post universitario">Post universitario completo</option>
			</select>
		</div>
		<div class="col-md-6">
			<label for="degree" class="form-label">Título de formación</label>
			<input
				type="text"
				id="degree"
				name="degree"
				class="form-control"
				placeholder="Licenciado"
				aria-label="Título de formación"
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<p>Asignar roles</p>
			{#each roles as { rol_id, rolDescription }}
				<div class="form-check form-switch">
					<input
						type="checkbox"
						id="rol{rol_id}"
						name="roles"
						class="form-check-input"
						role="switch"
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		<div class="col-md-6 d-flex justify-content-end">
			<Button type="submit" color="primary">
				<i class="fas fa-plus me-2"/>Crear
			</Button>
		</div>
	</div>
</form>
