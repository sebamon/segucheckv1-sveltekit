<script lang="ts">
	import ModalLogin from '$lib/ModalLogin.svelte';
	// import { authenticated } from '../stores/auth'

	// let auth = false

	// authenticated.subscribe( a => auth = a)

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

	// Alternar menú hamburguesa navbar (móvil):
	export let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	// Alternar modal login
	export let modalOpen = false;
</script>

<Navbar color="light" light expand="md" class="border-bottom">
	<NavbarBrand href="/">
		<img src="/img/segucheck-logo.svg" height="36" alt="Logo Segucheck" />
		<span class="mx-2 text-dark" id="text-logo">SeguCheck </span>
	</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} aria-label="Desplegar menú" />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<NavItem class="mx-2">
				<NavLink href="/info/acerca" class="text-primary">Acerca de</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="/info/descargar" class="text-primary">Descargar app</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="/info" class="text-primary">Tutoriales</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="/info/blog" class="text-muted disabled" tabindex="-1" aria-disabled="true">
					Novedades
				</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="#contacto" class="text-primary">Contacto</NavLink>
			</NavItem>
			<NavItem class="ms-2">
				<!-- <Button color="primary" on:click={() => (modalOpen = !modalOpen)}>Iniciar sesión</Button> -->
				<Button color="warning" href="/panel">Ir al panel</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<!-- Modal login -->
<ModalLogin {modalOpen} />

<style>
	#text-logo {
		font-family: 'Poppins', 'sans-serif';
	}
</style>
