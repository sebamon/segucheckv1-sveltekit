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

	let open = false;
	const toggle = () => (open = !open);
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
<Modal isOpen={open} {toggle}>
	<ModalHeader {toggle}>Ingresar a SeguCheck</ModalHeader>
	<ModalBody>
		<Form action="/checklogin" method="post">
			<FormGroup>
				<Label for="user" class="small mb-1">DNI</Label>
				<Input class="py-3" type="text" name="user" id="user" placeholder="Ingresa tu DNI" />
			</FormGroup>
			<FormGroup>
				<Label for="pass" class="small mb-1">Contraseña</Label>
				<Input
					class="py-3"
					type="password"
					name="pass"
					id="pass"
					placeholder="Ingresa tu contraseña"
				/>
			</FormGroup>
			<FormGroup>
				<Input type="checkbox" id="rec" label="Recordar contraseña" />
			</FormGroup>
			<FormGroup >
				<Button color="primary" href="/login">Ingresar</Button>
				<a class="small" href="/recuperar"> ¿Olvidó su contraseña? </a>
			</FormGroup>
		</Form>
	</ModalBody>
	<ModalFooter>
		<p class="text-md-center small">
			Los usuarios deben estar previamente registrados por su empleador.
		</p>
	</ModalFooter>
</Modal>

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
		<a href="#sistema">
			<h6>Conocé más</h6>
			<i class="fas fa-chevron-down mx-2 fs-1" />
		</a>
	</div>
</header>

<!-- Más info al scrollear -->
<main class="container py-4">
	<h1 id="sistema">Este es nuestro sistema</h1>
	<h3 class="lead">Las herramientas que facilitarán tu jornada</h3>
	<div class="row g-5">
		<Card class="col-md-6">
			<CardBody>
				<CardTitle class="fw-bold">Plataforma web</CardTitle>
				<Image style="height:200px;" />
				<CardSubtitle
					>Donde puedes cargar la documentación de tus colaboradores en sitio, y ser validada por
					tus clientes</CardSubtitle
				>
				<a href="/info/plataforma"> Conocé más <i class="fas fa-arrow-right mx-2" /></a>
			</CardBody>
		</Card>
		<Card class="col-md-6">
			<CardBody>
				<CardTitle class="fw-bold">Plataforma móvil</CardTitle>
				<Image style="height:200px;" />
				<CardSubtitle
					>Donde tus colaboradores pueden visualizar su documentos, tareas y checklists</CardSubtitle
				>
				<a href="/info/movil"> Conocé más <i class="fas fa-arrow-right mx-2" /></a>
			</CardBody>
		</Card>
	</div>
	<hr class="m-5" />
</main>

<style>
	header { /* Estilo de portada */
		height: 90vh;
		background: #ededed url('/hero-bg.jpg');
  		background-attachment: fixed; /* Efecto parallax */
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
