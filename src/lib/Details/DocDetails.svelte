<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/

import { Accordion, AccordionItem, Modal } from 'sveltestrap';
import moment from 'moment';
	

	export let documentation
	// Datos del documento a mostrar
	export let documentation_id = 0;
	export let documenttype = documentation.documenttype
	// export let documentation
	// let documentType= documenttype
	// let documentType= documenttype.description
	// export let documenttype = ''
	// export let urlPdf = '';
	export let status = '';
	export let expirated_at 
	export let created_at 
	export let updated_at
	
	let expirated_At_Date = new Date(expirated_at)
	let expirated_atString =  moment(expirated_at).format("DD/MM/YYYY")
	let created_atString = moment(created_at).format("DD/MM/YYYY")
	let updated_atString =  moment(updated_at).format("DD/MM/YYYY")
	export let urlPdf

	urlPdf = '/docs/temp-docs/'+urlPdf
	// let { urlPdf , status , created_at , updated_at , expirated_at} = [...documentation]

	// Comprobar vencimiento para mostrar ícono y color:
	const today = new Date();
	const todayString = moment(today).format("DD/MM/YYYY").split('T')[0];
	const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);
	const nextWeekString = moment(nextWeek).format("DD/MM/YYYY").split('T')[0];

	// Por defecto y mientras no expire en menos de 7 días, muestra en color verde:
	let textColor = `text-success`;
	let alertIcon = `<i class="fas fa-check-circle me-2 text-success" />`;
	if (expirated_At_Date.getTime() < today.getTime()) {
		alertIcon = `<i class="fas fa-times-circle me-2 text-danger" />`;
		textColor = `text-danger`;
	} else if (expirated_At_Date.getTime() < nextWeek.getTime()) {
		alertIcon = `<i class="fas fa-exclamation-circle me-2 text-warning" />`;
		textColor = `text-warning`;
	}

	// Abrir modal para ver adjunto:
	let modalOpen = false;
  	const toggle = () => (modalOpen = !modalOpen);
</script>

<Accordion stayOpen class="col-md-6">
	<AccordionItem>
		<h5 class="m-0 {textColor}" slot="header">
			{@html alertIcon}
			{documenttype.description}
		</h5>
		<ul>
			<li>ID Documento: {documentation_id}</li>
			<li>Estado: 
				{#if status === 'active' && (expirated_At_Date.getTime() > today.getTime())}
					Vigente
				{:else}
					Vencido
				{/if}
			</li>
			<li>Creado: {created_atString}</li>
			<li>Actualizado: {updated_atString}</li>
			<li>Vencimiento: <span class={textColor}>{expirated_atString}</span></li>
		</ul>
		<div class="d-grid">
			<button type="button" on:click={toggle} class="btn btn-block btn-primary">
				<i class="fas fa-eye me-2" />Ver adjunto
			</button>
		</div>
	</AccordionItem>
</Accordion>

<Modal body header="{documenttype.description}" isOpen={modalOpen} {toggle} fullscreen>
    <embed src="{urlPdf}" width="100%" height="100%">
</Modal>