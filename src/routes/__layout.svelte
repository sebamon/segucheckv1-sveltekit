<!-- Encabezado y pie de página general - No editar app.html, sino acá -->
<!-- src/routes/$layout.svelte -->
<script context="module" lang="ts">
    import Store from '$lib/store';
    import {setContext} from 'svelte';
</script>
<script lang="ts">
    import '../app.scss';
    import {session} from '$app/stores';
    const store=new Store($session)
    setContext<Store>('store',store);
</script>

<!-- <script>import "../app.scss";</script> -->
<slot></slot>


<!-- eeste es el de arian -->
<script lang="ts">
	import '../app.scss';
	// import NavbarHome from "$lib/NavbarHome.svelte";
	import Footer from '$lib/Footer.svelte';
</script>

<slot />

<Footer />
