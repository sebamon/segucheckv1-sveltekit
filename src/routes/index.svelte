<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Button
	} from 'sveltestrap';

	// Menú hamburguesa navbar
	let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Inicio - Bootstrap</title>
</svelte:head>

<!-- Menú de navegación -->
<Navbar color="light" light expand="md">
	<NavbarBrand href="/">SeguCheck</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="#sistema">Nuestro sistema</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#tutoriales">Tutoriales</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#contacto">Contacto</NavLink>
			</NavItem>
			<NavItem>
				<Button color="primary">Iniciar sesión</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<!-- Hero a pantalla completa -->
<header class="container py-4">
	<h1>Tus documentos de forma más eficiente</h1>
	<h3 class="fs-5 col-md-8">
		Lleva el control de tus credenciales, permisos y checklists en tu bolsillo
	</h3>
	<div class="mb-5">
		<a href="#login" class="btn btn-primary btn-lg px-4">Iniciar sesión</a>
		<a href="/descargar" class="btn btn-secondary btn-lg px-4">Descargar app</a>
	</div>
	<hr class="col-3 col-md-2 mb-5" />
</header>

<!-- Más info al scrollear -->
<main class="container py-4">
	<div class="row g-5">
		<div class="col-md-6">
			<h2>Plataforma web</h2>
			<p>
				Donde puedes cargar la documentación de tus colaboradores en sitio, y ser validada por tus clientes
			</p>
			<a href="/info/movil">
				Conocé más
			</a>
		</div>
		<div class="col-md-6">
			<h2>Plataforma móvil</h2>
			<p>
				Donde tus colaboradores pueden visualizar su documentos, tareas y checklists
			</p>
			<a href="/info/movil">
				Conocé más
			</a>
		</div>
	</div>
</main>

<footer class="container pt-5 my-5 text-muted border-top">
	<p>
		<strong>SeguCheck</strong> © 2021 - Desarrollado por
		<a href="https://github.com/sebamon/segucheckv1-sveltekit">SanguCheck Dozen</a>
	</p>
</footer>
