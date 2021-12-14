<script lang="ts">
	// Datos de los domicilios a mostrar
	export let user_id = 1;

	export let countryOfOrigin = '';
	export let stateOfOrigin = '';
	export let cityOfOrigin = '';
	export let zipCodeOfOrigin = 0;
	export let addressOfOrigin = '';
	export let phoneOfOrigin = '';
	export let countryOfResidence = '';
	export let stateOfResidence = '';
	export let cityOfResidence = '';
	export let zipCodeOfResidence = 0;
	export let addressOfResidence = '';
	export let phoneOfResidence = '';

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
			countryOfOrigin: countryOfOrigin,
			stateOfOrigin: stateOfOrigin,
			cityOfOrigin: cityOfOrigin,
			zipCodeOfOrigin: zipCodeOfOrigin,
			addressOfOrigin: addressOfOrigin,
			phoneOfOrigin: phoneOfOrigin,
			countryOfResidence: countryOfResidence,
			stateOfResidence: stateOfResidence,
			cityOfResidence: cityOfResidence,
			zipCodeOfResidence: zipCodeOfResidence,
			addressOfResidence: addressOfResidence,
			phoneOfResidence: phoneOfResidence
		},
		validationSchema: yup.object().shape({
			countryOfOrigin: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			stateOfOrigin: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			cityOfOrigin: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			zipCodeOfOrigin: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.'),
			phoneOfOrigin: yup.string().matches(regexPhone, 'El formato de teléfono no es válido.'),
			countryOfResidence: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			stateOfResidence: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			cityOfResidence: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.')
				.matches(
					regexName,
					'Este campo solo permite letras y espacios, no números ni otros símbolos.'
				),
			addressOfResidence: yup
				.string()
				.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
				.max(190, 'Este campo debe ser de hasta ${min} caracteres.'),
			phoneOfResidence: yup.string().matches(regexPhone, 'El formato de teléfono es incorrecto.')
		}),
		onSubmit: (values) => {
			// Realiza la carga de datos al cliquear Enviar
			// alert(JSON.stringify(values));
		}
	});
</script>

<form name="formUserAddress" id="formUserAddress" on:submit|preventDefault={handleSubmit}>
	{#if isReadOnly}
		<div class="hstack gap-3">
			<h2 class="my-4"><i class="fas fa-house-user me-4" />Domicilios</h2>
			<div class="ms-auto">
				<a class="btn btn-primary" href="/panel/operarios/{user_id}/domicilios">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{/if}
	<section>
		<div class="row mt-3 g-3">
			<h3>Domicilio de origen</h3>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="countryOfOrigin" class="form-label">País</label>
				<input
					type="text"
					id="countryOfOrigin"
					name="countryOfOrigin"
					class="form-control"
					placeholder="Estados Unidos"
					aria-label="País"
					bind:value={$form.countryOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.countryOfOrigin}
				/>
				{#if $errors.countryOfOrigin}
					<small class="form-error">{$errors.countryOfOrigin}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="stateOfOrigin" class="form-label">Provincia / Estado</label>
				<input
					type="text"
					id="stateOfOrigin"
					name="stateOfOrigin"
					class="form-control"
					placeholder="Texas"
					aria-label="Provincia / Estado"
					bind:value={$form.stateOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.stateOfOrigin}
				/>
				{#if $errors.stateOfOrigin}
					<small class="form-error">{$errors.stateOfOrigin}</small>
				{/if}
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="cityOfOrigin" class="form-label">Localidad</label>
				<input
					type="text"
					id="cityOfOrigin"
					name="cityOfOrigin"
					class="form-control"
					placeholder="Houston"
					aria-label="Localidad"
					bind:value={$form.cityOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.cityOfOrigin}
				/>
				{#if $errors.cityOfOrigin}
					<small class="form-error">{$errors.cityOfOrigin}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="zipCodeOfOrigin" class="form-label">Código postal</label>
				<input
					type="text"
					id="zipCodeOfOrigin"
					name="zipCodeOfOrigin"
					class="form-control"
					placeholder="77001"
					aria-label="Código postal"
					bind:value={$form.zipCodeOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.zipCodeOfOrigin}
				/>
				{#if $errors.zipCodeOfOrigin}
					<small class="form-error">{$errors.zipCodeOfOrigin}</small>
				{/if}
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="addressOfOrigin" class="form-label">Dirección</label>
				<input
					type="text"
					id="addressOfOrigin"
					name="addressOfOrigin"
					class="form-control"
					placeholder="6815 Eastwood St."
					aria-label="Dirección"
					bind:value={$form.addressOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.addressOfOrigin}
				/>
				{#if $errors.addressOfOrigin}
					<small class="form-error">{$errors.addressOfOrigin}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="phoneOfOrigin" class="form-label">Teléfono</label>
				<input
					type="text"
					id="phoneOfOrigin"
					name="phoneOfOrigin"
					class="form-control"
					placeholder="+1-281-555-0185"
					aria-label="Teléfono"
					bind:value={$form.phoneOfOrigin}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.phoneOfOrigin}
				/>
				{#if $errors.phoneOfOrigin}
					<small class="form-error">{$errors.phoneOfOrigin}</small>
				{/if}
			</div>
		</div>
	</section>
	<section>
		<div class="row mt-3 g-3">
			<h3>Domicilio de residencia</h3>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="countryOfResidence" class="form-label">País</label>
				<input
					type="text"
					id="countryOfResidence"
					name="countryOfResidence"
					class="form-control"
					placeholder="Argentina"
					aria-label="País"
					bind:value={$form.countryOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.countryOfResidence}
				/>
				{#if $errors.countryOfResidence}
					<small class="form-error">{$errors.countryOfResidence}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="stateOfResidence" class="form-label">Provincia / Estado</label>
				<input
					type="text"
					id="stateOfResidence"
					name="stateOfResidence"
					class="form-control"
					placeholder="Neuquén"
					aria-label="Provincia / Estado"
					bind:value={$form.stateOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.stateOfResidence}
				/>
				{#if $errors.stateOfResidence}
					<small class="form-error">{$errors.stateOfResidence}</small>
				{/if}
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="cityOfResidence" class="form-label">Localidad</label>
				<input
					type="text"
					id="cityOfResidence"
					name="cityOfResidence"
					class="form-control"
					placeholder="Rincón de los Sauces"
					aria-label="Localidad"
					bind:value={$form.cityOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.cityOfResidence}
				/>
				{#if $errors.cityOfResidence}
					<small class="form-error">{$errors.cityOfResidence}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="zipCodeOfOrigin" class="form-label">Código postal</label>
				<input
					type="text"
					id="zipCodeOfResidence"
					name="zipCodeOfResidence"
					class="form-control"
					placeholder="8319"
					aria-label="Código postal"
					bind:value={$form.zipCodeOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.zipCodeOfResidence}
				/>
				{#if $errors.zipCodeOfResidence}
					<small class="form-error">{$errors.zipCodeOfResidence}</small>
				{/if}
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="addressOfResidence" class="form-label">Dirección</label>
				<input
					type="text"
					id="addressOfResidence"
					name="addressOfResidence"
					class="form-control"
					placeholder="Roca 893"
					aria-label="Dirección"
					bind:value={$form.addressOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.addressOfResidence}
				/>
				{#if $errors.addressOfResidence}
					<small class="form-error">{$errors.addressOfResidence}</small>
				{/if}
			</div>
			<div class="col-md-6">
				<label for="phoneOfResidence" class="form-label">Teléfono</label>
				<input
					type="text"
					id="phoneOfResidence"
					name="phoneOfResidence"
					class="form-control"
					placeholder="299-412-3469"
					aria-label="Teléfono"
					bind:value={$form.phoneOfResidence}
					on:blur={handleChange}
					readonly={isReadOnly}
					class:invalid={$errors.phoneOfResidence}
				/>
				{#if $errors.addressOfResidence}
					<small class="form-error">{$errors.addressOfResidence}</small>
				{/if}
			</div>
		</div>
	</section>
	{#if !isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-6" />
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary">
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
