<script lang="ts">
	// ./ver/index.svelte: Mostrar información del operario, acceso invitado

	import { TabContent, TabPane, Modal } from 'sveltestrap';
	import DocDetails from '$lib/Details/DocDetails.svelte';
	import NavbarHome from '$lib/NavbarHome.svelte';

	// Abrir modal para ver foto:
	let modalProfile = false;
	const toggle = () => (modalProfile = !modalProfile);

	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	let userDetails = {
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez',
		profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg'
	};
	let userDocumentation = [
		{
			documentation_id: 10,
			documentType: { documentType_id: 1, description: 'Certificación para Trabajo en Altura' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 1',
			created_at: new Date('2021-10-31'),
			updated_at: new Date('2021-11-31'),
			expirated_at: new Date('2021-12-31')
		},
		{
			documentation_id: 15,
			documentType: { documentType_id: 2, description: 'Carnet de Manejo Defensivo' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 2',
			created_at: new Date('2021-08-31'),
			updated_at: new Date('2021-08-31'),
			expirated_at: new Date('2021-09-31')
		}
	];
	let userWorkInfo = {
		company: 'Empresa cualquiera',
		job: 'Técnico Vertical'
	};
	let vehicleDetails = {
		domain: 'AB123CD',
		type: '43',
		brand: 'Ford',
		model: 'Ranger',
		year: 2015
	};
	let vehicleDocumentation = [
		{
			documentation_id: 20,
			documentType: { documentType_id: 5, description: 'Verificación Técnica Vehicular' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 1',
			created_at: new Date('2021-10-31'),
			updated_at: new Date('2021-11-31'),
			expirated_at: new Date('2021-12-31')
		},
		{
			documentation_id: 25,
			documentType: { documentType_id: 6, description: 'Registro Único Transporte Automotor' },
			urlPdf: '/docs/doc-placeholder.pdf',
			status: 'Estado 2',
			created_at: new Date('2021-08-31'),
			updated_at: new Date('2021-08-31'),
			expirated_at: new Date('2021-09-31')
		}
	];

	function docValid(arrayDoc) {
        /* Método para evaluar cada documento vigente del usuario y vehículo
        @param arrayDoc: Arreglo de objetos
        @return boolean
        */
        let isUpdated = true;
        let actualDate = new Date();
        for (const thisDoc of arrayDoc) {
            if (thisDoc.expirated_at < actualDate) {
                isUpdated = false;
                break;
            }
        }
		return isUpdated;
	};

    let userValid = docValid(userDocumentation);
    let vehicleValid = docValid(userDocumentation);
    let allValid = userValid && vehicleValid;
</script>

<!-- Menú de navegación -->
<NavbarHome />

<div class="container p-4 shadow-lg">
	<header class="row justify-content-around align-items-center">
		<div class="col-4">
			<img
				src={userDetails.profilePic}
				class="img-fluid img-thumbnail m-2"
				alt="Foto de perfil"
				style="max-width:150px"
				on:click={toggle}
			/>
			<Modal
				isOpen={modalProfile}
				{toggle}
				body
				header={userDetails.firstName + ' ' + userDetails.lastName}
			>
				<img
					src={userDetails.profilePic}
					class="img-fluid"
					alt="Foto de perfil"
					on:click={toggle}
				/>
			</Modal>
		</div>
		<div class="col-auto text-center">
			<h1>{userDetails.lastName + ', ' + userDetails.firstName}</h1>
			{#if allValid }
				<p class="lead text-success">
					<i class="fas fa-check-circle me-2" />Toda la documentación está al día
				</p>
			{:else}
				<p class="lead text-danger"><i class="fas fa-times-circle me-2" />Hay documentación vencida</p>
			{/if}
		</div>
	</header>
	<main>
		<TabContent>
			<TabPane tabId="userDetails" tab="Datos del operario" active>
				<h3 class="my-4"><i class="fas fa-user me-4" />Datos básicos</h3>
				<form>
					<div class="row mb-3 g-3">
						<div class="col-6 col-lg-3">
							<label for="firstName" class="form-label">CUIT</label>
							<input id="firstName" class="form-control" value={userDetails.cuit} readonly />
						</div>
						<div class="col-6 col-lg-3">
							<label for="lastName" class="form-label">Nombre completo</label>
							<input
								id="lastName"
								class="form-control"
								value={userDetails.firstName + ' ' + userDetails.lastName}
								readonly
							/>
						</div>
						<div class="col-6 col-lg-3">
							<label for="company" class="form-label">Empresa</label>
							<input id="company" class="form-control" value={userWorkInfo.company} readonly />
						</div>
						<div class="col-6 col-lg-3">
							<label for="job" class="form-label">Cargo</label>
							<input id="job" class="form-control" value={userWorkInfo.job} readonly />
						</div>
					</div>
					<div class="row mb-3 g-3" />
				</form>
				<hr />
                <h3 class="my-4" class:text-sucess={userValid} class:text-danger={!userValid}><i class="fas fa-paperclip me-4" />Habilitaciones</h3>
				{#if userDocumentation.length == 0}
					<div class="alert alert-warning" role="alert">
						<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta
						ahora.
					</div>
				{:else}
					<div class="row g-3">
						{#each userDocumentation as thisDoc}
							<DocDetails {...thisDoc} />
						{/each}
					</div>
				{/if}
			</TabPane>
			<TabPane tabId="vehicleDetails" tab="Datos del vehículo">
				<h3 class="my-4"><i class="fas fa-car me-4" />Datos básicos</h3>
				<form>
					<div class="row mb-3 g-3">
						<div class="col-6 col-lg-3">
							<label for="domain" class="form-label">Patente</label>
							<input id="domain" class="form-control" value={vehicleDetails.domain} readonly />
						</div>
						<div class="col-6 col-lg-3">
							<label for="type" class="form-label">Tipo de vehículo</label>
							<input id="type" class="form-control" value={vehicleDetails.type} readonly />
						</div>
						<div class="col-6 col-lg-3">
							<label for="brand" class="form-label">Marca</label>
							<input id="brand" class="form-control" value={vehicleDetails.brand} readonly />
						</div>
						<div class="col-6 col-lg-3">
							<label for="model" class="form-label">Modelo</label>
							<input id="model" class="form-control" value={vehicleDetails.model} readonly />
						</div>
					</div>
					<div class="row mb-3 g-3" />
				</form>
				<hr />
				<h3 class="my-4" class:text-sucess={vehicleValid} class:text-danger={!vehicleValid}><i class="fas fa-paperclip me-4" />Habilitaciones</h3>
                {#if vehicleDocumentation.length == 0}
					<div class="alert alert-warning" role="alert">
						<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta
						ahora.
					</div>
				{:else}
					<div class="row g-3">
						{#each vehicleDocumentation as thisDoc}
							<DocDetails {...thisDoc} />
						{/each}
					</div>
				{/if}
			</TabPane>
		</TabContent>
	</main>
</div>
