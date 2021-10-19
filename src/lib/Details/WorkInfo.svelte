<script lang="ts">
	// Datos de los domicilios a mostrar
	export let dischargeDate = new Date();
	export let employementRel = '';
	export let hiringMode = '';
	export let unionAgreement = '';
	export let job = '';
</script>

<form name="formUserWorkInfo" id="formUserWorkInfo">
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
            />
        </div>
    </div>
</form>