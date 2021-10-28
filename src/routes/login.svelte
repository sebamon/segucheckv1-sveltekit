<script context="module">
	export async function load({ session }) {
		// console.log(session)
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	}
</script>
<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Button,
		Card,
		CardHeader,
		CardBody,
		CardFooter,
		Form,
		FormGroup,
		Input,
		Label
	} from 'sveltestrap';
	let cuit = '';
	let password = '';
	let errors = null;

	const submitForm = async ():Promise<void> =>{
		const response = await fetch(`auth/login`, {
			method : "POST",
			body :JSON.stringify({
				cuit,
				password,
			})
		})
		const data = await response.json()
		// errors = response.errors;
		// if(response.user){
		// 	$session.user= response.user;
		// 	goto('/panel')
		// }
	}
</script>

<main class="container py-4">
<Card class="shadow-lg">
    <CardHeader>Ingresar a SeguCheck</CardHeader>
    <CardBody>
		<form on:submit|preventDefault={submitForm} class="needs-validation">
			<FormGroup>
			  <Label for="user" class="small mb-1">CUIT</Label>
			  <Input
				class="py-3"
				type="text"
				name="user"
				id="user"
				placeholder="Ingresa tu CUIT"
				bind:value={cuit} />
			</FormGroup>
			<FormGroup>
			  <Label for="pass" class="small mb-1">Contraseña</Label>
			  <Input
				class="py-3"
				type="password"
				name="pass"
				id="pass"
				placeholder="Ingresa tu contraseña"
				bind:value={password} />
			</FormGroup>
			<FormGroup>
			  <Input
				type="checkbox"
				id="rec"
				label="Recordar contraseña" />
			</FormGroup>
			<FormGroup
			  class="d-flex align-items-center justify-content-between mt-4 mb-0">
			  <Button color="primary" class="btn-lg" type="submit">Ingresar</Button>
			  <a href="/recuperar">
				¿Olvidó su contraseña?
			  </a>
			</FormGroup>
		</form>
    </CardBody>
    <CardFooter>
		<p class="text-md-center small">Los usuarios deben estar previamente registrados por su empleador.</p>
    </CardFooter>
  </Card>
</main>