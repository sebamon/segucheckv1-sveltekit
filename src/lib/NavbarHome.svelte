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
</script>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">SeguCheck</NavbarBrand>
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