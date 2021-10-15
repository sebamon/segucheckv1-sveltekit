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
    <CardHeader>Recuperar su cuenta de SeguCheck</CardHeader>
    <CardBody>
        <p>
            A través de su correo, le enviaremos un enlace para ingresar su nueva contraseña con la cual ingresar al sistema.
        </p>
		<Form action="/checklogin" method="post" class="needs-validation">
			<FormGroup>
			  <Label for="user" class="small mb-1">Ingrese su email laboral</Label>
			  <Input
				class="py-3"
				type="email"
				name="user"
				id="user"
				placeholder="alguien@ejemplo.com" />
			</FormGroup>
			<FormGroup
			  class="d-flex align-items-center justify-content-between mt-4 mb-0">
			  <Button color="primary" class="btn-lg" type="submit">Enviar</Button>
			  <a href="/login">
				¿Desea volver a ingresar su contraseña?
			  </a>
			</FormGroup>
		</Form>
    </CardBody>
    <CardFooter>
		<p class="text-md-center small">Los usuarios deben estar previamente registrados por su empleador.</p>
    </CardFooter>
  </Card>
</main>