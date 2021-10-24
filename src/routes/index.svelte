<script lang="ts">
	import NavbarHome from '$lib/NavbarHome.svelte';
	import ModalLogin from '$lib/ModalLogin.svelte';
	import { page, session } from '$app/stores';
	// console.log("session",session)

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Card, CardBody, CardSubtitle, CardTitle, Image } from 'sveltestrap';

	// Abrir modal login
	let modalOpen = false;

	// Carrusel diapositivas:
	import { onMount } from 'svelte';
	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const items = ['/img/screen-app1.png', '/img/screen-app2.png'];
	let activeIndex = 0;
</script>

<svelte:head>
	<title>Inicio - SeguCheck</title>
</svelte:head>

<!-- Menú de navegación -->
<NavbarHome />

<!-- Modal login -->
<ModalLogin {modalOpen} />

<!-- Hero a pantalla completa -->
<header class="py-4">
	<div class="container row mt-4 align-items-center justify-content-around">
		<div class="col-12 col-md-8 col-lg-9">
			<h1 class="fw-bold">Tus documentos de forma más eficiente</h1>
			<h3 class="lead col-md-8">
				Lleva el control de tus credenciales, permisos y checklists en tu bolsillo
			</h3>
			<div class="mb-5 g-3">
				<Button color="primary" on:click={() => (modalOpen = !modalOpen)} class="btn-lg px-4"
					>Iniciar sesión</Button
				>
				<Button href="/descargar" class="btn btn-secondary btn-lg px-4">Descargar app</Button>
			</div>
		</div>
		<div class="col-6 col-md-4 col-lg-3">
			<svelte:component
				this={Carousel}
				autoplay
				autoplayDuration={5000}
				pauseOnFocus
				arrows={false}
				dots={false}
				let:loaded
			>
				<img
					src="/img/screen-app1.png"
					alt="Vista de aplicación móvil 1"
				/>
				<img
					src="/img/screen-app2.png"
					alt="Vista de aplicación móvil 2"
				/>
			</svelte:component>
		</div>

		<div class="my-5" />
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
				<a href="/info/plataforma"
					><Image
						fluid
						thumbnail
						src="/img/thumb-dashboard.jpg"
						alt="Panel Administrativo"
						class="my-4"
					/></a
				>
				<CardSubtitle>
					Donde puedes cargar la documentación de tus colaboradores en sitio, y ser validada por tus
					clientes
				</CardSubtitle>
				<a href="/info/plataforma"> Conocé más <i class="fas fa-arrow-right me-2" /></a>
			</CardBody>
		</Card>
		<Card class="col-md-6">
			<CardBody>
				<CardTitle class="fw-bold">Plataforma móvil</CardTitle>
				<a href="/info/movil"
					><Image
						fluid
						thumbnail
						src="/img/thumb-screen-app.jpg"
						alt="Aplicación móvil"
						class="my-4"
					/></a
				>
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
	header {
		/* Estilo de portada */
		height: 90vh;
		background: #ededed url('/img/bg-hero.jpg');
		background-attachment: fixed; /* Efecto parallax */
		background-size: cover; /* Cubrir todo el ancho */
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
