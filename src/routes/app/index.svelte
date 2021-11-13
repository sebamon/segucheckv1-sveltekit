<script lang="ts">
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

	// Datos de usuario - Ver si esto lo maneja un hook
	let actualUser = 'Juan Perez';
</script>

<svelte:head>
	<title>Inicio app - SeguCheck</title>
</svelte:head>

<h1>Esto está en construcción...</h1>
<p class="lead">Ah, hola {actualUser}! Esta sería la vista de aplicación móvil (o versión web) para el operario.</p>