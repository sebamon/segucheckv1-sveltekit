<script lang="ts">
	import CustomerDetails from '$lib/Details/CustomerDetails.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

    // Info cliente placeholder (esto lo recibe del servidor en estructura similar):
	let customerDetails = {
		customer_id: 1,
		businessName: 'YPF',
		contact: 'Juan Perez',
		phone: '2993334444',
		email: 'juan.perez@ejemplo.com'
	}

	// Configurar componente CustomerDetails para editar
	export let isReadOnly = false;
</script>

<svelte:head>
	<title>Editar cliente: {customerDetails.businessName} - SeguCheck</title>
</svelte:head>

<!-- Encabezado -->
<header>
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/clientes">Clientes</a>
		</BreadcrumbItem>
		<BreadcrumbItem>
			<a href="/panel/{customerDetails.customer_id}">{customerDetails.customer_id}</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Editar</BreadcrumbItem>
	</Breadcrumb>
</header>

<main>
	<!-- Formulario detalles cliente -->
	<CustomerDetails {...customerDetails} {isReadOnly} />
</main>
