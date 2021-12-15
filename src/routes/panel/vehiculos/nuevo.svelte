<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, Alert } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte'
	import ImgUpload from '$lib/ImgUpload.svelte'

	// Arreglo de tipo de vehículos:
	let vehicleTypeList = [
		'Aeronaves - Avión Comercial',
		'Aeronaves - Avión De Carga',
		'Aeronaves - Dron',
		'Aeronaves - Helicóptero',
		'Embarcaciones - Bote Sin Motor',
		'Embarcaciones - Lancha',
		'Embarcaciones - Semirrígido - Gomón',
		'Maquinaria Con Carreteo - Cargadora',
		'Maquinaria Con Carreteo - Equipo Especial',
		'Maquinaria Con Carreteo - Excavadora',
		'Maquinaria Con Carreteo - Grúa',
		'Maquinaria Con Carreteo - Motoniveladora',
		'Maquinaria Con Carreteo - Pala Frontal',
		'Maquinaria Con Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Con Carreteo - Retroexcavadora',
		'Maquinaria Con Carreteo - Topadora',
		'Maquinaria Con Carreteo - Tractor',
		'Maquinaria Sin Carreteo - Autoelevador - Sampi',
		'Maquinaria Sin Carreteo - Camión Guinche',
		'Maquinaria Sin Carreteo - Cargadora',
		'Maquinaria Sin Carreteo - Compactador',
		'Maquinaria Sin Carreteo - Equipo Especial',
		'Maquinaria Sin Carreteo - Excavadora',
		'Maquinaria Sin Carreteo - Grúa',
		'Maquinaria Sin Carreteo - Maquinaria',
		'Maquinaria Sin Carreteo - Motoniveladora',
		'Maquinaria Sin Carreteo - Pala Frontal',
		'Maquinaria Sin Carreteo - Pluma - Hidrogrúa',
		'Maquinaria Sin Carreteo - Retroexcavadora',
		'Maquinaria Sin Carreteo - Topadora',
		'Rodado Extranjero De Cargas Peligrosas',
		'Rodados - Acoplado',
		'Rodados - Ambulancia',
		'Rodados - Automóvil',
		'Rodados - Batea',
		'Rodados - Camión',
		'Rodados - Camión Con Hidrogrúa',
		'Rodados - Carretón',
		'Rodados - Furgón',
		'Rodados - Guinche',
		'Rodados - Minibús',
		'Rodados - Ómnibus',
		'Rodados - Pick Up - Cargas Peligrosas',
		'Rodados - Pick-Up',
		'Rodados - Semirremolque',
		'Rodados - Tanque',
		'Rodados - Tractor',
		'Rodados - Tráiler',
		'Rodados Cargas Peligrosas - Acoplado Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Camión Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Semirremolque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tanque Cargas Peligrosas',
		'Rodados Cargas Peligrosas - Tractor Cargas Peligrosas'
	];

	let formVehicleDetails;
	let domain: string;
	let brand: string;
	let model: string;
	let type: string;
	let year: number;
	let internNumber: number;
	let chasisNumber: string;
	let motorNumber: string;
	let frontPic: string;
	let rightSidePic: string;
	let leftSidePic : string;
	let fileName: string;
	let fileExtension: string;
	let filesPath: string;

	let status: string;
	let message: string;

	function cleanPage() {
		$form.domain = '';
		$form.brand = '';
		$form.model = '';
		$form.type = '';
		$form.year = '';
		$form.internNumber = '';
		$form.chasisNumber = '';
		$form.motorNumber = '';
		$form.frontPic = '';
		$form.rightSidePic = '';
		$form.leftSidePic = '';
	}

	// Validación de formularios: https://svelte-forms-lib-sapper-docs.vercel.app/
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import es from 'yup-es';
	yup.setLocale(es);
	let regexAZNum = /^[A-Z0-9]+$/i;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			domain: '',
			brand: '',
			model: '',
			type: '',
			year: '',
			internNumber: '',
			chasisNumber: '',
			motorNumber: '',
			frontPic: '',
			rightSidePic: '',
			leftSidePic: ''
		},
		validationSchema: yup.object().shape({
			domain: yup
				.string()
				.max(7, 'Este campo debe ser de hasta ${max} caracteres')
				.matches(regexAZNum, `Este campo solo permite letras y números, sin símbolos.`)
				.required('Debes completar este campo.'),
			brand: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			model: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			type: yup
				.string()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.oneOf(vehicleTypeList, 'El tipo no se encuentra en el listado.')
				.required('Debes completar este campo.'),
			year: yup
				.number()
				.min(1900, 'El año es demasiado bajo.')
				.max(9999, 'El año es demasiado alto.')
				.integer("El número debe ser entero.")
				.required('Debes completar este campo.'),
			internNumber: yup
				.number()
				.max(190, 'Este campo debe ser de hasta ${max} caracteres.')
				.required('Debes completar este campo.'),
			chasisNumber: yup
				.string()
				.min(11, 'Este campo debe ser al menos ${max} caracteres.')
				.max(17, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
				.required('Debes completar este campo.'),
			motorNumber: yup
				.string()
				.max(15, 'Este campo debe ser de hasta ${max} caracteres.')
				.matches(regexAZNum, 'Este campo solo permite letras y números, sin símbolos.')
		}),
		onSubmit: async (values) => {
			values.frontPic = `${fileName}.${fileExtension}`;
			console.log(JSON.stringify(values));
			// formVehicleDetails = document.getElementById('formVehicleDetails');
		try {
			const submit = await fetch('vehiculos', {
				method: 'POST',
				body: JSON.stringify({
					values
				})
			});
			const data = await submit.json();
			message = data.message;
			status = data.status;

			if (status === 'NEW') {
				cleanPage();
			}

		} catch (err) {
			throw new Error();
		}
		}
	});

	export function captureImage(e){
		console.log('captureImage',e);
		let name = e.detail.name
		fileName = e.detail.fileName
		fileExtension = e.detail.fileExtension
		filesPath = e.detail.filesPath
		if(name === 'frontPic'){
			frontPic = `${e.detail.fileName}.${e.detail.fileExtension}`;
		}
		if(name === 'leftPic'){
			leftSidePic = `${e.detail.fileName}.${e.detail.fileExtension}`;
		}
		if(name === 'rightPic'){
			rightSidePic = `${e.detail.fileName}.${e.detail.fileExtension}`;
		}				
		//subir(fileName, fileExtension, filesPath)
		console.log('Dentro de captureImage(e) file: ' + fileName + ', fileExt: ' + fileExtension );
	}
const subir = async(fileName, fileExtension, filesPath) => {

	console.log('entrando al subir. FileName: ' + fileName + ', FileExtension: ' + fileExtension);
	try{

		let url = '../../../api/driveSet';
		let fileData = {
			fileName: fileName,
			fileExtension: fileExtension,
			filesPath : filesPath
		};
		console.log('subir file fileData',fileData)
		let response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(fileData)
		});
		
		console.log(response)
		const data = await response.json()
		
		console.log('la imagen subida: ',data)
		let fileId = {
			fileId: data.id,
		};
		console.log('fileID',fileId)
		// let urlId = 'http://localhost:3000/api/driveGet';
		// let responseId = await fetch(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(fileId)
		// });
		// const dataId = await responseId.json()
		// console.log('Mi link para compartir: ' + JSON.parse(dataId));
		// profilePic = JSON.parse(dataId);
	}catch(e){
		console.log(e)
		return 'Sin Datos'
	}
}
</script>

<svelte:head>
	<title>Nuevo vehículo - SeguCheck</title>
</svelte:head>
<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/vehiculos">Vehículos</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-car me-4" />Nuevo vehículo</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

{#if status}
	<SeguAlert {message} {status} path='vehiculos' />
{/if}

<!-- Formulario nuevo usuario -->
<form
	name="formVehicleDetails"
	id="formVehicleDetails"
	on:submit|preventDefault={handleSubmit}
	bind:this={formVehicleDetails}
>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="name" class="form-label">Patente</label>
			<input
				type="text"
				id="domain"
				name="domain"
				class="form-control"
				placeholder="AB123CD"
				aria-label="Patente"
				bind:value={$form.domain}
				on:blur={handleChange}
				class:invalid={$errors.domain}
			/>
			{#if $errors.domain}
				<small class="form-error">{$errors.domain}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="type" class="form-label">Tipo de vehículo</label>
			<select
				id="type"
				class="form-select"
				aria-label="Tipo de vehículo"
				bind:value={type}
				on:blur={handleChange}
				class:invalid={$errors.type}
			>
				<option selected disabled>Elija una opción...</option>
				{#each vehicleTypeList as vehicleType}
					<option value={vehicleType}>{vehicleType}</option>
				{/each}
			</select>
			{#if $errors.type}
				<small class="form-error">{$errors.type}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="brand" class="form-label">Marca</label>
			<input
				type="text"
				id="brand"
				name="brand"
				class="form-control"
				placeholder="Ford"
				aria-label="Marca"
				bind:value={$form.brand}
				on:blur={handleChange}
				class:invalid={$errors.brand}
			/>
			{#if $errors.brand}
				<small class="form-error">{$errors.brand}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="model" class="form-label">Modelo</label>
			<input
				type="text"
				id="model"
				name="model"
				class="form-control"
				placeholder="Ranger"
				aria-label="Modelo"
				bind:value={$form.model}
				on:blur={handleChange}
				class:invalid={$errors.model}
			/>
			{#if $errors.model}
				<small class="form-error">{$errors.model}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="year" class="form-label">Año</label>
			<input
				type="number"
				id="year"
				name="year"
				class="form-control"
				placeholder="2015"
				aria-label="Año"
				bind:value={$form.year}
				on:blur={handleChange}
				class:invalid={$errors.year}
			/>
			{#if $errors.year}
				<small class="form-error">{$errors.year}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="internNumber" class="form-label">Número interno</label>
			<input
				type="text"
				id="internNumber"
				name="internNumber"
				class="form-control"
				placeholder="001234"
				aria-label="Número interno"
				bind:value={$form.internNumber}
				on:blur={handleChange}
				class:invalid={$errors.internNumber}
			/>
			{#if $errors.internNumber}
				<small class="form-error">{$errors.internNumber}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<label for="chasisNumber" class="form-label">Número de chasis</label>
			<input
				type="text"
				id="chasisNumber"
				name="chasisNumber"
				class="form-control"
				placeholder="1214161820"
				aria-label="Número de chasis"
				value={$form.chasisNumber}
				on:blur={handleChange}
				class:invalid={$errors.chasisNumber}
			/>
			{#if $errors.chasisNumber}
				<small class="form-error">{$errors.chasisNumber}</small>
			{/if}
		</div>
		<div class="col-md-6">
			<label for="motorNumber" class="form-label">Número de motor</label>
			<input
				type="text"
				id="motorNumber"
				name="motorNumber"
				class="form-control"
				placeholder="2356891256"
				aria-label="Número de motor"
				value={$form.motorNumber}
				on:blur={handleChange}
				class:invalid={$errors.motorNumber}
			/>
			{#if $errors.motorNumber}
				<small class="form-error">{$errors.motorNumber}</small>
			{/if}
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-12 col-lg-12">
			<div class="mb-2">
				<label for="frontPic" class="form-label">Foto del frente</label>
				<ImgUpload filesPath={'./img/vehicle-pics'}
				on:loadImage={captureImage}
				name={'frontPic'}/>
			</div>
			<!-- <div class="mb-2">
				<label for="leftSidePic" class="form-label">Foto del lado izquierdo</label>
				<ImgUpload filesPath={'./img/vehicle-pics'}
				on:loadImage={captureImage}
				name={'leftSidePic'}/>
			</div>
			<div class="mb-2">
				<label for="rigthSidePic" class="form-label">Foto del lado derecho</label>
				<ImgUpload filesPath={'./img/vehicle-pics'}
				on:loadImage={captureImage}
				name={'rigthSidePic'}/>
			</div> -->
		</div>
		<div class="col-md-6 d-flex justify-content-end">
			<button type="submit" class="btn btn-primary" disabled={!$isValid}>
				{#if $isSubmitting}
					<i class="fas fa-spinner fa-pulse me-2" />Enviando...
				{:else}
					<i class="fas fa-plus me-2" />Crear
				{/if}
			</button>
		</div>
	</div>
</form>
