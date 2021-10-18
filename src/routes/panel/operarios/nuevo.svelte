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
	let email;
	let password;

	const submitForm = async () =>{
		const submit = await fetch ('operarios',{
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				})
		})
		const data = await submit.json()

	}
</script>

<svelte:head>
	<title>Nuevo operario - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1>Operarios</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/operarios/nuevo"><i class="fas fa-plus me-2" />Nuevo</Button>
	</div>
</header>

<!-- Prueba form -->
<form on:submit={submitForm}>
	<div class="mb-3">
	  <label for="exampleInputEmail1" class="form-label">Email address</label>
	  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" bind:value={email}>
	  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
	</div>
	<div class="mb-3">
	  <label for="exampleInputPassword1" class="form-label">Password</label>
	  <input type="password" class="form-control" id="exampleInputPassword1" bind:value={password}>
	</div>
	<div class="mb-3 form-check">
	  <input type="checkbox" class="form-check-input" id="exampleCheck1">
	  <label class="form-check-label" for="exampleCheck1">Check me out</label>
	</div>
	<button type="submit" class="btn btn-primary">Submit</button>
  </form>