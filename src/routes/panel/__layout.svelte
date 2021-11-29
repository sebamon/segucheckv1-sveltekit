<script context="module" lang="ts">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script lang="ts">
	// ./panel/__layout.svelte: Encabezado y pie de página panel
	// Animación al cambiar entre páginas: https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	import Transition from '$lib/Transition.svelte';
	export let key;
	import NavbarHome from '$lib/NavbarHome.svelte';
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
		Alert
	} from 'sveltestrap';

	// Alternar menú lateral:
	import { fade } from 'svelte/transition';
	let showSidebar = false;

	// Datos de usuario - Ver si esto lo maneja un hook:
	let session = {
		id_user: 1,
		firstName: 'Juan',
		lastName: 'Perez',
		roles: [
			{ rol_id: 1, rolDescription: 'Gestor documental' },
			{ rol_id: 2, rolDescription: 'Personal de seguridad' }
		]
	};
	/* Verificar si tiene rol 1 de 'Gestor documental' u 2 de 'Personal de seguridad':
	 * @return boolean
	 */
	let isAuthorized = () => {
		let userAuthorized = false;
		let totalRoles = session.roles.length;
		for (let i = 0; i < totalRoles; i++) {
			if (session.roles[i].rol_id == 1 || session.roles[i].rol_id == 2) {
				userAuthorized = true;
				i = totalRoles;
			}
		}
		return userAuthorized;
	};
</script>

{#if isAuthorized()}
	<div class="d-flex" id="wrapper">
		<!-- Menú lateral vertical: https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/dist/index.html#L16 -->
		{#if showSidebar}
			<div
				class="bg-dark"
				class:sb-sidenav-toggled={showSidebar}
				id="sidebar-wrapper"
				transition:fade
			>
				<div class="sidebar-heading bg-secondary row align-items-center">
					<div class="row">
						<div class="col-auto mt-2">
							<h4>Menú lateral</h4>
						</div>
						<div class="col-1 ms-auto">
							<button
								class="btn btn-secondary"
								title="cerrar"
								id="cerrarMenu"
								on:click={() => (showSidebar = false)}
							>
								<i class="fas fa-times fs-6" />
							</button>
						</div>
					</div>
				</div>
				<nav class="list-group list-group-flush text-center">
					<a class="list-group-item list-group-item-action list-group-item p-3" href="/panel">
						<i class="fas fa-home me-4" />Resumen
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/operarios"
					>
						<i class="fas fa-walking me-4" />Operarios
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/vehiculos"
					>
						<i class="fas fa-car me-4" />Vehículos
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/trabajos"
					>
						<i class="fas fa-briefcase me-4" />Trabajos
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/checklists"
					>
						<i class="fas fa-clipboard-check me-4" />Checklists
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/usuarios"
					>
						<i class="fas fa-users me-4" />Usuarios
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/locaciones"
					>
						<i class="fas fa-map-marked me-4" />Locaciones
					</a>
					<a
						class="list-group-item list-group-item-action list-group-item p-3"
						href="/panel/clientes"
					>
						<i class="fas fa-industry me-4" />Clientes
					</a>
				</nav>
			</div>
		{/if}

		<div id="page-content-wrapper">
			<!-- Menú superior horizontal -->
			<Navbar color="light" light expand="md" class="border-bottom py-2">
				<button class="btn btn-primary me-3" on:click={() => (showSidebar = !showSidebar)}>
					<i class="fas fa-bars fs-6 me-1" /> Menú
				</button>
				<NavbarBrand href="/panel">
					<img src="/img/segucheck-logo.svg" height="36" alt="logo" /><span
						class="mx-2 text-dark"
						id="text-logo">SeguCheck</span
					>
				</NavbarBrand>
				<Dropdown inNavbar>
					<DropdownToggle nav caret class="text-primary me-2">
						<i class="fas fa-user me-4" />{session.firstName + ' ' + session.lastName}
					</DropdownToggle>
					<DropdownMenu end>
						<DropdownItem href="/panel/perfil">Ver tu perfil</DropdownItem>
						<DropdownItem>Preferencias</DropdownItem>
						<DropdownItem href="/ayuda">Ayuda</DropdownItem>
						<DropdownItem divider />
						<DropdownItem href="/salir">Cerrar sesión</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Navbar>
			<!-- Contenido principal -->
			<Transition refresh={key}>
				<div class="container p-4 shadow-lg">
					<slot />
				</div>
			</Transition>
		</div>
	</div>
{:else}
	<NavbarHome />

	<div class="container p-4 shadow-lg">
		<Alert color="warning">
			<h4 class="alert-heading text-capitalize">
				<i class="fas fa-exclamation-triangle me-4" />Acceso denegado
			</h4>
			Para ver esta sección, primero debes iniciar sesión con una cuenta habilitada.
			<a href="/login" class="alert-link">Ir a iniciar sesión.</a>
		</Alert>
	</div>
{/if}

<style>
	#text-logo {
		font-family: 'Poppins', 'sans-serif';
	}

	/* --- Sidenav tema ---
	 * https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/dist/css/styles.css#L11276
	 */
	#wrapper {
		overflow-x: hidden;
	}
	#sidebar-wrapper {
		max-height: 100%;
	}
	#sidebar-wrapper .sidebar-heading {
		padding: 0.875rem 1.25rem;
		font-size: 1.2rem;
	}

	#page-content-wrapper {
		min-width: 0;
		width: 100%;
	}
	@media (max-width: 576px) {
		#sidebar-wrapper {
			min-width: 100vw;
		}
	}

	@media (min-width: 576px) {
		#cerrarMenu {
			display: none;
		}
		#sidebar-wrapper .list-group {
			width: 15rem;
		}
	}
</style>
