<script lang="ts">
	// Datos de usuario - Ver si esto lo maneja un hook
	let actualUser = 'Juan Perez';
</script>

<header class="text-center mb-3">
	<h1><i class="fas fa-home fs-2 me-2" />Inicio</h1>
	<p class="lead">
		Bienvenido a SeguCheck, {actualUser}.
	</p>
</header>

<main class="row g-4">
	<div class="col-md-6 col-xl-4">
		<a href="app/perfil" class="hstack btn btn-secondary justify-content-between">
			<i class="fas fa-user fs-2 m-2" />
			<h4 class="card-title">Datos personales</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
	<div class="col-md-6 col-xl-4">
		<a href="app/habilitaciones" class="hstack btn btn-secondary justify-content-between">
			<i class="fas fa-paperclip fs-2 m-2" />
			<h4 class="card-title">Habilitaciones</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
	<div class="col-md-6 col-xl-4">
		<a href="app/tareas" class="hstack btn btn-secondary justify-content-between disabled">
			<i class="fas fa-briefcase fs-2 m-2" />
			<h4 class="card-title">Tareas</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
	<div class="col-md-6 col-xl-4">
		<a href="app/checklists" class="hstack btn btn-secondary justify-content-between disabled">
			<i class="fas fa-clipboard-check fs-2 m-2" />
			<h4 class="card-title">Checklists</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
	<div class="col-md-6 col-xl-4">
		<a href="app/vehiculos" class="hstack btn btn-secondary justify-content-between">
			<i class="fas fa-car fs-2 m-2" />
			<h4 class="card-title">Vehículos</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
	<div class="col-md-6 col-xl-4">
		<a href="app/qr" class="hstack btn btn-primary justify-content-between">
			<i class="fas fa-qrcode fs-2 m-2" />
			<h4 class="card-title">Mostrar código QR</h4>
			<i class="fas fa-chevron-right fs-2 m-2" />
		</a>
	</div>
</main>

