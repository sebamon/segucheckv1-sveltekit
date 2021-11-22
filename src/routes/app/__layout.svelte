<script context="module" lang="ts">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script lang="ts">
	// ./app/__layout.svelte: Encabezado y contenedor de sección: aplicación operario

	// Animación al cambiar entre páginas: https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	import Transition from '$lib/Transition.svelte';
	export let key;
	import NavbarHome from '$lib/NavbarHome.svelte';
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

	// Obtener ruta actual: https://github.com/EmilTholin/svelte-routing/issues/62#issuecomment-939503161
	import { page } from '$app/stores';

	// NO FUNCIONA DE FORMA REACTIVA
	let pageTitle = '';
	switch ($page.path) {
		case '/app':
			pageTitle = 'Inicio';
			break;
		case '/app/perfil':
			pageTitle = 'Perfil';
			break;
		case '/app/habilitaciones':
			pageTitle = 'Habilitaciones';
			break;
		case '/app/tareas':
			pageTitle = 'Tareas';
			break;
		case '/app/checklists':
			pageTitle = 'Cchecklists';
			break;
		case '/app/vehiculos':
			pageTitle = 'Vehiculos';
			break;
		case '/app/qr':
			pageTitle = 'Código QR';
			break;
		default:
			pageTitle = 'Aplicación';
	}

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

<svelte:head>
	<title>{pageTitle} - SeguCheck</title>
	<!-- Corregir reactividad -->
</svelte:head>

{#if isAuthorized()}
	<!-- Menú superior horizontal -->
	<Navbar color="light" light class="border-bottom py-2 justify-content-between user-select-none">
		{#if $page.path == '/app'}
			<NavbarBrand href="/app">
				<img src="/img/segucheck-logo.svg" height="36" alt="logo" />
				<span class="m-2 text-dark" id="text-logo">SeguCheck</span>
			</NavbarBrand>
		{:else}
			<NavbarBrand href="/app">
				<i class="fas fa-chevron-left text-dark fs-1 mx-2" />
			</NavbarBrand>
		{/if}
		<div>
			<p class="lead m-2">{pageTitle}</p>
		</div>
		<Dropdown inNavbar>
			<DropdownToggle nav>
				<i class="fas fa-bars text-dark lead fs-1 mx-2" />
			</DropdownToggle>
			<DropdownMenu end>
				<DropdownItem href="/app/perfil"><i class="fas fa-user me-2" />Perfil</DropdownItem>
				<DropdownItem><i class="fas fa-cog me-2" />Ajustes</DropdownItem>
				<DropdownItem href="/ayuda"><i class="fas fa-question-circle me-2" />Ayuda</DropdownItem>
				<DropdownItem divider />
				<DropdownItem href="/salir"><i class="fas fa-sign-out-alt me-2" />Salir</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</Navbar>
	<!-- Contenido principal -->
	<Transition refresh={key}>
		<div class="container p-4 shadow-lg">
			<slot />
		</div>
	</Transition>
{:else}
	<NavbarHome />

	<div class="container p-4">
		<Alert color="warning">
			<h4 class="alert-heading text-capitalize">
				<i class="fas fa-exclamation-triangle me-4" />Acceso denegado
			</h4>
			Para ver esta sección, primero debes iniciar sesión con una cuenta habilitada.
			<a href="/login" class="alert-link">Ir a iniciar sesión.</a>
		</Alert>
	</div>
{/if}
