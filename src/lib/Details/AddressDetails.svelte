<script lang="ts">
	// Datos de los domicilios a mostrar
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
</script>

<form name="formUserAddress" id="formUserAddress">
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
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
                    readonly
                />
            </div>
        </div>
    </section>
</form>