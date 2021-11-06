<script lang="ts">
	// Datos de los domicilios a mostrar
	export let user_id = 1;

	export let countryOfOrigin = "";
    export let stateOfOrigin =  "";
    export let cityOfOrigin =  "";
    export let zipCodeOfOrigin =  0;
    export let addressOfOrigin =  "";
    export let phoneOfOrigin =  "";
    export let countryOfResidence =  "";
    export let stateOfResidence =  "";
    export let cityOfResidence =  "";
    export let zipCodeOfResidence =  0;
    export let addressOfResidence =  "";
    export let phoneOfResidence =  "";

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;
</script>

<form name="formUserAddress" id="formUserAddress">
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
                    value={countryOfOrigin}
                    readonly={isReadOnly}
                />
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
                    value={stateOfOrigin}
                    readonly={isReadOnly}
                />
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
                    value={cityOfOrigin}
                    readonly={isReadOnly}
                />
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
                    value={zipCodeOfOrigin}
                    readonly={isReadOnly}
                />
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
                    value={addressOfOrigin}
                    readonly={isReadOnly}
                />
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
                    value={phoneOfOrigin}
                    readonly={isReadOnly}
                />
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
                    placeholder="Estados Unidos"
                    aria-label="País"
                    value={countryOfResidence}
                    readonly={isReadOnly}
                />
            </div>
            <div class="col-md-6">
                <label for="stateOfResidence" class="form-label">Provincia / Estado</label>
                <input
                    type="text"
                    id="stateOfResidence"
                    name="stateOfResidence"
                    class="form-control"
                    placeholder="Texas"
                    aria-label="Provincia / Estado"
                    value={stateOfResidence}
                    readonly={isReadOnly}
                />
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
                    placeholder="Houston"
                    aria-label="Localidad"
                    value={cityOfResidence}
                    readonly={isReadOnly}
                />
            </div>
            <div class="col-md-6">
                <label for="zipCodeOfOrigin" class="form-label">Código postal</label>
                <input
                    type="text"
                    id="zipCodeOfResidence"
                    name="zipCodeOfResidence"
                    class="form-control"
                    placeholder="77001"
                    aria-label="Código postal"
                    value={zipCodeOfResidence}
                    readonly={isReadOnly}
                />
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
                    placeholder="6815 Eastwood St."
                    aria-label="Dirección"
                    value={addressOfResidence}
                    readonly={isReadOnly}
                />
            </div>
            <div class="col-md-6">
                <label for="phoneOfResidence" class="form-label">Teléfono</label>
                <input
                    type="text"
                    id="phoneOfResidence"
                    name="phoneOfResidence"
                    class="form-control"
                    placeholder="+1-281-555-0185"
                    aria-label="Teléfono"
                    value={phoneOfResidence}
                    readonly={isReadOnly}
                />
            </div>
        </div>
    </section>
    {#if !isReadOnly}
	<div class="row mb-3 g-3">
        <div class="col"></div>
        <div class="col-md-6 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-pen me-2" />Confirmar cambios
            </button>
        </div>
	</div>
    {/if}
</form>