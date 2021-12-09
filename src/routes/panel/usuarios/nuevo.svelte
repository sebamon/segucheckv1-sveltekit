<script context="module">
	export async function load({fetch, page}){
		const response = await fetch(`../../api/roles`)
		const data = await response.json()
		console.log('nuevo load data',data)
		return {
			props: {
				data
			}
		}
	}
</script>
<script lang="ts">
	export let data
	export let rolesList= data.roles
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, Alert, FormGroup } from 'sveltestrap';
	import ImgUpload from '$lib/ImgUpload.svelte'
	import moment from 'moment';

	// Arreglo de roles - Esto lo lee de la DB:
	// let rolesList = [
	// 	{ rol_id: 1, rolDescription: 'Gestor documental' },
	// 	{ rol_id: 2, rolDescription: 'Personal de seguridad' },
	// 	{ rol_id: 3, rolDescription: 'Operario' }
	// ];

	let firstName: string;
	let lastName: string;
	let cuit: string;
	let email: string;
	let phone: string;
	let dateOfBirth: Date = new Date('2000/01/01');
	let degree: string;
	let gender: string;
	let nationality: string;
	let studyLevel: string;
	let profilePic;

	// Controles globales
	let fileName, fileExtension, readyToUpload;

		// export let captureImage
	export function captureImage(e){
		console.log('captureImage',e.detail);
		fileName = e.detail.fileName;
		fileExtension = e.detail.fileExtension;
		readyToUpload = e.detail.readyToUpload;
		profilePic = `${fileName}.${fileExtension}`
			
		
		// setTimeout(()=>{
		//subir(fileName, fileExtension)
		// }, 6000);
		console.log('file: ' + fileName + ', fileExt: ' + fileExtension + ', profilePic: ' + profilePic);
	}

	const subir = async(fileName, fileExtension) => {

		console.log('entrando al subir. FileName: ' + fileName + ', FileExtension: ' + fileExtension);
		try{

			let url = '../../../api/driveSet';
			let fileData = {
				fileName: fileName,
				fileExtension: fileExtension
			};
			
			let response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(fileData)
			});
			
			console.log(response)
			const data = await response.json()
			
			console.log('la imagen subida: ',data)
			let fileId = {
				fileId: data.id,
			};
			console.log('fileID',fileId)
			// let urlId = 'http://localhost:3000/api/driveGet';
			// let responseId = await fetch(url, {
			// 	method: 'POST',
			// 	body: JSON.stringify(fileId)
			// });
			// const dataId = await responseId.json()
			// console.log('Mi link para compartir: ' + JSON.parse(dataId));
			// profilePic = JSON.parse(dataId);
		}catch(e){
			console.log(e)
			return 'Sin Datos'
		}
		
	}


	export async function subirImage(e){
		console.log('subirImagen Nuevo e',e)
		try{
			// const quehay =  e
			// prueba=queha
		console.log('subirImagen',e)
		// console.log('quehayy',quehay)
	}catch(e){
		console.log('error en subirImage',e)
	}
	

	}

	let dateString = moment.utc(dateOfBirth).format('YYYY/MM/DD');
	let newDate = new Date(new Date(dateString).getTime() - new Date().getTimezoneOffset() * 60000)
		.toISOString()
		.split('T')[0];


	let roles_assigned = {
		rol1: false,
		rol2: false,
		rol3: false
	};
	export let message = '';
	export let status = '';
	export let error = '';
	// Arreglo de nivel de estudios:
	let studyLevelList = [
		'Primario incompleto',
		'Primario completo',
		'Secundario incompleto',
		'Secundario completo',
		'Superior no universitario incompleto',
		'Superior no universitario completo',
		'Universitario incompleto',
		'Universitario completo',
		'Post universitario incompleto',
		'Post universitario completo'
	];

	// Arreglo de géneros:
	let genderList = [
		{ genderLetter: 'M', genderName: 'Masculino' },
		{ genderLetter: 'F', genderName: 'Femenino' },
		{ genderLetter: 'X', genderName: 'No binario' }
	];

	//Funcion para limpiar el formulario (se ejecuta cuando se registra exitosamente un usuario)
	function cleanPage(){
		$form.firstName = '';
		$form.lastName = '';
		$form.cuit = '';
		$form.email = '';
		$form.phone = '';
		$form.newDate = ''
		$form.degree = '';
		$form.gender = '';
		$form.nationality = '';
		$form.studyLevel = '';
		roles_assigned = {
			rol1: false,
			rol2: false,
			rol3: false
		};
		profilePic = ''
		$form.profilePic= ''
	};

	//Funcion para asignar roles
	function assign_rol(id){
		if (id.rol_id === 1 || id.rol_id === '1') {
			roles_assigned['rol1'] = !roles_assigned['rol1'];
		}
		if (id.rol_id === 2 || id.rol_id === '2') {
			roles_assigned['rol2'] = !roles_assigned['rol2'];
		}
		if (id.rol_id === 3 || id.rol_id === '3') {
			roles_assigned['rol3'] = !roles_assigned['rol3'];
		}
	};
	

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';

	yup.setLocale(es);
	/* regexName: Cualquier nombre con tildes y caracteres latinos (no japonés, hebreo, árabe, etc.).
	Permite espacios, comas puntos y guiones para nombres complejos. Excepto números y otros símbolos
	Fuente: https://andrewwoods.net/blog/2018/name-validation-regex/
	*/
	let regexName =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'\s-]+$/u;
	/* regexPhone: Números de teléfono con símbolos + ( ) y espacios. 
    Acepta número de país, 0 y 15 delante del código de área y teléfono respectivamente. 
    Probado con:
    +(549) 299 6667777
    +(549)(0299)6667777
    +5492996667777
    299-666-7777
    0299156667777
    2996667777
    156667777
    Fuente- Variante propia de: https://ihateregex.io/expr/phone/
    */
	let regexPhone = /^[\+]?[(\s]?[0-9]{3,4}[)\s]?[-\s\.(]?[0-9]{3,4}[-\s\.)]?[0-9]{3,7}/;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			cuit: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			gender: "0",
			newDate: "",
			nationality: "",
			studyLevel: "",
			degree: "",
			profilePic: "",
			roles_assigned: roles_assigned,
		},
		validationSchema: yup.object().shape({
			cuit: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(12, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			firstName: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			lastName: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			email: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.email('El formato de email es incorrecto')
				.required('Debes completar este campo.'),
			phone: yup
				.string()
				.matches(regexPhone, 'El formato de teléfono es incorrecto.')
				.required('Debes completar este campo.'),
			gender: yup
				.string()
				.oneOf(['M', 'F', 'X'], 'El género debe ser únicamente M, F ó X'),
			newDate: yup.date().required('Debes completar este campo.'),
			dateOfBirth: yup.date().required('Debes completar este campo.'),
			nationality: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			studyLevel: yup
				.string()
				.oneOf(studyLevelList, 'El nivel de estudios ingresado no es ninguno de la lista.'),
			degree: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			 roles_assigned: yup.object(),
		}),
		onSubmit: async(values) => {
			// // Realiza la carga de datos al cliquear Enviar
			
			values.roles_assigned = roles_assigned
			values.profilePic = profilePic
			console.log('SUBMIT VALUES',values)
			// console.log(values)
			try {
				const submit = await fetch('usuarios', {
					method: 'POST',
					body: JSON.stringify({
						values
					})
				});
				const data = await submit.json();
				message = data.message
				status = data.status
				//subir(fileName, fileExtension);
				if (data.status === 'NEW') {
					cleanPage()
				}
			} catch (err) {
				error = err;
			}
		}
	});
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
		<h1><i class="fas fa-users me-4" />Nuevo usuario</h1>
		<p class="lead">Ingrese los detalles a continuación</p>
	</div>
</header>

{#if status==='NEW'}
	<Alert color="secondary">
		<h4 class="alert-heading">El usuario fue registrado con éxito</h4>
		<a href="/panel/usuarios" class="alert-link">Volver al listado</a>
	</Alert>
{:else if status==='ERROR'}
	<Alert color="warning">
		<h4 class="alert-heading">El correo ingresado ya existe en el sistema</h4>
		<p>Ingresa una dirección de correo diferente, o <a href="/panel/usuarios?email={$form.email}" class="alert-link">gestiona el usuario existente</a></p>
	</Alert>
{:else if status==''}
	<!-- Carga inicialmente la página sin datos -->
{:else}
	<Alert color="danger">
		<h4 class="alert-heading">No se pudo registrar el usuario</h4>
		<p>Revisa los datos cargados e inténtalo nuevamente.</p>
	</Alert>
{/if}
<!-- Formulario nuevo usuario -->
<form name="formUserDetails" id="formUserDetails" on:submit|preventDefault={handleSubmit} >
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="firstName" class="form-label">Nombre</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				class="form-control"
				placeholder="Juan"
				aria-label="Nombre"
				bind:value={$form.firstName}
				on:blur={handleChange}
				class:invalid={$errors.firstName}
			/>
			{#if $errors.firstName}
				<small class="form-error">{$errors.firstName}</small>
			{/if}
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
				bind:value={$form.lastName}
				on:blur={handleChange}
				class:invalid={$errors.lastName}
			/>
			{#if $errors.lastName}
				<small class="form-error">{$errors.lastName}</small>
			{/if}
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
				bind:value={$form.cuit}
				on:blur={handleChange}
				class:invalid={$errors.cuit}
			/>
			{#if $errors.cuit}
				<small class="form-error">{$errors.cuit}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="gender" class="form-label">Género</label>
			<select
				id="gender"
				class="form-select"
				aria-label="Género"
				required
				bind:value={$form.gender}
				on:blur={handleChange}
				class:invalid={$errors.gender}
			>
				<option value="0" selected disabled>Elija una opción...</option>
				{#each genderList as thisGender}
					<option value={thisGender.genderLetter}>
						{thisGender.genderName}
					</option>
				{/each}
			</select>
			{#if $errors.gender}
				<small class="form-error">{$errors.gender}</small>
			{/if}
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
				bind:value={$form.email}
				on:blur={handleChange}
				class:invalid={$errors.email}
			/>
			{#if $errors.email}
				<small class="form-error">{$errors.email}</small>
			{/if}
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
				bind:value={$form.phone}
				on:blur={handleChange}
				class:invalid={$errors.phone}
			/>
			{#if $errors.phone}
				<small class="form-error">{$errors.phone}</small>
			{/if}
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
				bind:value={$form.newDate}
				on:blur={handleChange}
				class:invalid={$errors.newDate}
			/>
			{#if $errors.newDate}
				<small class="form-error">{$errors.newDate}</small>
			{/if}
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
				bind:value={$form.nationality}
				on:blur={handleChange}
				class:invalid={$errors.nationality}
			/>
			{#if $errors.nationality}
				<small class="form-error">{$errors.nationality}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación alcanzado</label>
			<select
				id="studyLevel"
				class="form-select"
				aria-label="Nivel de formación alcanzado"
				bind:value={$form.studyLevel}
				on:blur={handleChange}
				class:invalid={$errors.studyLevel}
			>
				<option selected disabled>Elija una opción...</option>
				{#each studyLevelList as thisStudyLevel}
					<option value={thisStudyLevel}>{thisStudyLevel}</option>
				{/each}
			</select>
			{#if $errors.studyLevel}
				<small class="form-error">{$errors.studyLevel}</small>
			{/if}
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
				bind:value={$form.degree}
				on:blur={handleChange}
				class:invalid={$errors.degree}
			/>
			{#if $errors.degree}
				<small class="form-error">{$errors.degree}</small>
			{/if}
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
						on:click={assign_rol({ rol_id })}
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		<div class="col-md-6">
			<label for="profilePic" class="form-label">Foto de perfil</label>
			<ImgUpload on:loadImage={captureImage}/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary" disabled={!$isValid}>
				{#if $isSubmitting}
					<i class="fas fa-spinner fa-pulse me-2" />Enviando...
				{:else}
					<i class="fas fa-plus me-2" />Crear
				{/if}
			</button>
		</div>
	</div>
</form>
