<script lang="ts">
import DocDetails from '$lib/Details/DocDetails.svelte';

import ModalLogin from '$lib/ModalLogin.svelte';
// import type { User } from '$lib/store';
import type { Prisma } from '.prisma/client';
import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Alert, 
Colgroup,
	} from 'sveltestrap';
import type { Color } from 'sveltestrap/src/shared';

	// Arreglo de roles - Esto lo lee de la DB:
	let rolesList = [
		{ rol_id: 1, rolDescription: 'Gestor documental' },
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
	let user;
	
	let firstName = 'Sebastian'
	let lastName =   'Mon'
	let cuit =  '2034397372'
	let email =   'seba_mon1@hotmaol.com'
	let phone =   '2994738130'
	let dateOfBirth = new Date('1989-02-09')
	let degree =  'Terciario'
	let gender =  'M'
	let nationality =  'Argentino'
	let studyLevel =  'Terciario Completo'
	let rol_id=''
	let color= ''
	let roles_assigned = {
		rol1 : false,
		rol2 : false,
		rol3 : false,
	}
	export let message = ''
	export let status = ''
	export let error =''
	// Arreglo de nivel de estudios:
	let studyLevelList = [
		'Primario incompleto',
		'Primario completo',
		'Secundario incompleto',
		'Secundario incompleto',
		'Superior no universitario',
		'Superior no universitario',
		'Universitario',
		'Universitario',
		'Post universitario',
		'Post universitario'
	];

	// Arreglo de géneros:
	let genderList = [
		{ genderLetter: 'M', genderName: 'Masculino' },
		{ genderLetter: 'F', genderName: 'Femenino' },
		{ genderLetter: 'X', genderName: 'No binario' }
	];
	
	

	const submitForm = async ():Promise<void> =>{  //funcion que toma los datos del formulario y lo envia por metodo post
		console.log('Hola')                         //en forma de api para hacer el insert
		console.log(user)
		try{
			const submit = await fetch('usuarios.json', {
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
				roles_assigned,
			})
			})
			const data = await submit.json()
			message = data.message
			status = data.status
			// user_id = data.body.user_id
			console.log('volvio')
			console.log('submit', submit)
			console.log('data',data)
			console.log('message', message)
			if(data.status==='OK') {
				color='success'
				cleanPage();
			}
			if(data.status==='ERROR') color='danger'

			if(data.status===200)
			{
				console.log('message', message)
			}
			console.log('color:' ,color)
		}catch(err)
		{
			error=err
		}

	}

	//Funcion para limpiar el formulario
	const cleanPage = () => {
	 firstName = ''
	 lastName = ''
	 cuit = ''
	 email = ''
	 phone = ''
	 dateOfBirth = new Date('now()')
	 degree = ''
	 gender = ''
	 nationality = ''
	 studyLevel = ''
	 roles_assigned = {
		 rol1 : false,
		 rol2 : false,
		 rol3 : false,
	 }
	}

	//Funcion para asignar roles
	const assign_rol = (id:any) =>{
		if(id.rol_id === 1 || id.rol_id === '1')
		{
			roles_assigned['rol1']= !(roles_assigned['rol1'])
		}
		if(id.rol_id === 2 || id.rol_id === '2')
		{
			roles_assigned['rol2']=!roles_assigned['rol2']
		}
		if(id.rol_id === 3 || id.rol_id === '3')
		{
			roles_assigned['rol3']=!(roles_assigned['rol3'])
		}
	}
</script>

<svelte:head>
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

{#if status}
<Alert color='{color}'> 
    <h4 class="alert-heading text-capitalize">{status}</h4>
    {message}
    <a href="#todo" class="alert-link">
      Also, alert-links are colored to match
    </a>
    .
  </Alert>
  {/if}
<!-- Formulario nuevo usuario -->
<form name="formUserDetails" id="formUserDetails" on:submit|preventDefault={submitForm}>
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
				{#each genderList as thisGender}
					<option value={thisGender.genderLetter}>
						{thisGender.genderName}
					</option>
				{/each}
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
			<label for="dateOfBirth" class="form-label">Fecha de nacimiento</label>
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
				{#each studyLevelList as thisStudyLevel}
					<option value={thisStudyLevel}>{thisStudyLevel}</option>
				{/each}
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
			<label for="roles" class="form-label">Roles asignados</label>
			{#each rolesList as { rol_id, rolDescription }}
				<div class="form-check form-switch">
					<input
						type="checkbox"
						id="rol{rol_id}"
						name="roles"
						class="form-check-input"
						bind:value={rol_id}	
						on:click={assign_rol({rol_id})}
						
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		<div class="col-md-6">
			<label for="profilePic" class="form-label">Foto de perfil</label>
			<input class="form-control" type="file" id="profilePic" />
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12 d-flex justify-content-end">
			<Button type="submit" color="primary">
				<i class="fas fa-plus me-2" />Crear
			</Button>
		</div>
	</div>
</form>
