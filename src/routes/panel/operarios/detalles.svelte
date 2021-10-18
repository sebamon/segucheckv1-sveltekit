<script lang="ts">
	// Importar secciones de detalles:
	import UserDetails from '$lib/Details/UserDetails.svelte';
	import DocDetails from '$lib/Details/DocDetails.svelte';
	import AddressDetails from '$lib/Details/AddressDetails.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		TabContent,
		TabPane,
		Image,
		Accordion,
		AccordionItem
	} from 'sveltestrap';

	// Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	let userDetails = {
		user_id: 1234,
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez',
		email: 'juan.perez@ejemplo.com',
		phone: '2993334444',
		gender: 'M',
		dateOfBirth: '1980-12-31',
		nationality: 'Argentina',
		studyLevel: 'Universitario completo',
		degree: 'Licenciado',
		profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg',
		roles: [
			{ rol_id: 1, rolDescription: 'Gestor documental' },
			{ rol_id: 2, rolDescription: 'Personal de seguridad' }
		]
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
	/* Para componente:
		export let stateOfOrigin: "",
		export let cityOfOrigin: "",
		export let zipCodeOfOrigin: 0,
		export let phoneOfOrigin: "",
		export let addressOfOrigin: "",
		export let countryOfResidence: "",
		export let stateOfResidence: "",
		export let cityOfResidence: "",
		export let zipCodeOfResidence:0,
		export let addressOfResidence: "",
  */
	let userWorkInfo = {};
	let userAddress = {
		countryOfOrigin: 'Estados Unidos',
		stateOfOrigin: 'Texas',
		cityOfOrigin: 'Houston',
		zipCodeOfOrigin: 77001,
		addressOfOrigin: '6815 Eastwood St.',
		phoneOfOrigin: '+1-281-555-0185',
		countryOfResidence: 'Argentina',
		stateOfResidence: 'Neuquén',
		cityOfResidence: 'Rincón de los Sauces',
		zipCodeOfResidence: 8319,
		addressOfResidence: 'Roca 893',
		phoneOfResidence: '299-412-3469'
	};
	let userHealthInfo = {};
</script>

<svelte:head>
	<title>Operario: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-md-3">
		<Image
			fluid
			thumbnail
			src={userDetails.profilePic}
			alt="Foto de perfil"
			class="m-2"
			style="max-width:150px"
		/>
	</div>
	<div class="col-auto">
		<h1>{userDetails.firstName + ' ' + userDetails.lastName}</h1>
		<p class="lead">Detalles del operario</p>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/operarios/editar">
			<i class="fas fa-pen me-2" />Editar
		</Button>
	</div>
</header>

<main>
	<TabContent>
		<TabPane tabId="userDetails" tab="Datos básicos" active>
			<!-- Datos básicos -->
			<h2 class="my-4">Datos básicos</h2>
			<UserDetails {...userDetails} />
		</TabPane>
		<TabPane tabId="habilitaciones" tab="Habilitaciones">
			<h2 class="my-4">Habilitaciones</h2>
			{#if userDocumentation.length == 0}
				<div class="alert alert-warning" role="alert">
					<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta ahora.
					Haz click en Editar para subir archivos.
				</div>
			{:else}
				<div class="row g-3">
					{#each userDocumentation as thisDoc}
						<Accordion stayOpen class="col-md-6">
							<AccordionItem header={thisDoc.documentType.description}>
								<DocDetails {...thisDoc} />
							</AccordionItem>
						</Accordion>
					{/each}
				</div>
			{/if}
		</TabPane>
		<TabPane tabId="userWorkInfo" tab="Datos laborales">
			<h2 class="my-4">Datos laborales</h2>
		</TabPane>
		<TabPane tabId="userAddress" tab="Domicilios">
			<h2 class="my-4">Domicilios</h2>
			<AddressDetails {...userAddress} />
		</TabPane>
		<TabPane tabId="userHealthInfo" tab="Datos médicos">
			<h2 class="my-4">Datos laborales</h2>
		</TabPane>
	</TabContent>
</main>
