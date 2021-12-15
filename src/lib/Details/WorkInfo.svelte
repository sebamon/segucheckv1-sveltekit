<script lang="ts">
	import moment from 'moment';
	// Datos laborales a mostrar
	// export let user_id = 1;
	// export let dischargeDate = new Date();
	// export let employementRel = '';
	// export let hiringMode = '';
	// export let unionAgreement = '';
	// export let job = '';
	
	export let user_id
export let dischargeDate
export let employementRel
export let hiringMode
export let unionAgreement
export let job

	export let dateString = moment.utc(dischargeDate).format('YYYY/MM/DD');

	let convertedDischargeDate = new Date(new Date(dateString).getTime()- new Date().getTimezoneOffset())
	.toISOString()
	.split('T')[0];


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
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } =
		createForm({
			initialValues: {
				dischargeDate: convertedDischargeDate,
				employementRel: employementRel,
				hiringMode: hiringMode,
				unionAgreement: unionAgreement,
				job: job
			},
			validationSchema: yup.object().shape({
				dischargeDate: yup.date().required('Debes completar este campo.'),
				employementRel: yup
					.string()
					.required('Debes completar este campo.')
					.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
					.matches(regexName, 'Este campo solo permite letras y espacios, no números ni otros símbolos.'),
				hiringMode: yup
					.string()
					.required('Debes completar este campo.')
					.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
					.matches(regexName, 'Este campo solo permite letras y espacios, no números ni otros símbolos.'),
				unionAgreement: yup
					.string()
					.required('Debes completar este campo.')
					.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
					.matches(regexName, 'Este campo solo permite letras y espacios, no números ni otros símbolos.'),
				job: yup
					.string()
					.required('Debes completar este campo.')
					.min(3, 'Este campo debe ser de al menos ${min} caracteres.')
					.matches(regexName, 'Este campo solo permite letras y espacios, no números ni otros símbolos.')
			}),
			onSubmit: (values) => {
				// Realiza la carga de datos al cliquear Enviar
				// alert(JSON.stringify(values));
			}
		});
	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;
</script>

<form name="formUserWorkInfo" id="formUserWorkInfo" on:submit|preventDefault={handleSubmit}>
	{#if isReadOnly}
		<div class="hstack gap-3">
			<h2 class="my-4"><i class="fas fa-briefcase me-4" />Datos laborales</h2>
			<div class="ms-auto">
				<a class="btn btn-primary" href="/panel/operarios/{user_id}/laborales">
					<i class="fas fa-pen me-2" />Editar
				</a>
			</div>
		</div>
	{/if}
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="dischargeDate" class="form-label">Fecha de alta</label>
			{#if isReadOnly}
				<input
					type="text"
					id="dischargeDate"
					name="dischargeDate"
					class="form-control"
					placeholder="21/08/2019"
					aria-label="Fecha de alta"
					bind:value={$form.dischargeDate}
					readonly={isReadOnly}
				/>
			{:else}
				<input
					type="date"
					id="dischargeDate"
					name="dischargeDate"
					class="form-control"
					placeholder="1980-12-31"
					aria-label="Fecha de alta"
					bind:value={$form.dischargeDate}
					readonly={isReadOnly}
					class:invalid={$errors.dischargeDate}
				/>
				{#if $errors.dischargeDate}
					<small class="form-error">{$errors.dischargeDate}</small>
				{/if}
			{/if}
		</div>
		<div class="col-md-6">
			<label for="employementRel" class="form-label">Relación laboral</label>
			<input
				type="text"
				id="employementRel"
				name="employementRel"
				class="form-control"
				placeholder="Relación de Dependencia"
				aria-label="Relación laboral"
				readonly={isReadOnly}
				on:blur={handleChange}
				bind:value={$form.employementRel}
				class:invalid={$errors.employementRel}
			/>
			{#if $errors.employementRel}
				<small class="form-error">{$errors.employementRel}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="hiringMode" class="form-label">Modalidad de contratación</label>
			<input
				type="text"
				id="hiringMode"
				name="hiringMode"
				class="form-control"
				placeholder="A tiempo completo"
				aria-label="Modalidad de contratación"
				readonly={isReadOnly}
				on:blur={handleChange}
				bind:value={$form.hiringMode}
				class:invalid={$errors.hiringMode}
			/>
			{#if $errors.hiringMode}
				<small class="form-error">{$errors.hiringMode}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="unionAgreement" class="form-label">Convenio</label>
			<input
				type="text"
				id="unionAgreement"
				name="unionAgreement"
				class="form-control"
				placeholder="Federación Sindicatos Unidos Petroleros"
				aria-label="Relación laboral"
				readonly={isReadOnly}
				on:blur={handleChange}
				bind:value={$form.unionAgreement}
				class:invalid={$errors.unionAgreement}
			/>
			{#if $errors.unionAgreement}
				<small class="form-error">{$errors.unionAgreement}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12">
			<label for="job" class="form-label">Puesto de trabajo</label>
			<input
				type="text"
				id="job"
				name="job"
				class="form-control"
				placeholder="Técnico Vertical"
				aria-label="Puesto de trabajo"
				readonly={isReadOnly}
				on:blur={handleChange}
				bind:value={$form.job}
				class:invalid={$errors.job}
			/>
			{#if $errors.job}
				<small class="form-error">{$errors.job}</small>
			{/if}
		</div>
	</div>
	{#if !isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-6" />
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
