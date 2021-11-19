<script lang="ts">
    import DocDetails from '$lib/Details/DocDetails.svelte';
	// Importar por nombre de componentes: https://sveltestrap.js.org/
    
	// Datos placeholder:
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
</script>
<header>
    <h1 class="my-4 text-center"><i class="fas fa-paperclip me-4" />Habilitaciones</h1>
</header>
<main>
    {#if userDocumentation.length == 0}
    <div class="alert alert-secondary" role="alert">
        <i class="fas fa-exclamation-triangle me-2" /> No hay ninguna documentación cargada hasta ahora.
        Consulte a su gestor documental para realizar la carga de sus habilitaciones.
    </div>
{:else}
    <div class="row g-3">
        {#each userDocumentation as thisDoc}
            <DocDetails {...thisDoc} />
        {/each}
    </div>
{/if}
</main>