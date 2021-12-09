<script context="module">
	export async function load({fetch, page}){
		try{
			const response = await fetch(`http://localhost:3000/api/roles`)
			const data = await response.json()
			console.log('nuevo load data',data)
			return {
				props: {
					data : data
				}
			}
		}catch(e){
			console.log(e)
			let rolesList =[
							{ rol_id: 1, rolDescription: 'Gestor documental' },
							{ rol_id: 2, rolDescription: 'Personal de seguridad' },
							{ rol_id: 3, rolDescription: 'Operario' },
							]
			return {
				data : rolesList
			}
		};
	}
</script>

<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Image, Modal } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment';
	// export const userDetails: object = {};
	// Datos del usuario a mostrar
	export let user_id: number;
	export let cuit: number;
	export let firstName: string;
	export let lastName: string;
	export let email: string;
	export let phone: string;
	export let gender: string;
	export let dateOfBirth;
	export let nationality: string;
	export let studyLevel: string;
	export let degree: string;
	export let profilePic: string;
	export let usersonroles = []
	
	
	export let dateString = moment.utc(dateOfBirth).format('YYYY/MM/DD');
	let convertedDateOfBirth = new Date(
		new Date(dateString).getTime() - new Date().getTimezoneOffset()
	)
		.toISOString()
		.split('T')[0];
	// export let usersonroles = []
	
	
	export let data
	// console.log('srr data', JSON.parse(data.roles))
	// export let usersonroles = []
	let message: string;
	let error: string;
	let status = 'OK';
	// export let rolesList = data 
	// console.log('useronroles',usersonroles)
	// console.log('data roles', rolesList)

	// Arreglo de roles - Esto lo lee de la DB:
	let rolesList = [
		{ rol_id: 1, rolDescription: 'Gestor documental' },
		{ rol_id: 2, rolDescription: 'Personal de seguridad' },
		{ rol_id: 3, rolDescription: 'Operario' },
	];

	let roles_assigned = {
		rol1: false,
		rol2: false,
		rol3: false
	};

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

	onMount(() => {
		console.log('holaMount',usersonroles)
		usersonroles.forEach(rol => {
			if(rol.rol_id==1){
				roles_assigned['rol1'] = true
			}
			if(rol.rol_id==2){
				roles_assigned['rol2'] = true
			}
			if(rol.rol_id==3){
				roles_assigned['rol3'] = true
			}
		})
	})

	// // console.log('rolesList',{rolesList})
	// let rolesList=
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
	let genderText: string;
	if (gender == 'M') {
		genderText = 'Varón';
	} else if (gender == 'F') {
		genderText = 'Mujer';
	} else {
		genderText = gender;
	}
	let genderList = [
		{ genderLetter: 'M', genderName: 'Masculino' },
		{ genderLetter: 'F', genderName: 'Femenino' },
		{ genderLetter: 'X', genderName: 'No binario' }
	];
	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = false;

	
	let imgPath = isReadOnly ? '../../../static/img/profile-pics/' : '../../../static/img/profile-pics/'
	let imagePic=imgPath+profilePic
	// Abrir modal para ver foto:
	let modalProfile = false;
	const toggle = () => (modalProfile = !modalProfile);

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	import { page } from '$app/stores';
	import { pathToFileURL } from 'url';
	yup.setLocale(es);
	/* regexName: Cualquier nombre con tildes y caracteres latinos (no japonés, hebreo, árabe, etc.).
	Permite espacios, comas puntos y guiones para nombres complejos. Excepto números y otros símbolos
	Fuente: https://andrewwoods.net/blog/2018/name-validation-regex/
	*/
	let regexName =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'\s-]+$/u;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			user_id: user_id,
			cuit: cuit,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			gender: gender,
			nationality: nationality,
			studyLevel: studyLevel,
			degree: degree,
			profilePic: profilePic,
			convertedDateOfBirth: convertedDateOfBirth,
			roles : roles_assigned,
		},
		validationSchema: yup.object().shape({			cuit: yup
				.string()
				.required('Debes completar este campo.')
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(11, 'Este campo debe ser de hasta ${max} caracteres.'),
			firstName: yup
				.string()
				.required('Debes completar este campo.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			lastName: yup
				.string()
				.required('Debes completar este campo.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			email: yup
				.string()
				.required('Debes completar este campo.')
				.email('El formato de email es incorrecto')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			phone: yup
				.string()
				.required('Debes completar este campo.')
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(20, 'Este campo debe ser de hasta ${max} caracteres.'),
			gender: yup
				.string()
				.required('Debes completar este campo.')
				.oneOf(['M', 'F', 'X'], 'El género debe ser únicamente M, F ó X'),
			nationality: yup
				.string()
				.required('Debes completar este campo.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			studyLevel: yup
				.string()
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.oneOf(studyLevelList, 'El nivel de estudios ingresado no es ninguno de la lista.'),
			degree: yup
				.string()
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			roles: yup
				.mixed()
		}),
		onSubmit: async (values) => {
			const submit = await fetch(`editar`, {
				method: 'PUT',
				body: JSON.stringify({
					values
				})
			});
			const data = await submit.json();
			message = data.message;
			error = data.error;
			status = data.status;
			// status==='NEW' ? cleanPage() : null
		}
	});
	function cleanPage() {
		user_id = null;
		cuit = null;
		firstName = '';
		lastName = '';
		email = '';
		phone = '';
		gender = '';
		dateOfBirth = '';
		nationality = '';
		studyLevel = '';
		degree = '';
		profilePic = '';
	}
</script>
{#if status !== 'OK'}
	<SeguAlert {status} {message} path="usuarios" />
{/if}

<form name="formUserDetails" id="formUserDetails" on:submit|preventDefault={handleSubmit}>
	<div class="hstack gap-3">
		<h2 class="my-4"><i class="fas fa-info me-4" />Datos básicos</h2>
		{#if isReadOnly}
			<div class="ms-auto">
				<a class="btn btn-primary" href="/panel/usuarios/{user_id}/editar">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		{/if}
	</div>
	<div class="row mb-3 g-3 align-items-end">
		<div class="col-md-6">
			<img
				src={imgPath+profilePic}
				class="img-fluid img-thumbnail m-2"
				alt="Foto de perfil"
				style="max-width:150px"
				on:click={toggle}
			/>
			<Modal isOpen={modalProfile} {toggle} body header={firstName + ' ' + lastName}>
				<img src={imgPath+profilePic} class="img-fluid" alt="Foto de perfil" on:click={toggle} />
			</Modal>
		</div>
		{#if !isReadOnly}
			<div class="col-md-6">
				<label for="profilePic" class="form-label">Foto de perfil</label>
				<input class="form-control" type="file" accept="image/*" id="profilePic" />
			</div>
		{/if}
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="user_id" class="form-label">Número ID</label>
			<input
				type="text"
				id="user_id"
				name="user_id"
				class="form-control"
				placeholder="1234"
				aria-label="Número ID"
				value={$form.user_id}
				readonly
			/>
		</div>
		<div class="col-md-6">
			<label for="cuit" class="form-label">Número CUIT</label>
			<input
				type="number"
				id="cuit"
				name="cuit"
				class="form-control"
				placeholder="20301001008"
				aria-label="Número CUIT"
				bind:value={$form.cuit}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.cuit}
			/>
			{#if $errors.cuit}
				<small class="form-error">{$errors.cuit}</small>
			{/if}
		</div>
	</div>
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
				readonly={isReadOnly}
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
				readonly={isReadOnly}
				class:invalid={$errors.lastName}
			/>
			{#if $errors.lastName}
				<small class="form-error">{$errors.lastName}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="email" class="form-label">Correo electrónico</label>
			<input
				type="text"
				id="email"
				name="email"
				class="form-control"
				placeholder="juan.perez@ejemplo.com"
				aria-label="Correo electrónico"
				bind:value={$form.email}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.email}
			/>
			{#if $errors.email}
				<small class="form-error">{$errors.email}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="phone" class="form-label">Teléfono</label>
			<input
				type="text"
				id="phone"
				name="phone"
				class="form-control"
				placeholder="2993334444"
				aria-label="Teléfono"
				bind:value={$form.phone}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.phone}
			/>
			{#if $errors.phone}
				<small class="form-error">{$errors.phone}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-4">
			<label for="gender" class="form-label">Género</label>
			{#if isReadOnly}
				<input
					type="text"
					id="gender"
					name="gender"
					class="form-control user-select-all"
					placeholder="M"
					aria-label="Género"
					bind:value={genderText}
					readonly
				/>
			{:else}
				<select
					id="gender"
					class="form-select"
					aria-label="Género"
					required
					bind:value={$form.gender}
					on:blur={handleChange}
					class:invalid={$errors.gender}
				>
					<option disabled>Elija una opción...</option>
					{#each genderList as thisGender}
						<option value={thisGender.genderLetter} selected={thisGender.genderLetter == gender}
							>{thisGender.genderName}</option
						>
					{/each}
				</select>
				{#if $errors.gender}
					<small class="form-error">{$errors.gender}</small>
				{/if}
			{/if}
		</div>
		<div class="col-md-4">
			<label for="dateOfBirth" class="form-label">Fecha de nacimiento</label>
			<!-- En BD llegan invertidos el mes y día, revisar -->
			<input
				type="date"
				id="dateOfBirth"
				name="dateOfBirth"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Fecha de nacimiento"
				bind:value={$form.convertedDateOfBirth}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.convertedDateOfBirth}
			/>
			{#if $errors.convertedDateOfBirth}
				<small class="form-error">{$errors.convertedDateOfBirth}</small>
			{/if}
		</div>
		<div class="col-md-4">
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
				readonly={isReadOnly}
				class:invalid={$errors.nationality}
			/>
			{#if $errors.nationality}
				<small class="form-error">{$errors.nationality}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación</label>
			{#if isReadOnly}
				<input
					type="text"
					id="studyLevel"
					name="studyLevel"
					class="form-control"
					placeholder="Universitario completo"
					aria-label="Nivel de formación"
					bind:value={studyLevel}
					readonly
				/>
			{:else}
				<select
					id="studyLevel"
					class="form-select"
					aria-label="Nivel de formación"
					bind:value={$form.studyLevel}
					on:blur={handleChange}
					class:invalid={$errors.studyLevel}
				>
					<option disabled>Elija una opción...</option>
					{#each studyLevelList as thisStudyLevel}
						<option value={thisStudyLevel} selected={thisStudyLevel == studyLevel}>
							{thisStudyLevel}
						</option>
					{/each}
				</select>
				{#if $errors.studyLevel}
					<small class="form-error">{$errors.studyLevel}</small>
				{/if}
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
				readonly={isReadOnly}
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
					<!-- Revisar cómo comprobar cuáles roles tiene -->
					<input
						type="checkbox"
						id="rol{rol_id}"
						name="roles"
						
						class="form-check-input"
						role="switch"
						bind:value={rol_id}	
						checked={roles_assigned['rol'+rol_id]}
						readonly={isReadOnly}
						on:click={assign_rol({ rol_id })}
						
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		{#if !isReadOnly}
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" disabled={!$isValid}>
					{#if $isSubmitting}
						<i class="fas fa-spinner fa-pulse me-2" />Enviando...
					{:else}
						<i class="fas fa-pen me-2" />Confirmar cambios
					{/if}
				</button>
			</div>
		{/if}
	</div>
</form>
