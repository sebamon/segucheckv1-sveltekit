<script>
	// Activar menú hamburguesa - Seguramente se puede implementar algo con Svelte
	import { onMount } from 'svelte';
	onMount(() => {
		// The following code is based off a toggle menu by @Bradcomp
		// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
		var burger = document.querySelector('.burger');
		var menu = document.querySelector('#' + burger.dataset.target);
		burger.addEventListener('click', function () {
			burger.classList.toggle('is-active');
			menu.classList.toggle('is-active');
		});
	});
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Hero - Plantilla Bulma</title>
	<link
		rel="stylesheet"
		href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
		integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
		crossorigin="anonymous"
	/>
</svelte:head>

<section class="hero is-fullheight">
	<!-- Hero head: will stick at the top -->
	<div class="hero-head">
		<header class="navbar">
			<div class="container">
				<div class="navbar-brand">
					<a class="navbar-item">
						<img src="https://bulma.io/images/bulma-logo.png" alt="Logo" />
					</a>
					<span class="navbar-burger" data-target="navbarMenuHeroC">
						<span />
						<span />
						<span />
					</span>
				</div>
				<div id="navbarMenuHeroC" class="navbar-menu">
					<div class="navbar-end">
						<a class="navbar-item is-active" href="#sistema"> Nuestro sistema </a>
						<a class="navbar-item" href="#tutoriales"> Tutoriales </a>
						<a class="navbar-item" href="#contacto"> Contacto </a>
						<span class="navbar-item">
							<a class="button is-primary is-inverted">
								<span class="icon">
									<i class="fab fa-github" />
								</span>
								<span>Iniciar sesión</span>
							</a>
						</span>
					</div>
				</div>
			</div>
		</header>
	</div>

	<!-- Hero content: will be in the middle -->
	<div class="hero-body">
		<div class="container has-text-centered">
			<div class="columns is-vcentered">
				<div class="column is-6 is-offset-1">
					<h1 class="title is-2">Tus documentos de forma más eficiente</h1>
					<h2 class="subtitle is-4">
						Lleva el control de tus credenciales, permisos y checklists en tu bolsillo
					</h2>
					<br />
					<p class="has-text-centered">
						<a class="button is-medium is-primary"> Iniciar sesión </a>
						<a class="button is-medium is-primary is-outlined"> Descarga la app </a>
					</p>
				</div>
				<div class="column is-5">
					<figure class="image is-4by3">
						<img src="https://picsum.photos/800/600/?random" alt="Description" />
					</figure>
				</div>
			</div>
		</div>
	</div>

	<!-- Hero footer: will stick at the bottom -->
	<div class="hero-foot is-centered">
		<h3 class="subtitle is-4 has-text-centered">
			Conocé más
			<span class="icon">
				<i class="fas fa-chevron-down" />
			</span>
		</h3>
	</div>
</section>

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>SeguCheck</strong> © 2021 - Desarrollado por
			<a href="https://github.com/sebamon/segucheckv1-sveltekit">SanguCheck Dozen</a>
		</p>
	</div>
</footer>
