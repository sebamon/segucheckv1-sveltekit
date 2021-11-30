<!-- <script context="module">
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
</script> -->
<script lang="ts">
	import {
		Card,
		CardHeader,
		CardBody,
		CardFooter,
		Form,
		FormGroup,
		Input,
		Label
	} from 'sveltestrap';

	// Imports y variables para submit:
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { emitWarning } from 'process';
	import type { subscribe } from 'svelte/internal';
	export let message = '';
	export let status = '';
	export let error = '';

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			cuit: '',
			password: '',
			save: 'false'
		},
		validationSchema: yup.object().shape({
			cuit: yup
				.string()
				.max(12, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			password: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.')
		}),
		onSubmit: async (values) => {
			// Realiza la carga de datos al cliquear Enviar
			alert(JSON.stringify(values));
			const response = await fetch('./auth/login', {
				method: 'POST',
				body: JSON.stringify({
					cuit: values.cuit,
					password: values.password
				})
			});
			const data = await response.json();
			data.token
				? localStorage.setItem('seguToken', data.token)
				: localStorage.setItem('seguToken', null);

			message = data.message;
		}
	});
</script>

<main class="container py-4">
	<!-- m -->
	{JSON.stringify(message)}
	<!-- <h1>{authenticated}</h1> -->
	<Card class="shadow-lg">
		<CardHeader>Ingresar a SeguCheck</CardHeader>
		<CardBody>
			<form name="login" id="login" on:submit|preventDefault={handleSubmit}>
				<FormGroup>
					<label for="user" class="form-label small mb-1">CUIT</label>
					<input
						class="form-control py-3"
						name="cuit"
						id="cuit"
						placeholder="Ingresa tu DNI"
						bind:value={$form.cuit}
						on:blur={handleChange}
						class:invalid={$errors.cuit}
					/>
					{#if $errors.cuit}
						<small class="form-error">{$errors.cuit}</small>
					{/if}
				</FormGroup>
				<FormGroup>
					<label for="pass" class="form-label small mb-1">Contraseña</label>
					<input
						class="form-control py-3"
						type="password"
						name="password"
						id="password"
						placeholder="Ingresa tu contraseña"
						bind:value={$form.password}
						on:blur={handleChange}
						class:invalid={$errors.password}
					/>
					{#if $errors.password}
						<small class="form-error">{$errors.password}</small>
					{/if}
				</FormGroup>
				<FormGroup>
					<input
						type="checkbox"
						class="form-check-input"
						name="save"
						id="save"
						bind:value={$form.save}
						on:blur={handleChange}
					/>
					<!-- Reemplazar con método similar a assign_rol de ...\usuarios\nuevo -->
					<label for="save" class="form-check-label mx-2">Recordar contraseña</label>
				</FormGroup>
				<div class="d-flex align-items-center justify-content-between mt-4 mb-0">
					<button type="submit" class="btn btn-primary btn-lg" disabled={!$isValid}>
						{#if $isSubmitting}
							<i class="fas fa-spinner fa-pulse me-2" />Verificando...
						{:else}
							<i class="fas fa-sign-in-alt me-2" />Ingresar
						{/if}
					</button>
					<a class="small" href="/recuperar"> ¿Olvidó su contraseña? </a>
				</div>

			</form>
		</CardBody>
		<CardFooter>
			<p class="text-md-center small">
				Los usuarios deben estar previamente registrados por su empleador.
			</p>
		</CardFooter>
	</Card>
</main>
