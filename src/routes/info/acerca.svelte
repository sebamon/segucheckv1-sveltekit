<script lang="ts">
	import NavbarHome from'$lib/NavbarHome.svelte';
</script>

<svelte:head>
	<title>Acerca de - SeguCheck</title>
</svelte:head>

<!-- Menú de navegación -->
<NavbarHome/>

<!-- Más info al scrollear -->
<main class="container py-4">
    <h1>Paleta de colores</h1>
    <div class="row row-cols-3">
        <h3 class="bg-light text-dark p-5">Texto oscuro: #17141f</h3>
        <h3 class="bg-light text-muted p-5">Texto gris: #868e96</h3>
        <h3 class="bg-dark text-light p-5">Texto claro: #f9f8fc
        </h3>
    </div>
    <div class="row row-cols-2">
        <h3 class="bg-primary text-light p-5">Primario: #593196</h3>
        <h3 class="bg-secondary p-5">Secundario: #a991d4</h3>
    </div>
    <div class="row row-cols-4">
        <h4 class="bg-info p-5">Info: #009cdc</h4>
        <h4 class="bg-success p-5">Éxito: #13b955</h4>
        <h4 class="bg-warning p-5">Atención: #efa31d</h4>
        <h4 class="bg-danger p-5">Peligro: #fc3939</h4>
    </div>
</main>