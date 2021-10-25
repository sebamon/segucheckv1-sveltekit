<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
</script>

<svelte:head>
	<title>Nuevo checklist - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists">Checklists</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1>Nuevo checklist</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>


<!-- Formulario nuevo usuario -->
<form name="formJobDetails" id="formJobDetails">
    <p class="text-muted fst-italic">Trabajo en progreso....</p>
    <img
        class="fluid thumbnail"
        alt="John Travolta perdido"
        title="John Travolta perdido"
        src="https://c.tenor.com/kVrGzZGZnUUAAAAC/pulp-fiction-wtf.gif"
    />
</form>