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

    
	// Alternar menú hamburguesa navbar (móvil):
	export let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

    // Alternar modal login
	export let open = false;
</script>

<Navbar color="light" light expand="md">
	<NavbarBrand href="/">SeguCheck</NavbarBrand>
	<Button color="warning" href="/panel" title="placeholder">Ir al panel</Button>
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
				<Button color="primary" on:click={() => (open = !open)}>Iniciar sesión</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>