<script lang="ts">
	// Datos del documento a mostrar
	export let documentation_id = 0;
	export let documentType = { documentType_id: 0, description: '' };
	export let urlPdf = '';
	export let status = '';
	export let created_at = new Date();
	export let updated_at = new Date();
	export let expirated_at = new Date();

	// Comprobar vencimiento y mostrar ícono:
	const today = new Date();
	const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);

	let alertIcon = `<i class="fas fa-check-circle me-2 text-success" />`;
	if (expirated_at < today) alertIcon = `<i class="fas fa-times-circle me-2 text-danger" />`;
	else if (expirated_at < nextWeek)
		alertIcon = `<i class="fas fa-exclamation-circle me-2 text-warning" />`;
</script>

<div>
	<h6 class="lead">
		{@html alertIcon} {documentType.description}
	</h6>
	<ul>
		<li>ID Documento: {documentation_id}</li>
		<li>Estado: {status} </li>
		<li>Enlace: {urlPdf}</li>
		<li>Creado: {created_at.toLocaleDateString()}</li>
		<li>Actualizado: {updated_at.toLocaleDateString()}</li>
		<li>Vencimiento: {expirated_at.toLocaleDateString()}</li>
	</ul>
	<div class="d-grid">
		<button type="button" class="btn btn-block btn-primary">
			<i class="fas fa-eye me-2" />Ver adjunto
		</button>
	</div>
</div>
