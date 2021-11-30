<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
	let nombreCheck = 'Control de Camionetas - Salida';
	let nombreCheckGroup = '';
	let optionsCheck = [
		{ id: '1', value: 'Control Vehicular' },
		{ id: '2', value: 'Control Salud' }
	];
	let selectedOption = 1;
	let item1 = "Verificar que la carga del extintor esté completa", item2 ="Controlar que la presión de los neumáticos sea adecuada";
</script>

<svelte:head>
	<title>Nuevo checklist - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists">Checklists</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Nuevo</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1>Nuevo checklist</h1>
		<p class="lead">Ingrese los detalles a continuación.</p>
	</div>
</header>

<!-- Formulario nuevo usuario -->
<div id=formCheck>
<form name="formJobDetails" id="formJobDetails">
	<!-- <p class="text-muted fst-italic">Trabajo en progreso....</p>
    <img
        class="fluid thumbnail"
        alt="John Travolta perdido"
        title="John Travolta perdido"
        src="https://c.tenor.com/kVrGzZGZnUUAAAAC/pulp-fiction-wtf.gif"
    /> -->
	<h4>Datos de la Checklist</h4>
	<label for="checklistName">Nombre de la Checklist</label><br />
	<input type="text" placeholder="Control de Camionetas - Salida" bind:value={nombreCheck} /><br />
	<label for="checklistGroup">Grupo</label><br />
	<!-- <select name="checkGroup" bind:value={nombreCheckGroup}>
		<option value="1">Control Vehicular</option>
		<option value="2">Control Salud</option>
	</select><br /> -->
	<select bind:value={selectedOption}>
		{#each optionsCheck as option}
			<option value={option.id} id="{option.id}">{option.value}</option>
		{/each}
	</select>

	<h4>Items</h4>

	<label for="checklistItem-1">Item 1</label><br />
	<input id="checklistItem-1" type="text" placeholder="Control Carga Extintor" /><br />
	<label for="checklistItemDescription-1">Descripción ítem 1</label><br />
	<input
		id="checklistItemDescription-1"
		type="text"
		placeholder={item1}
		bind:value="{item1}"
	/><br />

	<label for="checklistItem-2">Item 2</label><br />
	<input id="checklistItem-2" type="text" placeholder="Control Presión de Neumáticos" /><br />
	<label for="checklistItemDescription-2">Descripción ítem 2</label><br />
	<input
		id="checklistItemDescription-2"
		type="text"
		placeholder= {item2}
		bind:value="{item2}"
	/><br />
	<button id="addItem">
		<img src="/static/img/button-add.png" alt="agregar ítem" id="tinyAdd" />
		Agregar ítem</button
	>
</form>
</div>

<div id="vistaPrevia">
<h2>Vista Previa</h2>
<form name="demo">
	<h4>{nombreCheck}</h4>
	<h5>{selectedOption} - {optionsCheck[selectedOption-1].value}</h5>
	<input type="checkbox"> {item1} <br>
	<input type="checkbox"> {item2} <br>
</form>
</div>


<style>
	input[type=text],
	select {
		width: 50%;
	}
	input[placeholder] {
		text-decoration-color: darkgray;
	}
	#tinyAdd {
		width: 22px;
		height: 22px;
	}
	/* #vistaPrevia{
		
		float: right;
	} */
</style>
