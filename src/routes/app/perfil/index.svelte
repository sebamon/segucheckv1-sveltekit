<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Image, Modal, Accordion, AccordionItem } from 'sveltestrap';
	import { onMount } from 'svelte';
	import moment from 'moment';
import HealthInfo from '$lib/Details/HealthInfo.svelte';
import WorkInfo from '$lib/Details/WorkInfo.svelte';

	// Datos del usuario a mostrar (reemplazar con fetch):
	let userDetails = {
		user_id: 1234,
		cuit: 20301001008,
		firstName: 'Juan',
		lastName: 'Perez',
		email: 'juan.perez@ejemplo.com',
		phone: '2993334444',
		gender: 'M',
		dateOfBirth: '31/12/1980',
		nationality: 'Argentina',
		studyLevel: 'Universitario completo',
		degree: 'Licenciado',
		profilePic: '/img/usr-await.png',
		roles: [
			{ rol_id: 1, rolDescription: 'Gestor documental' },
			{ rol_id: 2, rolDescription: 'Personal de seguridad' }
		]
	};
    let AddressDetails = {
        countryOfResidence: 'Argentina',
        stateOfResidence: 'Neuquén',
        cityOfResidence: 'Rincón de los Sauces',
        zipCodeOfResidence: 8319,
        addressOfResidence: 'Roca 893',
        phoneOfResidence: '299-412-3469'
    }
    let HealthInfo = {
        bloodType: 'A',
        rh: true,
        allergies: 'Ninguno'
    }
    let WorkInfo = {
        dischargeDate: '21/08/2019',
        employementRel: 'Relación de Dependencia',
        hiringMode: 'A tiempo completo',
        unionAgreement: 'Federación Sindicatos Unidos Petroleros',
        job: 'Técnico Vertical'
    }

	// Arreglo de roles - Esto lo lee de la DB:
	let rolesList = [
		{ rol_id: 1, rolDescription: 'Gestor documental' },
		{ rol_id: 2, rolDescription: 'Personal de seguridad' },
		{ rol_id: 3, rolDescription: 'Operario' },
		{ rol_id: 4, rolDescription: 'Operario' }
	];
	// Arreglo de géneros:
	let genderText: string;
	if (userDetails.gender == 'M') {
		genderText = 'Varón';
	} else if (userDetails.gender == 'F') {
		genderText = 'Mujer';
	} else {
		genderText = userDetails.gender;
	}
</script>

<header class="text-center mb-3">
	<h1>{userDetails.firstName + ' ' + userDetails.lastName}</h1>
	<img
		src="{userDetails.profilePic == '' ? '/img/usr-await.png' : userDetails.profilePic}"
		class="img-fluid img-thumbnail m-2"
		alt="Foto de perfil"
		style="max-width:150px"
	/>
</header>
<main class="row g-4">
	<Accordion stayOpen class="col-md-6">
		<AccordionItem active>
			<h5 class="m-0" slot="header">Información básica</h5>
			<div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="user_id" class="form-label">Número ID</label>
					<input id="user_id" class="form-control" value={userDetails.user_id} readonly />
				</div>
				<div class="col-lg-6">
					<label for="user_id" class="form-label">Número CUIT</label>
					<input id="cuit" class="form-control" value={userDetails.cuit} readonly />
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="firstName" class="form-label">Nombre</label>
					<input id="firstName" class="form-control" value={userDetails.firstName} readonly />
				</div>
				<div class="col-lg-6">
					<label for="lastName" class="form-label">Apellido</label>
					<input id="lastName" class="form-control" value={userDetails.lastName} readonly />
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="gender" class="form-label">Género</label>
					<input id="gender" class="form-control" value={genderText} readonly />
				</div>
				<div class="col-lg-6">
					<label for="dateOfBirth" class="form-label">Fecha de nacimiento</label>
					<input id="dateOfBirth" class="form-control" value={userDetails.dateOfBirth} readonly />
				</div>
			</div>
			<div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="nationality" class="form-label">Nacionalidad</label>
					<input id="nationality" class="form-control" value={userDetails.nationality} readonly />
				</div>
				<div class="col-lg-6">
					<label for="degree" class="form-label">Título de formación</label>
					<input id="degree" class="form-control" value={userDetails.degree} readonly />
				</div>
			</div>
		</AccordionItem>
	</Accordion>
	<Accordion stayOpen class="col-md-6">
		<AccordionItem>
			<h5 class="m-0" slot="header">Contacto</h5>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="email" class="form-label">Correo electrónico</label>
					<input id="email" class="form-control" value={userDetails.email} readonly />
				</div>
				<div class="col-lg-6">
					<label for="phone" class="form-label">Teléfono</label>
					<input id="phone" class="form-control" value={userDetails.phone} readonly />
				</div>
			</div>
		</AccordionItem>
	</Accordion>
	<Accordion stayOpen class="col-md-6">
		<AccordionItem>
			<h5 class="m-0" slot="header">Domicilio de residencia</h5>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="countryOfResidence" class="form-label">País</label>
					<input id="countryOfResidence" class="form-control" value={AddressDetails.countryOfResidence} readonly />
				</div>
				<div class="col-lg-6">
					<label for="stateOfResidence" class="form-label">Provincia / Estado</label>
					<input id="stateOfResidence" class="form-control" value={AddressDetails.stateOfResidence} readonly />
				</div>
			</div>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="cityOfResidence" class="form-label">Localidad</label>
					<input id="cityOfResidence" class="form-control" value={AddressDetails.cityOfResidence} readonly />
				</div>
				<div class="col-lg-6">
					<label for="zipCodeOfResidence" class="form-label">Código postal</label>
					<input id="zipCodeOfResidence" class="form-control" value={AddressDetails.zipCodeOfResidence} readonly />
				</div>
			</div>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="addressOfResidence" class="form-label">Dirección</label>
					<input id="addressOfResidence" class="form-control" value={AddressDetails.addressOfResidence} readonly />
				</div>
				<div class="col-lg-6">
					<label for="phoneOfResidence" class="form-label">Teléfono</label>
					<input id="phoneOfResidence" class="form-control" value={AddressDetails.phoneOfResidence} readonly />
				</div>
			</div>
		</AccordionItem>
	</Accordion>
	<Accordion stayOpen class="col-md-6">
		<AccordionItem>
			<h5 class="m-0" slot="header">Datos laborales</h5>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="dischargeDate" class="form-label">Fecha de alta</label>
					<input id="dischargeDate" class="form-control" value={WorkInfo.dischargeDate} readonly />
				</div>
				<div class="col-lg-6">
                    <label for="employementRel" class="form-label">Relación laboral</label>
					<input id="employementRel" class="form-control" value={WorkInfo.employementRel} readonly />
				</div>
			</div>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="hiringMode" class="form-label">Modalidad de contratación</label>
					<input id="hiringMode" class="form-control" value={WorkInfo.hiringMode} readonly />
				</div>
				<div class="col-lg-6">
					<label for="unionAgreement" class="form-label">Convenio</label>
					<input id="unionAgreement" class="form-control" value={WorkInfo.unionAgreement} readonly />
				</div>
			</div>
            <div class="row mb-3 g-3">
				<div class="col-lg-12">
					<label for="job" class="form-label">Puesto de trabajo</label>
					<input id="job" class="form-control" value={WorkInfo.job} readonly />
				</div>
			</div>
		</AccordionItem>
	</Accordion>
	<Accordion stayOpen class="col-md-6">
		<AccordionItem>
			<h5 class="m-0" slot="header">Datos médicos</h5>
            <div class="row mb-3 g-3">
				<div class="col-lg-6">
					<label for="bloodType" class="form-label">Tipo de sangre</label>
					<input id="bloodType" class="form-control" value={HealthInfo.bloodType} readonly />
				</div>
				<div class="col-lg-6">
					<label for="rh" class="form-label">Factor</label>
					<input id="rh" class="form-control" value={HealthInfo.rh ? 'Positivo' : 'Negativo'} readonly />
				</div>
			</div>
            <div class="row mb-3 g-3">
				<div class="col-lg-12">
					<label for="allergies" class="form-label">Alergias</label>
					<input id="allergies" class="form-control" value={HealthInfo.allergies} readonly />
				</div>
			</div>
		</AccordionItem>
	</Accordion>
</main>
