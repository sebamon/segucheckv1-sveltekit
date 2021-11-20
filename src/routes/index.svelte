<script lang="ts">
	import NavbarHome from '$lib/NavbarHome.svelte';
	import ModalLogin from '$lib/ModalLogin.svelte';
	import { page, session } from '$app/stores';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Card, CardBody, CardSubtitle, CardFooter, CardTitle, Image } from 'sveltestrap';

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
			<img src="img/segucheck-logo.svg" alt="logo" id="logoHeader" class="m-5" />
			<h1 class="fw-bold">Tus documentos de forma más eficiente</h1>
			<h3 class="lead col-md-8">
				Lleva el control de tus credenciales, permisos y checklists en tu bolsillo
			</h3>
			<div class="mb-5 g-3">
				<Button color="primary" on:click={() => (modalOpen = !modalOpen)} class="btn-lg px-4">
					Iniciar sesión
				</Button>
				<Button href="/descargar" class="btn btn-secondary btn-lg px-4">Descargar app</Button>
			</div>
		</div>
		<div class="col-6 col-md-4 col-lg-3" id="showCarousel">
			<svelte:component
				this={Carousel}
				autoplay
				autoplayDuration={5000}
				pauseOnFocus
				arrows={false}
				dots={false}
				let:loaded
			>
				<img src="/img/screen-app1.png" alt="Vista de aplicación móvil 1" />
				<img src="/img/screen-app2.png" alt="Vista de aplicación móvil 2" />
			</svelte:component>
		</div>
	</div>
	<a href="#sistema" class="text-decoration-none">
		<div class="text-center" id="conoceMas">
			<h5 class="fw-bold">Conocé más</h5>
			<i class="fas fa-chevron-down mx-2 fs-1" />
		</div>
	</a>
</header>

<!-- Más info al scrollear -->
<main class="container py-4">
	<div class="py-5">
		<h1 id="sistema">Este es nuestro sistema</h1>
		<h3 class="lead">Las herramientas que facilitarán tu jornada</h3>
	</div>
	<div class="card-group">
		<div class="card">
			<a href="/info/plataforma">
				<img
					class="img-fluid img-thumbnail my-4"
					src="/img/thumb-dashboard.jpg"
					alt="Aplicación móvil"
				/>
			</a>
			<div class="card-body">
				<h5 class="card-title fw-bold">Plataforma web</h5>
				<h6 class="card-subtitle mb-2">
					Donde puedes cargar la documentación de tus colaboradores en sitio, y ser validada por tus
					clientes
				</h6>
				<div class="card-footer">
					<a href="/info/plataforma"> Conocé más <i class="fas fa-arrow-right me-2" /></a>
				</div>
			</div>
		</div>
		<div class="card">
			<a href="/info/movil">
				<img
					class="img-fluid img-thumbnail my-4"
					src="/img/thumb-screen-app.jpg"
					alt="Aplicación móvil"
				/>
			</a>
			<div class="card-body">
				<h5 class="card-title fw-bold">Plataforma móvil</h5>
				<h6 class="card-subtitle mb-2">
					Donde tus colaboradores pueden visualizar su documentos, tareas y checklists
				</h6>
				<div class="card-footer">
					<a href="/info/movil"> Conocé más <i class="fas fa-arrow-right me-2" /></a>
				</div>
			</div>
		</div>
	</div>
	<hr class="m-5" />
</main>

<style>
	header {
		/* Estilo de portada */
		background: #ededed url('/img/bg-hero.jpg');
		background-attachment: fixed; /* Efecto parallax */
		background-size: cover; /* Cubrir todo el ancho */
		background-position: center;
		background-repeat: no-repeat;
	}
	#logoHeader {
		max-height: 200px;
	}
	@media (max-width: 768px) {
		/* Esconde carrusel en pantallas pequeñas */
		#showCarousel {
			display: none;
		}
		#logoHeader {
			display: block;
			margin: 0 auto;
			width: 40%;
		}
	}
	@media (min-width: 768px) and (min-height: 800px) {
		/* Evita que se sobresalgan items del header en pantallas pequeñas */
		header {
			height: 90vh;
		}
		#conoceMas {
			position: absolute;
			bottom: 0;
			width: 100%;
			background-color: rgba(169, 145, 212, 0.2);
			padding: 15px 0;
		}
	}
</style>
