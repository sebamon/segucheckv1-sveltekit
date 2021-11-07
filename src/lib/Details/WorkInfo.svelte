<script lang="ts">
	// Validar formulario: https://github.com/noahsalvi/svelte-use-form
	import { useForm, Hint, HintGroup, validators, minLength, maxLength, required } from 'svelte-use-form';
	const form = useForm();

	// Datos laborales a mostrar
	export let user_id = 1;
	export let dischargeDate = new Date();
	export let employementRel = '';
	export let hiringMode = '';
	export let unionAgreement = '';
	export let job = '';

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;
</script>

<form name="formUserWorkInfo" id="formUserWorkInfo" use:form>
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
					value={dischargeDate.toLocaleDateString()}
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
					bind:value={dischargeDate}
					readonly={isReadOnly}
				/>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="employementRel" class="form-label">Relación laboral</label>
			<input
				type="text"
				id="employementRel"
				name="employementRel"
				class="form-control"
				placeholder="Texas"
				aria-label="Relación laboral"
				value={employementRel}
				readonly={isReadOnly}
				use:validators={[required, minLength(5), maxLength(190)]}
			/>
			<HintGroup for="employementRel">
				<Hint on="required">Completa este campo</Hint>
				<Hint on="minLength" let:value>
                    Este campo requiere al menos {value} caracteres de largo
                </Hint>
				<Hint on="maxLength" let:value>
                    El texto no debe exceder los {value} caracteres de largo
                </Hint>
			</HintGroup>
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
				value={hiringMode}
				readonly={isReadOnly}
			/>
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
				value={unionAgreement}
				readonly={isReadOnly}
			/>
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
				value={job}
				readonly={isReadOnly}
			/>
		</div>
	</div>
	{#if !isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-6" />
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" disabled={!$form.valid}>
					<i class="fas fa-pen me-2" />Confirmar cambios
				</button>
			</div>
		</div>
	{/if}
</form>

<style>
    /* Svelte-use-form: Resaltar en rojo los campos inválidos*/
	:global(.touched:invalid) {
		border-color: #FF835D;
		outline-color: #FF835D;
	}
</style>