<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Accordion, AccordionItem, Modal } from 'sveltestrap';
	import moment from 'moment';

	// Abrir modal para ver adjunto:
	let modalOpen = false;
	const toggle = () => (modalOpen = !modalOpen);

	export let thisDoc
	// Datos del documento a mostrar
	export let documentation_id = 0;
	export let documentType = thisDoc.vehiclerequirements.requirementDescription
	export let urlPdf;
	export let status = '';
	// export let created_at = new Date();
	export let updated_at = new Date();
	// export let expirated_At = new Date();

		
	let expirated_AtString = moment(thisDoc.vehiclerequirements.expirated_At).format("DD/MM/YYYY")
	let created_atString = moment(thisDoc.vehiclerequirements.created_at).format("DD/MM/YYYY")
	let expirated_At = new Date(thisDoc.vehiclerequirements.expirated_At)

	const today = new Date()
	const todayString = moment(today).format("DD/MM/YYYY").split('T')[0];
	// Comprobar vencimiento para mostrar ícono y color:
	const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);
	const nextWeekString = moment(nextWeek).format("DD/MM/YYYY").split('T')[0];

	urlPdf = '/docs/temp-docs/'+thisDoc.vehiclerequirements.urlPdf

	// Por defecto y mientras no expire en menos de 7 días, muestra en color verde:
	let textColor = `text-success`;
	let alertIcon = `<i class="fas fa-check-circle me-2 text-success" />`;
	

	if (expirated_At.getTime() < today.getTime()) {
		console.log('entrooo')
		alertIcon = `<i class="fas fa-times-circle me-2 text-danger" />`;
		textColor = `text-danger`;
	} else if (expirated_At.getTime() < nextWeek.getTime()) {
		console.log('else')
		alertIcon = `<i class="fas fa-exclamation-circle me-2 text-warning" />`;
		textColor = `text-warning`;
	}


</script>

<Accordion stayOpen class="col-md-6">
	<AccordionItem>
		<h5 class="m-0 {textColor}" slot="header">
			{@html alertIcon}
			{thisDoc.vehiclerequirements.requirementName}
		</h5>
		<ul>
			<li>ID Documento: {thisDoc.vehiclerequirements.vehicleRequirement_id}</li>
			<li>
				{#if thisDoc.current}
					Estado: Vigente
					{:else}
					Estado: Vencido
				{/if}
			</li>
			<li>Creado: {created_atString}</li>
			<!-- <li>Actualizado: {updated_at.toLocaleDateString()}</li> -->
			<li>Vencimiento: <span class={textColor}>{expirated_AtString}</span></li>
		</ul>
		<div class="d-grid">
			<button type="button" on:click={toggle} class="btn btn-block btn-primary">
				<i class="fas fa-eye me-2" />Ver adjunto
			</button>
		</div>
	</AccordionItem>
</Accordion>
<Modal body header="{documentType}" isOpen={modalOpen} {toggle} fullscreen>
    <embed src="{urlPdf}" width="100%" height="100%">
</Modal>