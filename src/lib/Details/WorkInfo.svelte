<script lang="ts">
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

<form name="formUserWorkInfo" id="formUserWorkInfo">
    {#if isReadOnly}
    <div class="hstack gap-3">
        <h2 class="my-4">Datos laborales</h2>
		<div class="ms-auto">
			<a class="btn btn-primary" href="/panel/usuarios/{user_id}/laborales">
				<i class="fas fa-pen me-2" />Editar
			</a>
		</div>
	</div>
    {/if}
    <div class="row mb-3 g-3">
        <div class="col-md-6">
            <label for="dischargeDate" class="form-label">Fecha de alta</label>
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
            />
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
</form>