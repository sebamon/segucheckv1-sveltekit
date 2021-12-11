<script context="module">
	export async function load({ fetch, page }) {
		try {
			const response = await fetch(`./${page.params.slug}/checklist`);
			const data = await response.json();

			return {
				props: {
					data
				}
			};
		} catch (error) {
			console.error(error);
		}
	}
</script>
<script lang="ts">
    import CustomerDetails from '$lib/Details/CustomerDetails.svelte';
	
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';
	import CheckListV2 from '$lib/CheckListV2.svelte';

    export let data
    export let checkList = data.checkList
    export let isReadOnly = true
    let message = data.message
    let status = data.status
    
</script>

<svelte:head>
    <title>CheckList: {checkList.checkListName} - SeguCheck</title>
</svelte:head>
<!-- Encabezado -->

<header class="row">
    <Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists">CheckList</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/checklists/{checkList.checkListName}">{checkList.checkList_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalle</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />{checkList.checkListName}</h1>
		<p class="lead">Detalles del CheckGroup</p>
	</div>
</header>
{#if status !== 'OK'}
    <SeguAlert {message} {status} path='checklists' />
{/if}
{JSON.stringify(data)}

<br>
<CheckListV2 />