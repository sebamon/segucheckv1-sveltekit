<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
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
</script>

<main class="container py-4">
<Card class="shadow-lg">
    <CardHeader>Ingresar a SeguCheck</CardHeader>
    <CardBody>
		<Form action="/checklogin" method="post" class="needs-validation">
			<FormGroup>
			  <Label for="user" class="small mb-1">DNI</Label>
			  <Input
				class="py-3"
				type="text"
				name="user"
				id="user"
				placeholder="Ingresa tu DNI" />
			</FormGroup>
			<FormGroup>
			  <Label for="pass" class="small mb-1">Contraseña</Label>
			  <Input
				class="py-3"
				type="password"
				name="pass"
				id="pass"
				placeholder="Ingresa tu contraseña" />
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
		</Form>
    </CardBody>
    <CardFooter>
		<p class="text-md-center small">Los usuarios deben estar previamente registrados por su empleador.</p>
    </CardFooter>
  </Card>
</main>