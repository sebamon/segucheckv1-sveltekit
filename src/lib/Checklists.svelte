<script context="module">
	export async function load() {
		const response = await fetch('http://localhost:3000/api/category');
		const data = await response.json();
		//console.log(data)
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	let data;


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
		verifyItem_id?: number;
		checkItem: checkItem;
		checked: boolean;
		observation: string;
	}; //Listo model verifyItem

	type verify = {
		verify_id?: number;
		list: verifyItem[];
	};

	type checkList = {
		checkList_id?: number;
		checkListName: string;
		verify: verify;
	};

	

	/* Modales!! */
	let open = false;
	const toggle = () => {
		open = !open;
	type itemCompound = {
		checkitem: checkitem;
		itemButton: number;
		selectedCategory: checkcategory;
		active: boolean;
	};

	type categoryCompound = {
		category: checkcategory;
		isNew: boolean;
	};

	let categoryCollection: categoryCompound[] = [];
	let itemCollection: itemCompound[] = [];
	let itemVerification: verifyItem[];
	let verification: verify = {
		list: itemVerification
	};
	let thisChecklist: checkList = {
		checkListName: 'Nombre de la Checklist',
		verify: verification
	};

	const addCategory = () => {
		let newCategory: checkcategory = {
			category_id: categoryCollection.length,
			categoryName: 'Categoría nueva'
		};
		categoryCollection = [
			...categoryCollection,
			{
				category: newCategory,
				isNew: true
			}
		];
	};

	const addItem = () => {
		let newItem: checkitem = {
			checkItem_id: itemCollection.length,
			item: 'Item nuevo',
			description: 'Descripción del ítem'
		};
		itemCollection = [
			...itemCollection,
			{
				checkItem: newItem,
				itemButton: newItem.checkItem_id,
				selectedCategory: categoryCollection[0].category,
				active: true
			}
		];
	};

	const removeItem = (item_id) => {
		itemCollection[item_id].active = false;
	};

	const submit = () => {
		alert('Yey! Vamos a enviar ésto!');
	};

	//onMount(() => {
		load().then((data) => {
			let categories = data.props.data.categories;
			if (!categories) {
				addCategory();
			} else {
				categories.forEach((element) => {
					element.category_id = categoryCollection.length;
					let categoryToLoad: categoryCompound = {
						category: element,
						isNew: false
					};
					categoryCollection.push(categoryToLoad);
				});
			}
			addItem();
		});
	//});
</script>

<svelte:head>
	<title>Nueva Checklist - SeguCheck</title>
</svelte:head>

<div id="dynamicChecklistName">
	<input type="text" class="form-control" bind:value={thisChecklist.checkListName} />
</div>

<div id="dinamycCategory" class="row mb-3 g-3 justify-content dynamicContainer">
	<div id="listCreation" class="col-2">
		<h3>Categorías</h3>
		<button class="btn btn-primary" on:click={addCategory}>Nueva categoría</button>
		{#each categoryCollection as categoryCompound}
			{#if categoryCompound.isNew}
			<div class="dynamicContainer">
				<input
					type="text"
					class="form-control"
					id={`category-${categoryCompound.category.category_id}`}
					bind:value={categoryCompound.category.categoryName}
				/>
			</div>
			{/if}
		{/each}
	</div>

	<div id="dynamicItem" class="col-5">
		<h3>Elementos</h3>
		<button class="btn btn-primary" on:click={addItem}>Nuevo item</button>
		{#each itemCollection as itemCompound}
			<div class="dynamicContainer">
				{#if itemCompound.active == true}
					<div class="row">
						<div class="col-9">
							<input
								type="text"
								class="form-control addedButton"
								id={`item-${itemCompound.checkItem.item_id}`}
								bind:value={itemCompound.checkItem.item}
							/>
						</div>
						<div class="col-3">
							<button
								class="btn btn-primary"
								on:click={removeItem(itemCompound.checkItem.checkItem_id)}>Quitar item</button
							>
						</div>
					</div>
					<select bind:value={itemCompound.selectedCategory}>
						{#each categoryCollection as categoryCompound}
							<option
								class="form-select"
								value={categoryCompound.category}
								id={categoryCompound.category.category_id}
								>{categoryCompound.category.categoryName}</option
							>
						{/each}
					</select>
				{/if}
			</div>
		{/each}
	</div>

	<div id="checklistPreview" class="col-5">
		<h3>Vista Previa</h3>
		<div class="dynamicContainer border preview-container">
			<h4 class="preview-header"><strong>{thisChecklist.checkListName}</strong></h4>
			<!-- <p>Categoría (colección): {JSON.stringify(categoryCollection)}</p> -->
			<!-- <p>Item (colección): {JSON.stringify(itemCollection)}</p> -->
			{#each categoryCollection as categoryCompound}
				<h5 class="preview-header">{categoryCompound.category.categoryName}</h5>
				{#each itemCollection as itemCompound}
					{#if itemCompound.active == true}
						{#if itemCompound.selectedCategory.category_id == categoryCompound.category.category_id}
							<input class="form-check-input previewCheck" type="checkbox" />
							{itemCompound.checkItem.item}<br />
						{/if}
					{/if}
				{/each}
			{/each}
		</div>
	</div>
</div>

<button class="btn btn-primary" on:click={submit}>Crear checklist</button>

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
	}
</style>
