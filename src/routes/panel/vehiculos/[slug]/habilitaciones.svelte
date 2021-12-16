<!-- 

	Se envía al endpoint lo siguiente:
	{
   		"documentType":"{\"documentType_id\":4,\"description\":\"Certificado de Estanqueidad e Inspección Ocular\"}",
   		"document":"00483bad-c148-49c7-9745-cdea28201cf1.pdf",
   		"expirationDate":"2021-12-17"
	}
	
 -->
<script lang="ts">
	import VehicleDetails from '$lib/Details/VehicleDetails.svelte';
	import VehicleDocDetails from '$lib/Details/VehicleDocDetails.svelte';

	import PdfUpload from '$lib/PdfUpload.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, Alert } from 'sveltestrap';

	/* export let data;
	export let userDetails=data.userDetails
	let color = 'success' */

	// Datos placeholder:
	// let vehicleDetails = {
	// 	vehicle_id: 1,
	// 	domain: 'Juan',
	// 	model: 'Perez',
	// 	brand: 'Perez'
	// };
	let documentTypeList = [
		{ documentType_id: 1, description: 'Seguro del Automotor' },
		{ documentType_id: 2, description: 'Verificación Técnica Vehicular' },
		{ documentType_id: 3, description: 'Cédula Verde' },
		{ documentType_id: 4, description: 'Certificado de Estanqueidad e Inspección Ocular' },
		{ documentType_id: 5, description: 'Certificado de Secretaría de Energía de la Nación' },
		{ documentType_id: 6, description: 'Habilitación Provincial de Transporte de Pasajeros' },
		{ documentType_id: 7, description: 'Habilitación Nacional de Transporte de Pasajeros (CNRT)' }
	];
	let isReadOnly = false; // Configurar componente AddressDetails para editar
	let fileName, fileExtension, readyToUpload; // Controles globales
	let disabled = true;
	let document, documentTypeSelected, expirationDate;

	export function captureDocument(e) {
		console.log('captureImage', e.detail);
		fileName = e.detail.fileName;
		fileExtension = e.detail.fileExtension;
		disabled = !e.detail.readyToUpload;
		document = `${fileName}.${fileExtension}`;

		// setTimeout(()=>{
		//subir(fileName, fileExtension)
		// }, 6000);
		console.log('file: ' + fileName + ', fileExt: ' + fileExtension + ', document: ' + document);
	}

	const handleSubmit = async () => {
		// // Realiza la carga de datos al cliquear Enviar
		let values = {
			documentType: '',
			document: '',
			expirationDate: ''
		};
		let error, message, status;

		values.documentType = JSON.stringify(documentTypeList[documentTypeSelected - 1]);
		values.document = document;
		values.expirationDate = expirationDate;
		try {
			const submit = await fetch('../vehiculos', {
				method: 'POST',
				body: JSON.stringify({
					values
				})
			});
			console.log('Antes de mandar: ', JSON.stringify(values));
			const data = await submit.json();
			message = data.message;
			status = data.status;
			console.log(message, status);
		} catch (err) {
			error = err;
		}
	};
</script>

<svelte:head>
	<title>Nueva habilitación - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/vehiculos">Vehículos</a>
		</BreadcrumbItem>
		<!-- <BreadcrumbItem>
			<a href="/panel/vehiculos/{vehicleDetails.vehicle_id}">{vehicleDetails.vehicle_id}</a>
		</BreadcrumbItem> -->
		<BreadcrumbItem active>Habilitaciones</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-paperclip me-4" />Nueva habilitación</h1>
	<p class="lead">Indique los detalles a continuación.</p>
</header>

<main>
	<form name="formUserDoc" id="formUserDoc" on:submit|preventDefault={handleSubmit}>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="documentType" class="form-label">Tipo de documento</label>
				<select
					id="documentType"
					class="form-select"
					aria-label="Tipo de documento"
					bind:value={documentTypeSelected}
					required
				>
					<option disabled selected>Elija una opción...</option>
					{#each documentTypeList as documentType}
						<option value={documentType.documentType_id}>
							{documentType.description}
						</option>
					{/each}
				</select>
			</div>
			<div class="col-md-6">
				<label for="expirated_at" class="form-label">Vencimiento</label>
				<input
					type="date"
					id="expirated_at"
					name="expirated_at"
					class="form-control"
					aria-label="Vencimiento"
					bind:value={expirationDate}
					required
				/>
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col-md-6">
				<label for="urlPdf" class="form-label">Adjunto</label>
				<!-- Acepta documentos, planillas, presentaciones, imágenes y sus variantes libres-->
				<!-- <input
					class="form-control"
					type="file"
					accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
				application/vnd.oasis.opendocument.text, 
				application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
				application/vnd.oasis.opendocument.spreadsheet
				application/vnd.ms-powerpoint, pplication/vnd.openxmlformats-officedocument.presentationml.slideshow, 
				application/vnd.openxmlformats-officedocument.presentationml.presentation, 
				application/vnd.oasis.opendocument.presentation,
				text/plain, application/vnd.oasis.opendocument.text
				application/pdf, image/*"
					id="urlPdf"
					required
				/> -->
				<PdfUpload on:loadDocument={captureDocument} />
			</div>
		</div>
		<div class="row mb-3 g-3">
			<div class="col" />
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary" {disabled}>
					<i class="fas fa-plus me-2" />Subir archivo
				</button>
			</div>
		</div>
	</form>
</main>
