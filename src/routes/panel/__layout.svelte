<!-- Encabezado y pie de página panel -->
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
	<div class="border-end bg-dark" id="sidebar-wrapper">
		<div class="sidebar-heading border-bottom bg-secondary fs-4">Menú lateral</div>
		<div class="list-group list-group-flush">
			<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel">
				<i class="fas fa-home me-2" />Resumen
			</a>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel/operarios">
				<i class="fas fa-walking me-2" />Operarios
			</a>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel/vehiculos">
				<i class="fas fa-car me-2" />Vehículos
			</a>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel/trabajos">
				<i class="fas fa-briefcase me-2" />Trabajos
			</a>
			<a
				class="list-group-item list-group-item-action list-group-item p-3"
				href="/panel/checklists"
			>
				<i class="fas fa-clipboard-check me-2" />Checklists
			</a>
			<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel/usuarios">
				<i class="fas fa-users me-2" />Usuarios
			</a>
			<a
				class="list-group-item list-group-item-action list-group-item p-3"
				href="/panel/locaciones"
			>
				<i class="fas fa-map-marked me-2" />Locaciones
			</a>
			<a
				class="list-group-item list-group-item-action list-group-item p-3"
				href="/panel/clientes"
			>
				<i class="fas fa-industry me-2" />Clientes
			</a>
		</div>
	</div>

	<div id="page-content-wrapper">
		<!-- Menú de navegación -->
		<Navbar color="light" light expand="md">
			<Button color="secondary" id="#sidebarToggle" class="me-3">
				<i class="fas fa-bars fs-6" on:click={toggleSidebar} />
			</Button>
			<NavbarBrand href="/">SeguCheck</NavbarBrand>
			<NavbarToggler on:click={() => (isOpen = !isOpen)} />
			<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
				<Nav class="ms-auto" navbar>
					<Dropdown nav inNavbar>
						<DropdownToggle nav caret><i class="fas fa-user me-2" />{actualUser}</DropdownToggle>
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
		<div class="container p-4">
			<slot />
		</div>
	</div>
</div>
