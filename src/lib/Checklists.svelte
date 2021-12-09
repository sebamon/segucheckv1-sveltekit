<script lang="ts">
	// Requerimientos para el modal
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

	/* Definimos los tipos de la checklist */
	type checkItem = {
		checkItem_id: number;
		item: string;
		description: string;
		categories: checkcategory[];
	}; //Listo model checkitem

	type checkcategory = {
		category_id: number;
		categoryName: string;
		checkItems: checkItem[];
	}; //Listo model checkcategory

	type verifyItem = {
		verifyItem_id: number;
		checkItem: checkItem;
		checked: boolean;
		observation: string;
	}; //Listo model verifyItem

	type verify = {
		verify_id: number;
		list: verifyItem[];
	};

	type checkList = {
		checkList_id: number;
		checkListName: string;
		verify: verify;
	};

	

	/* Modales!! */
	let open = false;
	const toggle = () => {
		open = !open;
	};

	// Funciones para agregar o quitar ítems de la checklist
	const addItem = () => {
		let newItem: checkItem;
		let checkItem_id: number;
		let item: string;
		let description: string;
		let categories: checkcategory[];

		return `<label for="">Mock item  </label><input type="checkbox" /> Mock item`;
	};
	const substractItem = () => {};

	// Funciones para agregar o quitar categorías de la checklist
	let categoryCollection = [];
	let categoryIndex = categoryCollection.length;
	let nombreCheckCategory = '';

	const editCatName = (element) => {
		console.log('Mi elemento dentro de editCatName: ', element);
		let catId = element.split('_').pop();
		catId = catId.split('"');
		let catNumber = catId[0].split('-').pop();
		let catDemo = 'category-demo-'+catNumber;

		console.log('catId', catNumber);
		console.log('Category blah blah: ', categoryCollection[catNumber-1]);
		let categoryName: string = catNumber + ' - Trululu';
		categoryCollection[catNumber-1].categoryName = categoryName;
		document.getElementById(catId[0]).innerHTML = `<h5>${categoryName}</h5>`;
		document.getElementById(catDemo).innerHTML = `<h5>${categoryName}</h5>`;

	};
	
	const addCategory = () => {

		// Renombrar categoría
		document.addEventListener('click', function (e) {
			if (e.target) {
				editCatName(JSON.stringify(e.path[0].id));
			}
		});

		let newCategoryDivForm = document.createElement('div');
		let newCategoryDivDemo = document.createElement('div');
		let newItemDiv = document.createElement('div');

		let category_id = categoryIndex;
		let categoryName = nombreCheckCategory;
		let checkItems = [];
		let newCategory: checkcategory = { category_id, categoryName, checkItems };
		categoryCollection.push(newCategory);

		// Creo el elemento para el formulario
		let savedId = newCategory.category_id + 1;
		let catDomId = 'category-' + savedId;
		newCategoryDivForm.setAttribute('id', catDomId);
		newCategoryDivForm.innerHTML = `<h5>${newCategory.category_id + 1} - ${
			newCategory.categoryName
		}</h5><Button id="btn_${catDomId}">Botón</Button><br />
				<input type="text bind:value="${newCategory.categoryName}" placeholder="${
			newCategory.category_id + 1
		} - ${newCategory.categoryName}" />`;
		// newCategoryDivForm.innerHTML = `<h5>${newCategory.category_id+1} - ${newCategory.categoryName}</h5>`;

		newItemDiv.setAttribute('id', 'item-container-' + categoryIndex);
		newItemDiv.innerHTML = addItem();
		newCategoryDivForm.appendChild(newItemDiv);

		document.getElementById('itemsContainer').appendChild(newCategoryDivForm);

		// Creo el elemento para la vista previa
		newCategoryDivDemo.setAttribute('id', 'category-demo-' + categoryIndex);
		newCategoryDivDemo.innerHTML = `<h5>${categoryIndex + 1} - ${nombreCheckCategory}</h5>`;
		document.getElementById('itemsContainerDemo').appendChild(newCategoryDivDemo);
		// Parámetros finales
		categoryIndex += 1;
		nombreCheckCategory = '';
		toggle();
	};

	const substractCategory = () => {};
	const addButtons = () => {};
	const substractButtons = () => {};

	/* ************************ Valores demo ************************ */
	let nombreCheck = 'Control de Camionetas - Salida';
	let optionsCheck = [
		{
			id: '1',
			item: 'Control Vehicular',
			description: 'Verificar que la carga del extintor esté completa'
		},
		{
			id: '2',
			item: 'Control Salud',
			description: 'Controlar que la presión de los neumáticos sea adecuada'
		}
	];
	let selectedOption = 1;
	/* ************************ Valores demo ************************ */
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
		crossorigin="anonymous"
	/>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>
</svelte:head>

<div id="conteiner" class="row justify-content-center">
	<!-- Formulario nuevo checklist -->
	<div id="formCheck" class="col-6">
		<h2>Datos de la Checklist</h2>
		<label for="checklistName">Nombre</label><br />
		<input type="text" placeholder="Control de Camionetas - Salida" bind:value={nombreCheck} /><br
		/>

		<!--<label for="checklistGroup">Grupo</label><br />
		<select bind:value={selectedOption}>
			{#each optionsCheck as option}
				<option value={option.id} id={option.id}>{option.item}</option>
			{/each}
		</select> -->

		<Button id="addCategory" on:click={toggle}>
			<!-- <img src="/img/add.png" alt="agregar categoría" id="tinyAdd" /> -->
			Agregar categoría</Button
		>
		<Button id="substractCategory" on:click={substractCategory}>
			<!-- <img src="/img/sub.png" alt="remover categoría" id="tinySubs" /> -->
			-
		</Button>

		<h4>Items</h4>

		<!-- Testeando ids dinámicos -->
		<div id="itemsContainer">
			<!-- Acá se agregan las categorías -->
		</div>
		<label for="checklistItem-1">Item 1</label><br />
		<input id="checklistItem-1" type="text" placeholder="Control Carga Extintor" /><br />
		<label for="checklistItemDescription-1">Descripción ítem 1</label><br />
		<input
			id="checklistItemDescription-1"
			type="text"
			placeholder={optionsCheck[0].description}
			bind:value={optionsCheck[0].description}
		/><br />

		<label for="checklistItem-2">Item 2</label><br />
		<input id="checklistItem-2" type="text" placeholder="Control Presión de Neumáticos" /><br />
		<label for="checklistItemDescription-2">Descripción ítem 2</label><br />
		<input
			id="checklistItemDescription-2"
			type="text"
			placeholder={optionsCheck[1].description}
			bind:value={optionsCheck[1].description}
		/><br />
		<Button id="addItem">
			<!-- <img src="/img/add.png" alt="agregar ítem" id="tinyAdd" /> -->
			+
		</Button>
		<Button id="substractItem">
			<!-- <img src="/img/sub.png" alt="remover ítem" id="tinySubs" /> -->
			-
		</Button>
	</div>

	<div id="vistaPrevia" class="col-6">
		<h2>Vista Previa</h2>
		<form name="demo">
			<h4>{nombreCheck}</h4>
			<h5>{selectedOption} - {optionsCheck[selectedOption - 1].item}</h5>
			<div id="itemsContainerDemo">
				<input type="checkbox" />
				{optionsCheck[0].description} <br />
				<input type="checkbox" />
				{optionsCheck[1].description} <br />
			</div>
		</form>
	</div>
	<!-- Modal Categoría -->
	<div>
		<Modal isOpen={open} {toggle}>
			<ModalHeader {toggle}>Agregar categoría</ModalHeader>
			<ModalBody>
				<input type="text" bind:value={nombreCheckCategory} placeholder="ingresar un nombre" />
			</ModalBody>
			<ModalFooter>
				<Button color="primary" on:click={addCategory}>Agregar</Button>
				<Button color="secondary" on:click={toggle}>Cancelar</Button>
			</ModalFooter>
		</Modal>
	</div>
</div>

<style>
	input[type='text'],
	select {
		width: 100%;
	}
	input[placeholder] {
		text-decoration-color: darkgray;
	}
	#tinyAdd,
	#tinySubs {
		width: 22px;
		height: 22px;
	}
	/* #vistaPrevia{
		
		float: right;
	} */
</style>
