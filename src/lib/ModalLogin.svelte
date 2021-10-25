<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Form,
		FormGroup,
		Input,
		Label
	} from 'sveltestrap';

	// Abrir modal login
	export let modalOpen = false;
</script>

<!-- Modal login -->
<Modal isOpen={modalOpen}>
	<ModalHeader toggle={() => (modalOpen = !modalOpen)}>Ingresar a SeguCheck</ModalHeader>
	<ModalBody>
		<Form name="modalLogin" id="modalLogin" action="/checklogin" method="post">
			<FormGroup>
				<Label for="user" class="small mb-1">DNI</Label>
				<Input class="py-3" type="text" name="user" id="user" placeholder="Ingresa tu DNI" />
			</FormGroup>
			<FormGroup>
				<Label for="pass" class="small mb-1">Contraseña</Label>
				<Input
					class="py-3"
					type="password"
					name="pass"
					id="pass"
					placeholder="Ingresa tu contraseña"
				/>
			</FormGroup>
			<FormGroup>
				<Input type="checkbox" id="rec" label="Recordar contraseña" />
			</FormGroup>
			<FormGroup class="d-flex align-items-center justify-content-between mt-4 mb-0">
				<Button color="primary" href="/login">Ingresar</Button>
				<a class="small" href="/recuperar"> ¿Olvidó su contraseña? </a>
			</FormGroup>
		</Form>
	</ModalBody>
	<ModalFooter>
		<p class="text-md-center small">
			Los usuarios deben estar previamente registrados por su empleador.
		</p>
	</ModalFooter>
</Modal>