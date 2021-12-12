<script lang="ts">
	/* 
		Elementos para la renderización
		- Tabs para el sistema de pestañas
		- MultiSelect para el manejo de etiquetas 
	*/

	import { Tabs, TabList, TabPanel, Tab } from '../routes/api/tabs';
	import MultiSelect from '$lib/MultiSelect.svelte';
	import { fade } from 'svelte/transition';
	import SeguAlert from '$lib/SeguAlert.svelte';

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

	type checkedItemCompound = {
		itemId: number[];
		categoryId: number;
	};

	type checkedItemCollection = {
		item: checkItem[];
		//category: checkcategory;
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
	let itemCheckedCollection: checkedItemCompound[] = []; // // Colección de los items que el usuario carga a la vista previa

	/*
		Variables auxiliares
	*/
	let newCategoryNameToAdd: string = 'Categoría nueva'; // Nombre de la categoría nueva a cargar
	let newItemNameToAdd: string = 'Item nuevo'; // Nombre del item nuevo a cargar
	let selectedCategory: checkcategory;
	let checkListName = 'Nombre de la Checklist';
	let titleH2 = 'visible'; // Afecta la visibilidad del input del nombre de la lista
	let titleEdit = 'hidden'; // Afecta la visibilidad del input del nombre de la lista
	let nameTooltip = 'Doble click para editar';
	let response = {
		status: '',
		message: ''
	};

	/*
		Declaración de funciones
	*/

	/*
		toggle - Alterna la edición del título
	*/
	const toggle = () => {
		if (titleH2 == 'visible') {
			titleH2 = 'hidden';
			titleEdit = 'visible';
			nameTooltip = '<Enter> para guardar';
		} else {
			titleH2 = 'visible';
			titleEdit = 'hidden';
			nameTooltip = 'Doble click para editar';
		}
	};

	/*
		addCategory - Crea una categoría nueva
	*/
	const addCategory = () => {
		if (newCategoryNameToAdd != '') {
			let newCategory: checkcategory = {
				category_id: categoryCollection.length,
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
			itemCheckedCollection[newCategory.category_id] = {
				// asigno la nueva categoría a la colección de elementos chequeados
				categoryId: newCategory.category_id,
				itemId: []
			};
			// Reestablecemos el nombre por defecto
			newCategoryNameToAdd = 'Categoría nueva';

			// Guardamos categoría en base de datos
			let items = [];
			newCategory.checkItems.forEach((item) => {
				items = [
					...items,
					{
						item: item.item,
						description: item.description
					}
				];
			});
			let values = {
				category_id: null,
				categoryName: newCategory.categoryName,
				checkItems: items
			};
			const submitCat = async (values) => {
				try {
					let response = await fetch('../../../api/category', {
						//http://localhost:3000/api/category
						method: 'POST',
						body: JSON.stringify(values)
					});

					const data = await response
						.json()
						.then(() => console.log('Retorno de submitCat: ' + data));
				} catch (error) {}
			};
			submitCat(values);
		} else alert('El nombre de la categoría no puede estar vacío'); // reemplazar por validador
	};

	/*
		addItem - Crea un ítem nuevo
	*/
	const addItem = () => {
		if (newItemNameToAdd != '') {
			let newItem: checkItem = {
				checkItem_id: itemCollection.length, // cambié acá el +1
				item: newItemNameToAdd,
				description: `Descripción para ${newItemNameToAdd}`,
				categories: [selectedCategory]
			};
			itemCollection = [
				...itemCollection,
				{
					checkitem: newItem,
					selectedCategory: selectedCategory,
					active: '',
					checked: false,
					isNew: true
				}
			];
			// Actualizamos la colección de Categorías
			let categoryIndex = selectedCategory.category_id;
			let categoryItemCol = categoryCollection[categoryIndex].category.checkItems;
			categoryItemCol = [...categoryItemCol, newItem];
			categoryCollection[categoryIndex].category.checkItems = categoryItemCol;

			// Reestablecemos el nombre por defecto
			newItemNameToAdd = 'Item nuevo';

			// Guardamos item en base de datos
			let categories = [];
			newItem.categories.forEach((category) => {
				categories = [
					...categories,
					{
						categoryName: category.categoryName
					}
				];
			});
			let values = {
				checkItem_id: null,
				item: newItem.item,
				description: newItem.description,
				categories: categories
			};
			const submitItem = async (values) => {
				try {
					// console.log('dentro del try, envío: ', values);
					let response = await fetch('../../../api/checkItem', {
						//http://localhost:3000/api/checkItem
						method: 'POST',
						body: JSON.stringify(values)
					});

					const data = await response
						.json()
						.then(() => console.log('Retorno de submitItem: ' + data));
				} catch (error) {}
			};
			submitItem(values);
		} else alert('El nombre del item no puede estar vacío'); // reemplazar por validador
	};

	/**
	 *  submit - Guarda la checklist en la base de datos
	 */
	const submit = async () => {
		
		let values;
		let itemsCollection = [];
		// console.log('itemchecked collection: ', itemCheckedCollection);
		itemCheckedCollection.forEach((elemento) => {
			// {categoryId: number, itemId: [number]}
			elemento.itemId.forEach((itemId) => {
				// itemId
				// console.log('itemCollection[itemId]', itemCollection[itemId])
				itemCollection[itemId].checkitem.categories = [
					categoryCollection[elemento.categoryId].category
				];
				itemCollection[itemId].checkitem.categories[0].checkItems = null;
				itemsCollection = [...itemsCollection, itemCollection[itemId].checkitem];
			});
		});
		values = {
			checklistName: checkListName,
			itemCollection: itemsCollection
		};
		console.log('Valores a enviar', JSON.stringify(values));
		try {
			const submitChecklist = await fetch('./checklist', {
				method: 'POST',
				body: JSON.stringify(values)
			});
			const data = await submitChecklist.json()

			console.log('submitCheckList',data)
			response.message = data.message;
			response.status = data.status;
			console.log(response)
		} catch (error) {
			response.message = 'Todavía no terminamos de crear ésto';
			response.status = 'ERROR';
			//setTimeout(() => history.back(), 2500);
		}
		// let declarar constante que reciba el resultado de la operacion de carga, y asignar a segualert
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
			}
			element.category_id = categoryCollection.length; // Se modifica el id de la categoría para tratamiento interno

			itemCheckedCollection[element.category_id] = {
				// asigno la nueva categoría a la colección de elementos chequeados
				categoryId: element.category_id,
				itemId: []
			};
		}
		let myItemList = element.checkItems;
		myItemList.forEach((thisCheckitem) => {
			if (!itemCollection.includes(thisCheckitem)) {
				thisCheckitem.checkItem_id = itemCollection.length; // Se modifica el id del checkitem para tratamiento interno

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

<!-- Segualert! -->
{#if response.status !== ''}
	<SeguAlert message={response.message} status={response.status} path="checklists" />
{/if}

{#if itemCollection}
	<div id="dynamicChecklistName" data-tooltip="{nameTooltip} ⇩">
		<i class="fas fa-save {titleEdit}" />
		<input
			type="text"
			class="form-control {titleEdit}"
			on:keydown={({ key }) => key === 'Enter' && toggle()}
			bind:value={checkListName}
		/>
		<i class="fas fa-edit {titleH2}" on:dblclick={toggle} />
		<h2 class={titleH2} on:dblclick={toggle}>{checkListName}</h2>
	</div>
	<div id="generalContainer" class="row mb-3 g-3 justify-content dynamicContainer">
		<div id="panel" class="col-8 ">
			<Tabs>
				<!-- <svelte:component this={Tabs} {tabInfoProps}> -->
				<TabList>
					{#each categoryCollection as categoryCompound}
						<Tab>{categoryCompound.category.categoryName}</Tab>
					{/each}
				</TabList>

				{#each categoryCollection as categoryCompound}
					<TabPanel>
						<!--  -->
						<h3>{categoryCompound.category.categoryName}</h3>
						<!-- <input type="text" bind:value={categoryCompound.category.categoryName} /><br /> -->
						<MultiSelect
							id="itemsSelected"
							bind:value={itemCheckedCollection[categoryCompound.category.category_id].itemId}
						>
							{#each categoryCompound.category.checkItems as item}
								<option class="form-select" value={item.checkItem_id}>{item.item}</option>
							{/each}
						</MultiSelect>
					</TabPanel>
				{/each}
			</Tabs>
		</div>
		<div id="preview" class="col-4">
			<h3>Vista Previa</h3>
			<div class="dynamicContainer border preview-container">
				<h4 class="preview-header"><strong>{checkListName}</strong></h4>
				<!-- <p>Categoría (colección): {JSON.stringify(categoryCollection)}</p> -->
				{#each itemCheckedCollection as checkedItem}
					{#if checkedItem.itemId.length != 0}
						<div class="dynamicContainer" transition:fade>
							<h5 class="preview-header">
								{categoryCollection[checkedItem.categoryId].category.categoryName}
							</h5>
							{#each checkedItem.itemId as itemPerCategory}
								<!-- {#if itemCompound.selectedCategory.category_id == categoryCompound.category.category_id} -->
								<input class="form-check-input previewCheck" type="checkbox" />
								{itemCollection[itemPerCategory].checkitem.item}<br />
								<!-- {/if} -->
							{/each}
						</div>
					{/if}
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
						<input type="text" class="form-control addedButton" bind:value={newItemNameToAdd} />
						<select bind:value={selectedCategory}>
							{#each categoryCollection as categoryCompound}
								<option class="form-select" value={categoryCompound.category}
									>{categoryCompound.category.categoryName}</option
								>
							{/each}
						</select>
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
		background-color: #f9f8fc;
		/* background-color: rgba(222, 204, 231, 0.562); */
	}
	.hidden {
		display: none;
	}
	.visible {
		display: flex;
		visibility: visible;
	}

	/* Tootltips */
	[data-tooltip] {
		position: relative;
		z-index: 2;
		display: block;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease-out;
		transform: translate(-50%, 5px);
	}

	[data-tooltip]:before {
		position: left;
		bottom: 100%;
		left: 50%;
		margin-bottom: 5px;
		padding: 7px;
		width: 100%;
		min-width: 70px;
		max-width: 250px;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
		background-color: #000;
		background-color: hsla(0, 0%, 20%, 0.9);
		color: #fff;
		content: attr(data-tooltip);
		text-align: center;
		font-size: 14px;
		line-height: 1.2;
		transition: 0.2s ease-out;
	}

	[data-tooltip]:after {
		position: left;
		bottom: 100%;
		left: 50%;
		width: 0;
		border-top: 5px solid #000;
		border-top: 5px solid hsla(0, 0%, 20%, 0.9);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		/* content: ' '; */
		font-size: 0;
		line-height: 0;
	}

	[data-tooltip]:hover:before,
	[data-tooltip]:hover:after {
		visibility: visible;
		opacity: 1;
		transform: translate(-50%, 0);
	}
	[data-tooltip='false']:hover:before,
	[data-tooltip='false']:hover:after {
		visibility: hidden;
		opacity: 0;
	}
</style>
