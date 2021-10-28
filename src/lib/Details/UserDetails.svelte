<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Image } from 'sveltestrap';

	// export let useronroles
	export let userDetails
	// Datos del usuario a mostrar
	export let user_id:number 
	export let cuit:number 
	export let firstName:string
	export let lastName:string
	export let email:string
	export let phone:string
	export let gender:string
	export let dateOfBirth:Date
	export let nationality:string
	export let studyLevel:string
	export let degree:string
	export let profilePic:string

	export let message
	export let error
	export let color
	// export let user_id = userDetails.user_id
	// export let cuit = userDetails.cuit
	// export let firstName = userDetails.firstName
	// export let lastName = userDetails.lastName
	// export let email = userDetails.email
	// export let phone = userDetails.phone
	// export let gender = userDetails.gender
	// export let dateOfBirth:string=userDetails.dateOfBirth
	// export let nationality = userDetails.nationality
	// export let studyLevel = userDetails.studyLevel
	// export let degree = userDetails.degree
	// export let profilePic = userDetails.profilePic
	//  export let dateOfBirth2:Date=new Date(userDetails.dateOfBirth,)
	// export let roles = userDetails.useronroles
	
	// Arreglo de roles - Esto lo lee de la DB:
	let rolesList = [
		{ rol_id: 0, rolDescription: 'Gestor documental' },
		{ rol_id: 2, rolDescription: 'Personal de seguridad' },
		{ rol_id: 3, rolDescription: 'Operario' }
	];

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
	let genderText:string;
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
	export let isReadOnly = true;
	let action = '';
	if (isReadOnly) {
		action = 'action="./create"';
	}

	/* Convierte un objeto Date en un String en formato YYY-MM-DD
	 * @param Date
	 * @return String
	 */
	function dateToYMD(date):string {
		return date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
	}	
	const submitForm  = async():Promise<void> => {

		const submit = await fetch (`editar.json`, {
			method : "PUT",
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
				// roles_assigned,
			})
		})
		const data = await submit.json()
		message = data.message
		error= data.error
		if(data.status==='OK') {
				color='success'
			}
			if(data.status==='ERROR') color='danger'

			if(data.status===200)
			{
				console.log('message', message)
			}
	}


</script>


<form name="formUserDetails" id="formUserDetails" on:submit|preventDefault={submitForm}>
	<div class="row mb-3 g-3 align-items-end">
		<div class="col-md-6">
			<Image
				fluid
				thumbnail
				src={profilePic}
				alt="Foto de perfil"
				class="m-2"
				style="max-width:150px"
			/>
		</div>
		{#if !isReadOnly}
			<div class="col-md-6">
				<label for="profilePic" class="form-label">Foto de perfil</label>
				<input class="form-control" type="file" id="profilePic" />
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
				value={user_id}
				readonly
			/>
		</div>
		<div class="col-md-6">
			<label for="cuit" class="form-label">Número CUIT</label>
			<input
				type="text"
				id="cuit"
				name="cuit"
				class="form-control"
				placeholder="20301001008"
				aria-label="Número CUIT"
				readonly={isReadOnly}
				bind:value={cuit}
			/>
		</div>
	</div>
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
				bind:value={firstName}
				readonly={isReadOnly}
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
				bind:value={lastName}
				readonly={isReadOnly}
			/>
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
				bind:value={email}
				readonly={isReadOnly}
			/>
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
				bind:value={phone}
				readonly={isReadOnly}
			/>
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
				<select id="gender" class="form-select" aria-label="Género" required bind:value={gender}>
					<option disabled>Elija una opción...</option>
					{#each genderList as thisGender}
						<option value={thisGender.genderLetter} selected={thisGender.genderLetter == gender}
							>{thisGender.genderName}</option
						>
					{/each}
				</select>
			{/if}
		</div>
		<div class="col-md-4">
			<label for="dateOfBirth" class="form-label">Fecha de nacimiento</label>
			<input
				type="date"
				id="dateOfBirth"
				name="dateOfBirth"
				class="form-control"
				placeholder="*1980-12-31"
				aria-label="Fecha de nacimiento"
				bind:value={dateOfBirth}
				readonly={isReadOnly}
				required={!isReadOnly}
			/>
		</div>
		<div class="col-md-4">
			<label for="lastName" class="form-label">Nacionalidad</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				class="form-control"
				placeholder="Argentina"
				aria-label="Nacionalidad"
				bind:value={nationality}
				readonly={isReadOnly}
			/>
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
				<select id="studyLevel" class="form-select" aria-label="Nivel de formación" bind:value={studyLevel}>
					<option disabled>Elija una opción...</option>
					{#each studyLevelList as thisStudyLevel}
						<option value={thisStudyLevel} selected={thisStudyLevel == studyLevel}>
							{thisStudyLevel}
						</option>
					{/each}
				</select>
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
				bind:value={degree}
				readonly={isReadOnly}
				required={!isReadOnly}
			/>
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
						
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		{#if !isReadOnly}
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary">
					<i class="fas fa-pen me-2" />Confirmar cambios
				</button>
			</div>
		{/if}
	</div>
</form>
