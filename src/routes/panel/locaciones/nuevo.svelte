<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

	// Arreglo de clientes - Esto lo lee de la DB:
	let customerList = [
		{ customer_id: 1, bussinessName: 'Cliente A' },
		{ customer_id: 2, bussinessName: 'Cliente B' },
		{ customer_id: 3, bussinessName: 'Cliente C' }
	];
	// Arreglo de provincias
	let provinceList = [
		'Buenos Aires',
		'Capital Federal',
		'Catamarca',
		'Chaco',
		'Chubut',
		'Córdoba',
		'Corrientes',
		'Entre Ríos',
		'Formosa',
		'Jujuy',
		'La Pampa',
		'La Rioja',
		'Mendoza',
		'Misiones',
		'Neuquén',
		'Río Negro',
		'Salta',
		'San Juan',
		'San Luis',
		'Santa Cruz',
		'Santa Fe',
		'Santiago del Estero',
		'Tierra del Fuego',
		'Tucumán'
	];
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
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			locationName: '',
			coordenates: '',
			province: '',
			customer: ''
		},
		validationSchema: yup.object().shape({
			locationName: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.required('Debes completar este campo.'),
			coordenates: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			province: yup
				.mixed()
				.oneOf(provinceList, 'La provincia indicada no se encuentra en la lista.'),
			customer: yup.mixed().oneOf(customerList, 'El cliente indicado no se encuentra en la lista.')
		}),
		onSubmit: (values) => {
			// -- Muestra resultado en submit: BORRAR --
			alert(JSON.stringify(values));
		}
	});
</script>

<svelte:head>
	<title>Nueva locación - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/locaciones">Locaciones</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-map-marked me-4" />Nueva locación</h1>
	<p class="lead">Ingrese los detalles a continuación</p>
</header>

<!-- Formulario nuevo usuario -->
<form name="formLocationDetails" id="formLocationDetails" on:submit|preventDefault={handleSubmit}>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="locationName" class="form-label">Nombre del sitio</label>
			<input
				type="text"
				id="locationName"
				name="locationName"
				class="form-control"
				placeholder="Refinería Plaza Huincul"
				aria-label="Nombre del sitio"
				bind:value={$form.locationName}
				on:blur={handleChange}
				class:invalid={$errors.locationName}
			/>
			{#if $errors.locationName}
				<small class="form-error">{$errors.locationName}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<select id="customer" class="form-select" aria-label="Cliente" required>
				<option selected disabled>Elija una opción...</option>
				{#each customerList as { customer_id, bussinessName }}
					<option value={customer_id}>{bussinessName}</option>
				{/each}
			</select>
			{#if $errors.customer}
				<small class="form-error">{$errors.customer}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="coordenates" class="form-label">Coordenadas</label>
			<input
				type="text"
				id="coordenates"
				name="coordenates"
				class="form-control"
				placeholder="-38.74,-67.66"
				aria-label="Coordenadas"
				bind:value={$form.coordenates}
				on:blur={handleChange}
				class:invalid={$errors.coordenates}
			/>
			{#if $errors.coordenates}
				<small class="form-error">{$errors.coordenates}</small>
			{/if}
		</div>
		<!-- Editar BD si lo usamos:
			<label for="coordenates" class="form-label">Coordenada Y</label>
			<input
				type="text"
				id="coordenateY"
				name="coordenateY"
				class="form-control"
				placeholder="-67.66"
				aria-label="Coordenada Y"
				bind:value={$form.coordenateY}
				on:blur={handleChange}
				class:invalid={$errors.coordenates}
			/> -->
		<div class="col-md-6">
			<label for="province" class="form-label">Provincia</label>
			<select
				id="province"
				class="form-select"
				aria-label="Provincia"
				bind:value={$form.province}
				on:blur={handleChange}
				class:invalid={$errors.province}
			>
				<option selected disabled>Elija una opción...</option>
				{#each provinceList as province}
					<option value={province}>{province}</option>
				{/each}
			</select>
			{#if $errors.province}
				<small class="form-error">{$errors.province}</small>
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
