<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Button,
		Breadcrumb,
		BreadcrumbItem
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
	 *
	 * Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
	 * Copyright 2013-2021 Start Bootstrap
	 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
	 */
	onMount(() => {
		// Alternar el menú lateral - Hacer con Svelte
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

	// Armar versión Svelte:
	let showSidebar = true;
	const toggleSidebar = () => (showSidebar = !showSidebar);

	// Datos de usuario - Ver si esto lo maneja un hook
	let actualUser = 'Juan Perez';
</script>

<div class="d-flex" id="wrapper">
	<!-- Sidebar: https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/dist/index.html#L16 -->
	<div class="border-end bg-light" id="sidebar-wrapper">
		<div class="sidebar-heading border-bottom fs-4">Menú lateral</div>
		<div class="list-group list-group-flush">
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-home mx-2" />Resumen</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-walking mx-2" />Operarios</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-car mx-2" />Vehículos</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-briefcase mx-2" />Trabajos</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-clipboard-check mx-2" />Checklists</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-users mx-2" />Usuarios</a
			>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="#!">
				<i class="fas fa-map-marked mx-2" />Locaciones</a
			>
		</div>
	</div>

	<div id="page-content-wrapper">
		<!-- Menú de navegación -->
		<Navbar color="light" light expand="md">
			<Button color="secondary" id="#sidebarToggle" class="me-3"
				><i class="fas fa-bars fs-6" on:click={toggleSidebar} /></Button
			>
			<NavbarBrand href="/">SeguCheck</NavbarBrand>
			<NavbarToggler on:click={() => (isOpen = !isOpen)} />
			<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
				<Nav class="ms-auto" navbar>
					<Dropdown nav inNavbar>
						<DropdownToggle nav caret><i class="fas fa-user mx-2" />{actualUser}</DropdownToggle>
						<DropdownMenu end>
							<DropdownItem>Ver tu perfil</DropdownItem>
							<DropdownItem>Preferencias</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>Ayuda</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<NavItem>
						<Button color="secondary" on:click={toggle}>Cerrar sesión</Button>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
		<!-- Contenido principal -->
		<main class="container py-4">
			<!-- Posición -->
			<Breadcrumb>
				<BreadcrumbItem active>Resumen</BreadcrumbItem>
			</Breadcrumb>
			<h1>Resumen</h1>
			<p class="lead">Bienvenido de nuevo, {actualUser}</p>
			<p>
				<button class="btn btn-primary">Hola</button>
			</p>
		</main>
	</div>
</div>
