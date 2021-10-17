<script lang="ts">
	// Datos del usuario a mostrar
	export let user_id = 0;
	export let cuit = 0;
	export let firstName = '';
	export let lastName = '';
	export let email = '';
	export let phone = '';
	export let gender = '';
	export let dateOfBirth = '';
	export let nationality = '';
	export let studyLevel = '';
	export let degree = '';
	export let roles = [];

	// Pasar inicial de género a texto legible:
	let genderText;
	if (gender == 'M') {
		genderText = 'Varón';
	} else if (gender == 'F') {
		genderText = 'Mujer';
	} else {
		genderText = gender;
	}
</script>

<form name="formUserDetails" id="formUserDetails">
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
				readonly
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
				readonly
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
				readonly
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
				readonly
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
				readonly
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-4">
			<label for="gender" class="form-label">Género</label>
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
		</div>
		<div class="col-md-4">
			<label for="name" class="form-label">Fecha de nacimiento</label>
			<input
				type="text"
				id="name"
				name="name"
				class="form-control"
				placeholder="1980-12-31"
				aria-label="Fecha de nacimiento"
				value={dateOfBirth}
				readonly
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
				readonly
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="studyLevel" class="form-label">Nivel de formación</label>
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
				readonly
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="roles" class="form-label">Roles asignados</label>
			<select
				id="roles"
				name="roles"
				class="form-control overflow-visible"
				aria-label="Roles"
				value={degree}
				multiple
			>
				{#if roles.length === 0}
					<option selected>Ninguno</option>
				{:else}
					{#each roles as { rol_id, rolDescription }}
						<option value={rol_id}>{rolDescription}</option>
					{/each}
				{/if}
			</select>
		</div>
	</div>
</form>
