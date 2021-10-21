<script lang="ts">
	import ModalLogin from '$lib/ModalLogin.svelte';
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

<Navbar color="light" light expand="md">
	<NavbarBrand href="/">SeguCheck</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<NavItem class="mx-2">
				<NavLink href="#sistema">Nuestro sistema</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="#tutoriales">Tutoriales</NavLink>
			</NavItem>
			<NavItem class="mx-2">
				<NavLink href="#contacto">Contacto</NavLink>
			</NavItem>
			<NavItem class="ms-2">
				<Button color="primary" on:click={() => (modalOpen = !modalOpen)}>Iniciar sesión</Button>
                <Button color="warning" href="/panel" title="placeholder">Ir al panel</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<!-- Modal login -->
<ModalLogin {modalOpen} />