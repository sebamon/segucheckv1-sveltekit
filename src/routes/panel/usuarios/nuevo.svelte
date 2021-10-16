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
<form action="/newop" method="post">
	<div class="mb-3">
	  <label for="exampleInputEmail1" class="form-label">Email address</label>
	  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
	  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
	</div>
	<div class="mb-3">
	  <label for="exampleInputPassword1" class="form-label">Password</label>
	  <input type="password" class="form-control" id="exampleInputPassword1">
	</div>
	<div class="mb-3 form-check">
	  <input type="checkbox" class="form-check-input" id="exampleCheck1">
	  <label class="form-check-label" for="exampleCheck1">Check me out</label>
	</div>
	<button type="submit" class="btn btn-primary">Submit</button>
  </form>