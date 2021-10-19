<script lang="ts">
	// Datos del usuario a mostrar
	export let user_id = 0;
	export let cuit = 0;
	export let firstName = '';
	export let lastName = '';
	export let email = '';
	export let phone = '';
	export let gender = '';
	export let dateOfBirth = new Date();
	export let nationality = '';
	export let studyLevel = '';
	export let degree = '';
	export let roles = [];

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
		'Secundario incompleto',
		'Superior no universitario',
		'Superior no universitario',
		'Universitario',
		'Universitario',
		'Post universitario',
		'Post universitario'
	];

	// Arreglo de géneros:
	let genderText = '';
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
</script>

<form name="formUserDetails" id="formUserDetails" {action}>
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
				value={cuit}
				readonly={isReadOnly}
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
				value={firstName}
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
				value={lastName}
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
				value={email}
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
				value={phone}
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
					value={genderText}
					readonly
				/>
			{:else}
				<select id="gender" class="form-select" aria-label="Género" required>
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
				type={isReadOnly ? "text" : "date"}
				id="dateOfBirth"
				name="dateOfBirth"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Fecha de nacimiento"
				value={dateOfBirth.toLocaleDateString()}
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
				value={nationality}
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
				value={studyLevel}
				readonly
			/>
			{:else}
			<select id="studyLevel" class="form-select" aria-label="Nivel de formación">
				<option disabled>Elija una opción...</option>
				{#each studyLevelList as thisStudyLevel}
					<option value={thisStudyLevel} selected={thisStudyLevel == studyLevel}
						>{thisStudyLevel}</option
					>
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
				value={degree}
				readonly={isReadOnly}
				required={!isReadOnly}
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="roles" class="form-label">Roles asignados</label>
			{#each rolesList as { rol_id, rolDescription }}
				<div class="form-check form-switch"> <!-- Revisar cómo comprobar cuáles roles tiene -->
					<input
						type="checkbox"
						id="rol{rol_id}"
						name="roles"
						class="form-check-input"
						role="switch"
						checked={roles[rol_id] == rol_id} 
					/>
					<label class="form-check-label" for="rol{rol_id}">{rolDescription}</label>
				</div>
			{/each}
		</div>
		{#if !isReadOnly}
		<div class="col-md-6 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary">
				<i class="fas fa-pen me-2"/>Confirmar cambios
			</button>
		</div>
		{/if}
	</div>
</form>
