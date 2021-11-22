<script context="module" lang="ts">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script lang="ts">
	// ./info/__layout.svelte: Encabezado y contenedor de sección: información / blog

	// Animación al cambiar entre páginas: https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	import Transition from '$lib/Transition.svelte';
	export let key;
	import NavbarHome from '$lib/NavbarHome.svelte';
</script>

<!-- Menú de navegación -->
<NavbarHome />

<!-- Contenido principal -->
<Transition refresh={key}>
	<div class="container p-4 shadow-lg">
		<slot />
	</div>
</Transition>
