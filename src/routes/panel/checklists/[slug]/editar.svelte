<script context="module">
	export async function load({ fetch, page }) {
		try {
			const response = await fetch(`./checklist`);
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
	import { dataset_dev } from 'svelte/internal';
	import { Breadcrumb, BreadcrumbItem, TabContent, TabPane } from 'sveltestrap';
	import SeguAlert from '$lib/SeguAlert.svelte';

    export let data
    export let checkGroup = data.checkGroup
    export let isReadOnly = false
    let message = data.message
    let status = data.status
    
</script>

<svelte:head>
    <title>CheckList: {checkGroup.groupName} - SeguCheck</title>
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
			<a href="/panel/checklists/{checkGroup.checkItemGroup_id}">{checkGroup.checkItemGroup_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Detalle</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-industry me-4" />{checkGroup.groupName}</h1>
		<p class="lead">Detalles del CheckGroup</p>
	</div>
</header>
{#if status !== 'OK'}
    <SeguAlert {message} {status} path='checklists' />
{/if}
{JSON.stringify(data)}

<br>
ACA VA EL COMPONENTE DE CHECKLIST