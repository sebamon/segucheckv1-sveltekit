<script lang="ts">
	/* 
		Elementos para la renderización
		- Tabs para el sistema de pestañas
		- MultiSelect para el manejo de etiquetas 
	*/

	import { Tabs, TabList, TabPanel, Tab } from '../routes/api/tabs';
	import MultiSelect from './MultiSelect.svelte';

	/* 
		Declaración de tipos
	*/

	type itemCompound = {
		checkitem: checkItem;
		selectedCategory: checkcategory;
		active: string;
		checked: boolean;
		isNew: boolean;
	};

	type categoryCompound = {
		category: checkcategory;
		isNew: boolean;
	};

	/* 
		Declaración de Variables
	*/

	/* 
		Datos exportados
	*/
	export let data; // Viene de la vista que invoca el componente. Debe contener un arreglo de elementos `checkcategory`
	let categories = data.categories; // Toma las categorías asignadas traídas por `data`

	/* 
		Colecciones
	*/
	let categoryCollection: categoryCompound[] = []; // Colección de las categorías `checkcategory` actuales y nuevas
	let itemCollection: itemCompound[] = []; // Colección de los items `checkcitem` actuales y nuevos
	let itemCheckedCollection = []; // // Colección de los items que el usuario desea cargar a la checklist

	/*
		Variables auxiliares
	*/
	let itemSelectedCatToAdd: checkcategory; // Categoría temporal para creación de nuevos items
	let newCategoryNameToAdd: string = 'Categoría nueva'; // Nombre de la categoría nueva a cargar
	let itemVerification: verifyItem[]; // Colección creada para inicializar una checklist
	let verification: verify = {
		// Variable creada para inicializar una checklist
		verify_id: null,
		list: itemVerification
	};
	let thisChecklist: checkList = {
		checkList_id: null,
		checkListName: 'Nombre de la Checklist',
		verify: verification
	};
	let value = []; // Utilizado por DnDAction para cargar los componentes seleccionados
	let titleH2 = 'visible'; // Afecta la visibilidad del input del nombre de la lista
	let titleEdit = 'hidden'; // Afecta la visibilidad del input del nombre de la lista

	/*
		Declaración de funciones
	*/

	/*
		Alterna la edición del título
	*/
	const toggle = () => {
		if (titleH2 == 'visible') {
			titleH2 = 'hidden';
			titleEdit = 'visible';
		} else {
			titleH2 = 'visible';
			titleEdit = 'hidden';
		}
	};

	/*
		Crea una categoría nueva
	*/
	const addCategory = () => {
		if (newCategoryNameToAdd != '') {
			let newCategory: checkcategory = {
				category_id: categoryCollection.length + 1,
				categoryName: newCategoryNameToAdd,
				checkItems: []
			};
			categoryCollection = [
				...categoryCollection,
				{
					category: newCategory,
					isNew: true
				}
			];
			newCategoryNameToAdd = '';
		} else alert('El nombre de la categoría no puede estar vacío'); // reemplazar por validador
	};

	/*
		Crea un ítem nuevo
	*/
	const addItem = () => {
		if (itemCollection.length != 0) {
			itemCollection[itemCollection.length - 1].isNew = false;
		}
		let newItem: checkItem = {
			checkItem_id: itemCollection.length,
			item: 'Nuevo elemento',
			description: 'Nueva descripción',
			categories: []
		};
		itemCollection = [
			...itemCollection,
			{
				checkitem: newItem,
				selectedCategory: categoryCollection[0].category,
				active: '',
				checked: false,
				isNew: true
			}
		];
	};

	const removeItemField = (item_id) => {
		itemCollection[item_id].active = 'hidden';
	};

	const submit = () => {
		alert('Yey! Vamos a enviar ésto!');
	};

	/*
	 * Carga inicial de datos provenientes del controlador
	 * Se generan dos arrays (itemCollection y categoryCollection), encargados de
	 * almacenar todos los items y categorías existentes y nuevos
	 */
	categories.forEach((element) => {
		if (!element.checkItems) {
			if (element.checkitems) {
				let repairedElement: checkcategory = {
					category_id: element.category_id,
					categoryName: element.categoryName,
					checkItems: element.checkitems
				};
				element = repairedElement;
			} else {
				element.category_id = categoryCollection.length; // Se modifica el id de la categoría para tratamiento interno
			}
		}
		let myItemList = element.checkItems;
		myItemList.forEach((thisCheckitem) => {
			if (!itemCollection.includes(thisCheckitem)) {
				thisCheckitem.item_id = itemCollection.length; // Se modifica el id del checkitem para tratamiento interno

				itemCollection = [
					...itemCollection,
					{
						checkitem: thisCheckitem,
						selectedCategory: element,
						active: '',
						checked: false,
						isNew: false
					}
				];
			}
		});
		categoryCollection = [
			...categoryCollection,
			{
				category: element,
				isNew: false
			}
		];
	});
</script>

<svelte:head>
	<title>Nueva Checklist - SeguCheck</title>
</svelte:head>

{#if itemCollection}
	<div id="dynamicChecklistName">
		<input
			type="text"
			class="form-control {titleEdit}"
			on:mouseleave={toggle}
			bind:value={thisChecklist.checkListName}
		/>
		<h2 class={titleH2} on:dblclick={toggle}>{thisChecklist.checkListName}</h2>
	</div>
	<div id="generalContainer" class="row mb-3 g-3 justify-content dynamicContainer">
		<div id="panel" class="col-8">
			<Tabs>
				<TabList>
					{#each categoryCollection as categoryCompound}
						<Tab>{categoryCompound.category.categoryName}</Tab>
					{/each}
				</TabList>

				{#each categoryCollection as categoryCompound}
					<TabPanel>
						<h3>{categoryCompound.category.categoryName}</h3>
						<input type="text" bind:value={categoryCompound.category.categoryName} /><br />
						{#if categoryCompound.category.checkItems.length != 0}
							<!-- <select multiple bind:value={itemCheckedCollection}> -->
							<MultiSelect id="itemsSelected" bind:value={itemCheckedCollection}>
								{#each categoryCompound.category.checkItems as item}
									item: {JSON.stringify(item)}
									categoría: {JSON.stringify(categoryCompound)}
									<option class="form-select" value={item}>{item.item}</option>
								{/each}
							</MultiSelect>
							<!-- </select> -->
						{/if}
					</TabPanel>
				{/each}
			</Tabs>
		</div>
		<div id="preview" class="col-4">
			<h3>Vista Previa</h3>
			<div class="dynamicContainer border preview-container">
				<h4 class="preview-header"><strong>{thisChecklist.checkListName}</strong></h4>
				<!-- <p>Categoría (colección): {JSON.stringify(categoryCollection)}</p> -->
				{#each categoryCollection as categoryCompound}
					<!-- {#if categoryCompound.category.checkitems.length != 0} -->
					<h5 class="preview-header">{categoryCompound.category.categoryName}</h5>
					{#each itemCollection as itemCompound}
						{#if itemCompound.selectedCategory.category_id == categoryCompound.category.category_id}
							<input class="form-check-input previewCheck" type="checkbox" />
							{itemCompound.checkitem.item}<br />
						{/if}
					{/each}
					<!-- {/if} -->
				{/each}
			</div>
		</div>
	</div>

	<div id="addCatsAndItems" class="row mb-3 g-3 justify-content dynamicContainer">
		<div id="listCreation" class="col-6">
			<div class="dynamicContainer">
				<div class="row">
					<div class="col-9">
						<input type="text" class="form-control addedButton" bind:value={newCategoryNameToAdd} />
					</div>
					<div class="col-3">
						<button class="btn btn-primary" on:click={addCategory}>Crear categoría</button>
					</div>
				</div>
			</div>
		</div>

		<div id="dynamicItem" class="col-6">
			<div class="dynamicContainer">
				<div class="row">
					<div class="col-9">
						{#each itemCollection as itemCompound}
							{#if itemCompound.isNew == true}
								<input
									type="text"
									class="form-control addedButton"
									id={`item-${itemCompound.checkitem.checkItem_id}`}
									bind:value={itemCompound.checkitem.item}
								/>
								<select bind:value={itemCompound.selectedCategory}>
									{#each categoryCollection as categoryCompound}
										<option class="form-select" value={categoryCompound.category}
											>{categoryCompound.category.categoryName}</option
										>
									{/each}
								</select>
							{/if}
						{/each}
					</div>
					<div class="col-3">
						<button class="btn btn-primary" on:click={addItem}>Nuevo item</button>
					</div>
				</div>
			</div>
		</div>

		<div id="checklistPreview" class="col-5" />
	</div>

	<button class="btn btn-primary" on:click={submit}>Crear checklist</button>
{/if}

<!-- Thanks a lot, Exodus!! -->
<style>
	.dynamicContainer {
		margin-top: 1rem;
	}
	.preview-header {
		text-align: center;
	}
	.preview-container {
		padding: 1%;
		width: 100%;
	}
	.hidden {
		display: none;
	}
	.visible {
		display: flex;
		visibility: visible;
	}
</style>
