<script context="module">
    /* Configurar!
	export async function load({fetch , page}){
		const response = await fetch(`./${page.params.slug}/detalle.json`, {
			method: "GET",
			request: page.params.slug
		})
		const data  = await response.json()
		return {
			props:{
				data,
			}	
		}
	}
    */
</script>

<script lang="ts">
import { dataset_dev } from 'svelte/internal';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Breadcrumb,
		BreadcrumbItem,
		Alert
	} from 'sveltestrap';

	/* export let data;
	export let userDetails=data.userDetails
	let color = 'success' */
	
    // Datos placeholder:
	let userDetails = {
		user_id: 1234,
		firstName: 'Juan',
		lastName: 'Perez'
	};
    let documentTypeList = [
        { documentType_id: 1, description: 'Certificación para Trabajo en Altura' },
        { documentType_id: 2, description: 'Carnet de Manejo Defensivo' }
    ];

	// Configurar componente AddressDetails para editar
	let isReadOnly = false;

</script>

<svelte:head>
	<title>Nueva habilitación: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/{userDetails.user_id}">{userDetails.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Habilitaciones</BreadcrumbItem>
	</Breadcrumb>
    <h1><i class="fas fa-paperclip me-4" />Nueva habilitación</h1>
    <p class="lead">Indique los detalles a continuación.</p>
</header>

<form name="formUserDoc" id="formUserDoc">
    <div class="row mb-3 g-3">
        <div class="col-md-6">
            <label for="documentType" class="form-label">Tipo de documento</label>
            <select id="documentType" class="form-select" aria-label="Tipo de documento" required>
                <option disabled selected>Elija una opción...</option>
                {#each documentTypeList as documentType}
                    <option value={documentType.documentType_id}>
                        {documentType.description}
                    </option>
                {/each}
            </select>
        </div>
        <div class="col-md-6">
			<label for="urlPdf" class="form-label">Adjunto</label>
			<input class="form-control" type="file" id="urlPdf" required/>
		</div>
    </div>
    <div class="row mb-3 g-3">
        <div class="col-md-6">
            <label for="expirated_at" class="form-label">Vencimiento</label>
            <input
                type="date"
                id="expirated_at"
                name="expirated_at"
                class="form-control"
                aria-label="Vencimiento"
                required
            />
        </div>
    </div>
	<div class="row mb-3 g-3">
        <div class="col"></div>
        <div class="col-md-6 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-plus me-2" />Subir archivo
            </button>
        </div>
	</div>
</form>