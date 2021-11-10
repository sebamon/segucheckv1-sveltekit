<script lang="ts">
	import { format } from 'path/posix';
	// import { createEventDispatcher, validate_store } from 'svelte/internal';
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()

	function submit() {
		dispatch('showAlert', {
			status:status,
			message:message
		})
	} 

	function showAlert() {
		dispatch('showAlert', {
			status:status,
			message:message
		})
	}
	// Datos del usuario a mostrar
	export let vehicle_id: number;
	export let domain = '';
	export let type: string;
	export let brand: string;
	export let model: string;
	export let year: number;
	export let internal_id = vehicle_id;
	export let chasisNumber = 0;
	export let motorNumber = 0;

	// Por defecto, el componente se llama como solo lectura:
	export let isReadOnly = true;

	let error: string;
	let message: string;
	let color;
	let status;

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
	const submitForm = async (): Promise<void> => {
			const submit = await fetch(`editar`,{
			method : 'PUT',
			body: JSON.stringify({
				domain,
				brand,
				model,
				type,
				year,
				internal_id,
				chasisNumber,
				motorNumber
			})
		})

		console.log('submit',submit)
			const data = await submit.json()
			console.log('data',data)
			message = data.message
			error = data.error
			if(data.status==='OK') {
					color='success'
				}
				if(data.status==='ERROR') color='danger'

				if(data.status===200)
				{
					console.log('message', message)
				}
				dispatch('showAlert', {
			status:status,
			message:message
		})
	};

</script>


<form name="formVehicleDetails" id="formVehicleDetails" on:submit|preventDefault={submitForm}>
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
				readonly={isReadOnly}
			/>
		</div>
		<div class="col-md-6">
			<label for="type" class="form-label">Tipo de vehículo</label>
			<select
				id="type"
				name="type"
				class="form-select"
				aria-label="Tipo de vehículo"
				bind:value={type}
				required
			>
				<option selected disabled >Elija una opción...</option>
				{#each vehicleTypeList as vehicleType}
					{#if type === vehicleType}
						<option value={vehicleType} selected>{vehicleType}</option>)
					{:else}
						<option value={vehicleType}>{vehicleType}</option>
					{/if}
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
				readonly={isReadOnly}
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
				readonly={isReadOnly}
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
				bind:value={year}
				readonly={isReadOnly}
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
				aria-label="Número interno"
				bind:value={internal_id}
				readonly={isReadOnly}
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
				placeholder="1980-12-31"
				aria-label="Número de chasis"
				bind:value={chasisNumber}
				readonly={isReadOnly}
			/>
		</div>
		<div class="col-md-6">
			<label for="motorNumber" class="form-label">Número de motor</label>
			<input
				type="text"
				id="motorNumber"
				name="motorNumber"
				class="form-control"
				placeholder="Argentina"
				aria-label="Número de motor"
				bind:value={motorNumber}
				readonly={isReadOnly}
			/>
		</div>

	</div>
	{#if !isReadOnly}
		<div class="row mb-3 g-3">
			<div class="col-md-6" />
			<div class="col-md-6 d-flex justify-content-end">
				<button type="submit" class="btn btn-primary">
					<i class="fas fa-pen me-2" />Confirmar cambios
				</button>
			</div>
		</div>
	{/if}
</form>
