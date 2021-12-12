<script context="module">
	export async function load({page,fetch}){
		
		const response = await fetch(`./${page.params.slug}/detalle`)

		const data = await response.json()

		// let data = await Promise.all([
		// 	fetch(`http://localhost:3000/panel/operarios/${page.params.slug}/detalle`),
		// 	// fetch(`http://localhost:3000/panel/locaciones/locaciones`),
		// 	// fetch(`http://localhost:3000/panel/vehiculos/vehiculos`),
		// ])
		// .then(async(result) => {
		// 	const userData = await result[0].json()
		// 	// const locationList = await result[1].json()
		// 	// const vehiclesList = await result[2].json()
		// 	console.log('La user data',userData)
		// 	// console.log('La locacion',locationList)
		// 	return {userData}
		// 	// return {userData , locationList, vehiclesList}
		// })


		return {
			props: {
				data
			}
		}
	}
</script>

<script lang="ts">
	// Importar secciones de detalles:
	import UserDetails from '$lib/Details/UserDetails.svelte';
	import DocDetails from '$lib/Details/DocDetails.svelte';
	import WorkInfo from '$lib/Details/WorkInfo.svelte';
	import AddressDetails from '$lib/Details/AddressDetails.svelte';
	import HealthInfo from '$lib/Details/HealthInfo.svelte';

	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	
	export let data

	console.log('sueperererer workinfo', data)
	export let userDetails = data.workInfo.users
	
		
		// Info usuario placeholder (esto lo recibe del servidor en estructura similar):
	// 	let userDetails = {
	// 	user_id: 1234,
	// 	cuit: 20301001008,
	// 	firstName: 'Juan',
	// 	lastName: 'Perez',
	// 	email: 'juan.perez@ejemplo.com',
	// 	phone: '2993334444',
	// 	gender: 'M',
	// 	dateOfBirth: new Date('1980/01/12'),
	// 	nationality: 'Argentina',
	// 	studyLevel: 'Universitario completo',
	// 	degree: 'Licenciado',
	// 	profilePic: 'https://avatars.dicebear.com/api/micah/1234.svg',
	// 	roles: [
	// 		{ rol_id: 1, rolDescription: 'Gestor documental' },
	// 		{ rol_id: 2, rolDescription: 'Personal de seguridad' }
	// 	]
	// };
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
	export let userWorkInfo = data.workInfo.userworkinfo ||
	// let userWorkInfo = 
	{
		dischargeDate: new Date('2019-08-21'),
		employementRel: 'Relación de dependencia',
		hiringMode: 'A tiempo completo',
		unionAgreement: 'Federación Sindicatos Unidos Petroleros',
		job: 'Técnico Vertical'
	};
	export let userAddress = data.workInfo.useraddress || 
	// let userAddress = {
		{
		user_id: 1234,
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
	export let userHealthInfo = data.workInfo.userhealthinfo ||
	// let userHealthInfo = {}
	{
		bloodType: 'A',
		rh: true,
		allergies: 'Ninguno'
	};
</script>

<svelte:head>
	<title>Operario: {userDetails.firstName + ' ' + userDetails.lastName} - SeguCheck</title>
</svelte:head>

<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios">Operarios</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/operarios/{userDetails.user_id}/">{userDetails.user_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalles</BreadcrumbItem>
	</Breadcrumb>
	<h1><i class="fas fa-walking me-4" />{userDetails.firstName + ' ' + userDetails.lastName}</h1>
	<p class="lead">Detalles del operario</p>
</header>

<main>
	<TabContent>
		<TabPane tabId="userDetails" tab="Datos básicos" active>
			<UserDetails {...userDetails} />
		</TabPane>
		<TabPane tabId="docDetails" tab="Habilitaciones">
			<div class="hstack gap-3">
				<h2 class="my-4"><i class="fas fa-paperclip me-4" />Habilitaciones</h2>
				<div class="ms-auto">
					<a class="btn btn-primary" href="/panel/operarios/{userDetails.user_id}/habilitaciones">
						<i class="fas fa-plus me-2" />Nuevo
					</a>
				</div>
			</div>
			{#if userDocumentation.length == 0}
				<div class="alert alert-secondary" role="alert">
					<i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta ahora.
					Haz click en Nuevo para subir archivos.
				</div>
			{:else}
				<div class="row g-3">
					{#each userDocumentation as thisDoc}
						<DocDetails {...thisDoc} />
					{/each}
				</div>
			{/if}
		</TabPane>
		<TabPane tabId="userWorkInfo" tab="Datos laborales">
			<WorkInfo {...userWorkInfo} />
		</TabPane>
		<TabPane tabId="userAddress" tab="Domicilios">
			<AddressDetails {...userAddress} />
		</TabPane>
		<TabPane tabId="userHealthInfo" tab="Datos médicos">
			<HealthInfo {...userHealthInfo} />
		</TabPane>
	</TabContent>
</main>
