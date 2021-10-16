<script lang="ts">
	import ModalLogin from '$lib/ModalLogin.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Form,
		FormGroup,
		Input,
		Label,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		Image
	} from 'sveltestrap';

	// Menú hamburguesa navbar
	let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
	// Abrir modal login
	let modalOpen = false;
	const toggle = () => (modalOpen = !modalOpen);
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Inicio - SeguCheck</title>
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
				<Button color="primary" on:click={toggle}>Iniciar sesión</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<!-- Modal login -->
<ModalLogin {modalOpen} {toggle}/>

<!-- Hero a pantalla completa -->
<header class="py-4">
	<div class="container mt-4">
		<div class="row col-6">
			<h1 class="fw-bold">Tus documentos de forma más eficiente</h1>
			<h3 class="lead col-md-8">
				Lleva el control de tus credenciales, permisos y checklists en tu bolsillo
			</h3>
			<div class="mb-5 g-3">
				<Button color="primary" on:click={toggle} class="btn-lg px-4">Iniciar sesión</Button>
				<Button href="/descargar" class="btn btn-secondary btn-lg px-4">Descargar app</Button>
			</div>
		</div>
		<hr class="m-5" />
	</div>
	<div class="d-flex justify-content-center align-self-end text-center">
		<a href="#sistema" class="text-decoration-none">
			<h5 class="fw-bold">Conocé más</h5>
			<i class="fas fa-chevron-down mx-2 fs-1" />
		</a>
	</div>
</header>

<!-- Más info al scrollear -->
<main class="container py-4">
	<div class="py-5">
		<h1 id="sistema">Este es nuestro sistema</h1>
		<h3 class="lead">Las herramientas que facilitarán tu jornada</h3>
	</div>
	<div class="row g-2">
		<Card class="col-md-6">
			<CardBody>
				<CardTitle class="fw-bold">Plataforma web</CardTitle>
				<Image fluid thumbnail src="/thumb-dashboard.jpg" alt="Panel Administrativo" class="my-4"/>
				<CardSubtitle>
					Donde puedes cargar la documentación de tus colaboradores en sitio, y ser validada por
					tus clientes
				</CardSubtitle>
				<a href="/info/plataforma"> Conocé más <i class="fas fa-arrow-right me-2" /></a>
			</CardBody>
		</Card>
		<Card class="col-md-6">
			<CardBody>
				<CardTitle class="fw-bold">Plataforma móvil</CardTitle>
				<Image fluid thumbnail src="/thumb-screen-app.jpg" alt="Aplicación móvil" class="my-4" />
				<CardSubtitle
					>Donde tus colaboradores pueden visualizar su documentos, tareas y checklists</CardSubtitle
				>
				<a href="/info/movil"> Conocé más <i class="fas fa-arrow-right me-2" /></a>
			</CardBody>
		</Card>
	</div>
	<hr class="m-5" />
</main>

<style>
	header { /* Estilo de portada */
		height: 90vh;
		background: #ededed url('/bg-hero.jpg');
  		background-attachment: fixed; /* Efecto parallax */
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
