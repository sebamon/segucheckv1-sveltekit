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

	let open = false;
	const toggle = () => (open = !open);

	import { onMount } from 'svelte';
	/* https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/dist/js/scripts.js#L12
	 * Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
	 * Copyright 2013-2021 Start Bootstrap
	 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
	 */
	onMount(() => {
		// Toggle the side navigation
		const sidebarToggle = document.body.querySelector('#sidebarToggle');
		if (sidebarToggle) {
			// Uncomment Below to persist sidebar toggle between refreshes
			// if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
			//     document.body.classList.toggle('sb-sidenav-toggled');
			// }
			sidebarToggle.addEventListener('click', (event) => {
				event.preventDefault();
				document.body.classList.toggle('sb-sidenav-toggled');
				localStorage.setItem(
					'sb|sidebar-toggle',
					document.body.classList.contains('sb-sidenav-toggled')
				);
			});
		}
	});
</script>

<div id="wrapper">
	<!-- Sidebar: https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/dist/index.html#L16 -->
	<div class="border-end bg-white" id="sidebar-wrapper">
		<div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
		<div class="list-group list-group-flush">
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Dashboard</a
			>
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Shortcuts</a
			>
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Overview</a
			>
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Events</a
			>
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Profile</a
			>
			<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!"
				>Status</a
			>
		</div>
	</div>
		<!-- Menú de navegación -->
		<Navbar color="light" light expand="md">
			<NavbarBrand href="/">SeguCheck</NavbarBrand>
			<Button color="primary" id="#sidebarToggle">Expandir</Button>
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

        <div id="page-content-wrapper">
		<!-- Contenido principal -->
		<main class="container py-4">
			<h1>Panel Administrativo</h1>
			<h2>Aquí se supone que debe haber algo...</h2>
			<button class="btn btn-primary">Hola</button>
		</main>
	</div>
</div>
