<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
        Button,
		Breadcrumb,
		BreadcrumbItem,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle
	} from 'sveltestrap';

	// Datos de usuario - Ver si esto lo maneja un hook
	let actualUser = 'Juan Perez';
</script>

<svelte:head>
	<!-- Insertar al head del HTML -->
	<title>Nuevo operario - SeguCheck</title>
</svelte:head>

<!-- Posición -->
<Breadcrumb>
	<BreadcrumbItem>
		<a href="/panel/">Inicio</a>
	</BreadcrumbItem>
	<BreadcrumbItem>
		<a href="/panel/operarios">Operarios</a>
	</BreadcrumbItem>
	<BreadcrumbItem active>Nuevo</BreadcrumbItem>
</Breadcrumb>
<input type="text" placeholder="Nuevo operario..."/>