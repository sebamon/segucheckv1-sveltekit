<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/

	export let location_id: number;
	export let locationName: string;
	export let coordenates: string;
	// export let coordenateY: '-67.66':string
	export let province: string;
	export let customer = {
		id: 0,
		bussinessName: ''
	};

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

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
			locationName: locationName,
			coordenates: coordenates,
			province: province,
			bussinessName: customer.bussinessName
		},
		validationSchema: yup.object().shape({
			locationName: yup
				.string()
				.required('Debes completar este campo.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			coordenates: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.'),
			province: yup
				.string()
				.required('Debes completar este campo.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				)
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
			/* --- Customer debe ser un select al editar ---
                customer: yup
					.string()
					.required('Debes completar este campo.')
					.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
					.max(20, 'Este campo debe ser de hasta ${max} caracteres.'), */
		}),
		onSubmit: (values) => {
			// -- Muestra resultado en submit: BORRAR --
			alert(JSON.stringify(values));
		}
	});
</script>

<form name="formLocationDetails" id="formLocationDetails" on:submit|preventDefault={handleSubmit}>
	{#if isReadOnly}
		<div class="row">
			<div class="col-auto">
				<h1><i class="fas fa-map-marked me-4" />{locationName}</h1>
				<p class="lead">Detalles de la locación</p>
			</div>
			<div class="col-2 ms-auto">
				<a class="btn btn-primary" href="/panel/locaciones/{location_id}/editar">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{:else}
        <h1><i class="fas fa-map-marked me-4" />{locationName}</h1>
        <p class="lead">Indique los detalles a continuación</p>
	{/if}
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
				readonly={isReadOnly}
				class:invalid={$errors.locationName}
			/>
			{#if $errors.locationName}
				<small class="form-error">{$errors.locationName}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="customer" class="form-label">Cliente</label>
			<input
				type="text"
				id="customer"
				name="customer"
				class="form-control"
				placeholder="Cliente X"
				aria-label="Cliente"
				bind:value={$form.bussinessName}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.bussinessName}
			/>
			{#if $errors.bussinessName}
				<small class="form-error">{$errors.bussinessName}</small>
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
				readonly={isReadOnly}
				class:invalid={$errors.coordenates}
			/>
			{#if $errors.coordenates}
				<small class="form-error">{$errors.coordenates}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="province" class="form-label">Provincia</label>
			<input
				type="text"
				id="province"
				name="province"
				class="form-control"
				placeholder="Neuquén"
				aria-label="Provincia"
				bind:value={$form.province}
				on:blur={handleChange}
				readonly={isReadOnly}
				class:invalid={$errors.province}
			/>
			{#if $errors.province}
				<small class="form-error">{$errors.province}</small>
			{/if}
		</div>
	</div>
    {#if isReadOnly}
        <div class="row mb-3 g-3">
            <div class="col-md-12">
                <small class="fst-italic">Mapa placeholder: No está integrado como API</small>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0104807882767!2d-69.1899611978548!3d-38.92952028151186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960c6f2c11011405%3A0xe0df2e0585067db2!2sRefineria%20Ypf!5e0!3m2!1ses-419!2sar!4v1634860550780!5m2!1ses-419!2sar"
                    width="100%"
                    height="500px"
                    loading="lazy"
                    alt="Mapa de {locationName}"
                    title="Mapa de {locationName}"
                />
            </div>
        </div>
    {:else}
	<div class="row mb-3 g-3">
		<div class="col-md-6"></div>
        <div class="col-md-6 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" disabled={!$isValid}>
                {#if $isSubmitting}
                    <i class="fas fa-spinner fa-pulse me-2" />Enviando...
                {:else}
                    <i class="fas fa-pen me-2" />Confirmar cambios
                {/if}
            </button>
        </div>
    </div>
    {/if}
</form>
