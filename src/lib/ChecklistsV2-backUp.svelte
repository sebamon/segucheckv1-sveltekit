<script lang="ts">
	/* 
		Elementos para la renderización
		- Tabs para el sistema de pestañas
		- Svelecte y DnDzone para el manejo de etiquetas 
	*/

	import { Tabs, TabList, TabPanel, Tab } from '../routes/api/tabs';
	// import Svelecte from 'svelecte';
	// import { dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';

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

	const addItem = () => {
		const itemIndexToSave = itemCollection.findIndex((itemCompound) => itemCompound.isNew == true);
		const itemToSave = itemCollection[itemIndexToSave];
		if (itemToSave.checkitem.item != '') {
			//console.log('dentro del addItem: ', itemToSave);
			itemToSave.checkitem.categories.push(itemSelectedCatToAdd);
			itemToSave.isNew = false;
			addStartItem();
			itemSelectedCatToAdd = categoryCollection[0].category;
			//console.log('lista salida: ', itemCollection);
		} else alert('El nombre de la categoría no puede estar vacío'); // reemplazar por validador
	};

	const addStartItem = () => {
		let thisItem: checkItem = {
			checkItem_id: itemCollection.length + 1,
			item: 'Nuevo elemento',
			description: 'Nueva descripción',
			categories: []
		};
		itemCollection = [
			...itemCollection,
			{
				checkitem: thisItem,
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

	categories.forEach((element) => {
		element.category_id = categoryCollection.length;

		let categoryToLoad: categoryCompound = {
			category: element,
			isNew: false
		};

		let myItemList = element.checkitems;
		myItemList.forEach((thisCheckitem) => {
			itemCollection = [
				...itemCollection,
				{
					checkitem: thisCheckitem,
					selectedCategory: categoryToLoad.category,
					active: '',
					checked: false,
					isNew: false
				}
			];
			// if (!itemCollection.includes(thisItemCompound)) {
			// 	itemCollection.push(thisItemCompound);
			// }
		});
		categoryCollection.push(categoryToLoad);
	});
	// Creamos un item inicial, que se modificará si el usuario quiere crear un nuevo ítem:
	addStartItem();
	// overrideItemIdKeyNameBeforeInitialisingDndZones('value');
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
						<!-- {JSON.stringify(categoryCompound.category)}-->
						{#if categoryCompound.category.checkItems}
							<!-- {JSON.stringify(categoryCompound.category)}-->
							<select multiple bind:value={itemCheckedCollection}>
								{#each categoryCompound.category.checkItems as item}
									<option class="form-select" value={item}>{item.item}</option>
								{/each}
							</select>
							<!-- <Svelecte
							options={categoryCompound.category.checkItems}
							multiple
							bind:value
							valueAsObject
							{dndzone}
						/>
						<hr />
						<pre> {JSON.stringify(value.map(i => i.text))}</pre> -->
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
						<!-- {JSON.stringify(itemCompound)} -->
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
				{#each itemCollection as itemCompound}
					<!-- Cada item que llega:{JSON.stringify(itemCompound)} -->
					{#if itemCompound.isNew == true}
						<div class="row {itemCompound.active}">
							<div class="col-9">
								<input
									type="text"
									class="form-control addedButton"
									bind:value={itemCompound.checkitem.item}
								/>
							</div>
							<div class="col-3">
								<button class="btn btn-primary" on:click={addItem}>Crear item</button>
							</div>
						</div>
						<select bind:value={itemSelectedCatToAdd}>
							{#each categoryCollection as categoryCompound}
								<option class="form-select" value={categoryCompound.category}
									>{categoryCompound.category.categoryName}</option
								>
							{/each}
						</select>
					{/if}
				{/each}
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
