<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, bussinessName: 'Cliente A' },
		{ customer_id: 2, bussinessName: 'Cliente B' },
		{ customer_id: 3, bussinessName: 'Cliente C' }
	];
	// Atributos
	let customer_id: string;
	let bussinessName: string;
	let contact: string;
	let phone: string;
	let email: string;

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	/* regexName: Cualquier nombre con tildes y caracteres latinos (no japonés, hebreo, árabe, etc.).
	Permite espacios, comas puntos y guiones para nombres complejos. Excepto números y otros símbolos
	Fuente: https://andrewwoods.net/blog/2018/name-validation-regex/
	*/
	let regexName =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'\s-]+$/u;
	/* regexPhone: Números de teléfono con símbolos + ( ) y espacios. 
    Acepta número de país, 0 y 15 delante del código de área y teléfono respectivamente. 
    Probado con:
    +(549) 299 6667777
    +(549)(0299)6667777
    +5492996667777
    299-666-7777
    0299156667777
    2996667777
    156667777
    Fuente- Variante propia de: https://ihateregex.io/expr/phone/
    */
	let regexPhone = /^[\+]?[(\s]?[0-9]{3,4}[)\s]?[-\s\.(]?[0-9]{3,4}[-\s\.)]?[0-9]{3,7}/;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			bussinessName: '',
			contact: '',
			phone: '',
			email: '',
		},
		validationSchema: yup.object().shape({
			bussinessName: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			contact: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			email: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.email('El formato de email es incorrecto')
				.required('Debes completar este campo.'),
			phone: yup
				.string()
				.matches(regexPhone, 'El formato de teléfono es incorrecto')
				.required('Debes completar este campo.'),
		}),
		onSubmit: (values) => {
			// -- Muestra resultado en submit: BORRAR --
			alert(JSON.stringify(values));
		}
	});
</script>

<svelte:head>
	<title>Nuevo cliente - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/clientes">Clientes</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />Nuevo cliente</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

<!-- Formulario nuevo usuario -->
<form name="formCustomerDetails" id="formCustomerDetails">
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="bussinessName" class="form-label">Empresa cliente</label>
			<input
				type="text"
				id="bussinessName"
				name="bussinessName"
				class="form-control"
				placeholder="YPF"
				aria-label="Nombre del cliente"
				required
				bind:value={$form.bussinessName}
				on:blur={handleChange}
				class:invalid={$errors.bussinessName}
			/>
			{#if $errors.bussinessName}
				<small class="form-error">{$errors.bussinessName}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="bussinessName" class="form-label">Nombre del contacto</label>
			<input
				type="text"
				id="contact"
				name="contact"
				class="form-control"
				placeholder="Juan Perez"
				aria-label="Nombre del contacto"
				bind:value={$form.contact}
				on:blur={handleChange}
				class:invalid={$errors.contact}
			/>
			{#if $errors.contact}
				<small class="form-error">{$errors.contact}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="email" class="form-label">Correo electrónico</label>
			<input
				type="email"
				id="email"
				name="email"
				class="form-control"
				placeholder="juan.perez@ejemplo.com"
				aria-label="Correo electrónico"
				bind:value={$form.email}
				on:blur={handleChange}
				class:invalid={$errors.email}
			/>
			{#if $errors.email}
				<small class="form-error">{$errors.email}</small>
			{/if}
			/>
		</div>
		<div class="col-md-6">
			<label for="phone" class="form-label">Teléfono</label>
			<input
				type="tel"
				id="phone"
				name="phone"
				class="form-control"
				placeholder="2993334444"
				aria-label="Teléfono"
				bind:value={$form.phone}
				on:blur={handleChange}
				class:invalid={$errors.phone}
			/>
			{#if $errors.phone}
				<small class="form-error">{$errors.phone}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6" />
		<div class="col-md-6 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary" disabled={!$isValid}>
				{#if $isSubmitting}
					<i class="fas fa-spinner fa-pulse me-2" />Enviando...
				{:else}
					<i class="fas fa-plus me-2" />Crear
				{/if}
			</button>
		</div>
	</div>
</form>
