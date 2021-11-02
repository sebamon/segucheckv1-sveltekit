<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem
	} from 'sveltestrap';

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
	
	let form
	let vehicle_id : number
	let domain : string
	let brand : string 
	let model : number
	let type : string
	let year : number
	let intNumber : number
	let chasis : string
	let motor : string
	let frontPic:FileReader
	let rightSidePic:ImageData
	let leftSidePic=[]

	const submitForm = async ():Promise<any> => {
		console.log(form)
		debugger
		try{
			const submit = await fetch('vehiculos', {
				method : "POST",
				body: new FormData(form),
				headers: {
					'Contex-Type' :'application/json',
				}
			})
			const data = await submit.json()
			console.log('data', data)
			onmessage = data.message
			// status = data.status

			// 	if(data.status==='OK') {
			// 		cleanPage();
			// 	}
			// 	color = data.status==='OK' ? 'success' : 'danger'

			// 	if(data.status===200){
			// 		console.log('message', message)
			// 	}
		}catch(err)
		{
			throw new Error
		}
	};

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

<!-- Formulario nuevo usuario -->
<form name="formVehicleDetails" id="formVehicleDetails" on:submit|preventDefault="{submitForm}" bind:this={form}>
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
				bind:value={domain}
				required
			/>
		</div>
		<div class="col-md-6">
			<label for="type" class="form-label">Tipo de vehículo</label>
			<select id="type" class="form-select" aria-label="Tipo de vehículo" bind:value={type} required>
				<option selected disabled>Elija una opción...</option>
				{#each vehicleTypeList as vehicleType, i}
					<option value={i}>{vehicleType}</option>
				{/each}
			</select>
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
				bind:value={brand}
				required
			/>
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
				bind:value={model}
				required
			/>
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
				min="1950"
				max="9999"
				step="1"
				bind:value={year}
				required
			/>
		</div>
		<div class="col-md-6">
			<label for="internal_id" class="form-label">Número interno</label>
			<input
				type="text"
				id="internal_id"
				name="internal_id"
				class="form-control"
				placeholder="001234"
				bind:value={intNumber}
				aria-label="Número interno"
			/>
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
				bind:value={chasis}
			/>
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
				bind:value={motor}
			/>
		</div>
	</div>
	<div class="row mb-3 g-3">
		<div class="col-md-6">
			<div class="mb-3">
				<label for="frontPic" class="form-label">Foto del frente</label>
				<input class="form-control" type="file" id="frontPic"/>
			</div>
			<div class="mb-3">
				<label for="leftSidePic" class="form-label">Foto del lado izquierdo</label>
				<input class="form-control" type="file" id="leftSidePic" bind:value={leftSidePic} />
			</div>
			<div class="mb-3">
				<label for="rigthSidePic" class="form-label">Foto del lado derecho</label>
				<input class="form-control" type="file" id="rigthSidePic" />
			</div>
		</div>
		<div class="col-md-6 d-flex justify-content-end">
			<Button type="submit" color="primary">
				<i class="fas fa-plus me-2" />Crear
			</Button>
		</div>
	</div>
</form>
