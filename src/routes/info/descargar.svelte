<script lang="ts">
	// Carrusel diapositivas:
	import { onMount } from 'svelte';
	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
</script>

<svelte:head>
	<title>Descargar app - SeguCheck</title>
</svelte:head>

<main>
	<h1>Descarga la app</h1>
	<hr />
	<div class="row my-4 align-items-center justify-content-around">
		<div class="col-6">
			<p class="lead">Estás a un paso de manejar tus documentos de forma más rápida, desde tu celular.</p>
	<a href="https://play.google.com/store/apps" class="btn btn-lg btn-primary">
		<i class="fab fa-google-play mx-2" />Descargar desde Google Play Store
	</a>
		</div>
		<div class="col-6 col-md-4 col-lg-3" id="showCarousel">
			<svelte:component
				this={Carousel}
				autoplay
				autoplayDuration={5000}
				pauseOnFocus
				arrows={false}
				dots={false}
				let:loaded
			>
				<img src="/img/screen-app1.png" alt="Ejemplo de aplicación móvil: Menú principal" />
				<img src="/img/screen-app2.png" alt="Ejemplo de aplicación móvil: Escanear QR" />
			</svelte:component>
		</div>
	</div>
	
	
</main>
