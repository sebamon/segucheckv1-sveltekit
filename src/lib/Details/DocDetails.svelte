<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Accordion, AccordionItem, Modal } from 'sveltestrap';

	// Datos del documento a mostrar
	export let documentation_id = 0;
	export let documentType = { documentType_id: 0, description: '' };
	export let urlPdf = '';
	export let status = '';
	export let created_at = new Date();
	export let updated_at = new Date();
	export let expirated_at = new Date();

	// Comprobar vencimiento para mostrar ícono y color:
	const today = new Date();
	const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);

	// Por defecto y mientras no expire en menos de 7 días, muestra en color verde:
	let textColor = `text-success`;
	let alertIcon = `<i class="fas fa-check-circle me-2 text-success" />`;
	if (expirated_at < today) {
		alertIcon = `<i class="fas fa-times-circle me-2 text-danger" />`;
		textColor = `text-danger`;
	} else if (expirated_at < nextWeek) {
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
			{documentType.description}
		</h5>
		<ul>
			<li>ID Documento: {documentation_id}</li>
			<li>Estado: {status}</li>
			<li>Enlace: {urlPdf}</li>
			<li>Creado: {created_at.toLocaleDateString()}</li>
			<li>Actualizado: {updated_at.toLocaleDateString()}</li>
			<li>Vencimiento: <span class={textColor}>{expirated_at.toLocaleDateString()}</span></li>
		</ul>
		<div class="d-grid">
			<button type="button" on:click={toggle} class="btn btn-block btn-primary">
				<i class="fas fa-eye me-2" />Ver adjunto
			</button>
		</div>
	</AccordionItem>
</Accordion>

<Modal body header="{documentType.description}" isOpen={modalOpen} {toggle} fullscreen>
    <embed src="{urlPdf}" width="100%" height="100%">
</Modal>