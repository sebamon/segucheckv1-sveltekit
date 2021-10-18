<script lang="ts" context="module">
	export async function load({ page, fetch }) {
			const res = await fetch('usuarios');
			// console.log(res.body)
			const item = await res.json(res);
			// return { props: { item } };
			console.log("array",item)
			let firstName = 'Seba';
			let lastName =  'Mon';
			let cuit = '2034397372';
			let email =  'seba_mon1@hotmail.com';
			let phone =  '2994738130';
			let dateOfBirt =  '1989/02/09';
			let degree = 'Terciario';
			let gender = 'M';
			let nationality = 'Argentino';
			let studyLevel = 'Terciario Completo';
			console.log('load',
				firstName,
				lastName,
				cuit,
				email,
				phone,
				dateOfBirt,
				degree,
				gender,
				nationality,
				studyLevel,
			)
			return {
				firstName,
				lastName,
				cuit,
				email,
				phone,
				dateOfBirt,
				degree,
				gender,
				nationality,
				studyLevel,
			}
		}
</script>

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

	// let firstName:string
	// let lastName:string;
	// let cuit:string;
	// let email:string;
	// let phone:string;
	// let dateOfBirth:Date = new Date('1989/09/02')
	// let degree:string;
	// let gender:string;
	// let nationality:string;
	// let studyLevel:string;
	
	let firstName : string = 'Sebastian';
	let lastName : string =   'Mon';
	let cuit : string =  '2034397372';
	let email : string =   'seba_mon1@hotmaol.com';
	let phone : string =   '2994738130';
	let dateOfBirth : Date = new Date('1989/02/09');
	let degree : string =  'Terciario';
	let gender : string =  'M';
	let nationality : string =  'Argentino';
	let studyLevel : string =  'Terciario Completo';

	const submitForm = async ():Promise<void> =>{ 
		console.log('Hola')
		console.log(firstName)
		const submit = await fetch('usuarios', {
			method : "POST",
			body: JSON.stringify({
				firstName,
				lastName,
				cuit,
				email,
				phone,
				dateOfBirth,
				degree,
				gender,
				nationality,
				studyLevel,
			}),
		})

		const data = await submit.json()
		console.log('volvio')
		console.log(data);
	}
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
<form name="formUserDetails" id="formUserDetails" on:submit={submitForm}>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="firstname" class="form-label">Nombre</label>
			<input
				type="text"
				id="firstname"
				name="firstname"
				class="form-control"
				placeholder="Juan"
				aria-label="Nombre"
				required
				bind:value={firstName}
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
				required
				bind:value={lastName}
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
				required
				bind:value={cuit}
			/>
		</div>
		<div class="col-md-6">
			<label for="gender" class="form-label">Género</label>
			<select id="gender" class="form-select" aria-label="Género" required bind:value={gender}>
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
				bind:value={email}
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
				bind:value={phone}
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Fecha de nacimiento</label>
			<input
				type="date"
				id="dateOfBirth"
				name="dateOfBirth"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Fecha de nacimiento"
				bind:value={dateOfBirth}
			/>
		</div>
		<div class="col-md-6">
			<label for="nationality" class="form-label">Nacionalidad</label>
			<input
				type="text"
				id="nationality"
				name="nationality"
				class="form-control"
				placeholder="Argentina"
				aria-label="Nacionalidad"
				bind:value={nationality}
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación alcanzado</label>
			<select id="studyLevel" class="form-select" aria-label="Nivel de formación alcanzado" bind:value={studyLevel}>
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
				bind:value={degree}
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
						bind:value={rol_id}
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
