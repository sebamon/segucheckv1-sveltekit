<script>
	// Alternar modo oscuro según preferencia del usuario:
	let isDarkMode = () => {
		// Se corrige error de que la ventana no está definida en primer arranque:
		if (typeof window != 'undefined') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			return true;
		}
	};
</script>

<footer class="pt-2 {isDarkMode ? 'text-light bg-dark' : 'bg-light'} border-top" id="contacto">
	<div class="container p-4">
		<!-- Formulario suscribirse -->
		<form id="formNewsletter">
			<div class="row justify-content-around mb-4">
				<div class="col-auto">
					<p class="pt-2 fw-bold">Seguí nuestras novedades por email</p>
				</div>
				<div class="col-md-5 col-12">
					<input
						type="email"
						id="emailNewsletter"
						class="form-control"
						placeholder="Deja tu correo electrónico"
						required
					/>
				</div>
				<div class="col-auto">
					<button type="submit" class="btn btn-primary">Suscribirse</button>
				</div>
			</div>
		</form>
		<div class="row justify-content-around">
			<div class="col-md-4">
				<h4 class="my-4">
					<img src="/img/segucheck-logo.svg" height="36" alt="logo" class="me-3" />SeguCheck © 2021
				</h4>
				<p>
					Desarrollado por
					<a
						href="https://github.com/sebamon/segucheckv1-sveltekit"
						class="text-decoration-none"
						class:text-secondary={isDarkMode}>SanguCheck Dozen</a
					>
				</p>
			</div>
			<div class="col-auto">
				<h5>Enlaces</h5>
				<ul class="list-unstyled">
					<li>
						<a href="/info/acerca" class="text-decoration-none" class:text-secondary={isDarkMode}
							>Acerca de</a
						>
					</li>
					<li>
						<a href="/descargar" class="text-decoration-none" class:text-secondary={isDarkMode}
							>Descargar app</a
						>
					</li>
					<li>
						<a href="/info/index" class="text-decoration-none" class:text-secondary={isDarkMode}
							>Tutoriales</a
						>
					</li>
					<li>
						<a href="/info/index" class="text-decoration-none" class:text-secondary={isDarkMode}
							>Novedades</a
						>
					</li>
				</ul>
			</div>
			<div class="col-auto">
				<h5>Nuestras redes sociales</h5>
				<a
					href="#!"
					class="text-decoration-none fs-1"
					alt="Facebook"
					title="Facebook"
					class:text-secondary={isDarkMode}><i class="fab fa-facebook-square me-1" /></a
				>
				<a
					href="#!"
					class="text-decoration-none fs-1"
					alt="Twitter"
					title="Twitter"
					class:text-secondary={isDarkMode}><i class="fab fa-twitter-square me-1" /></a
				>
				<a
					href="#!"
					class="text-decoration-none fs-1"
					alt="LinkedIn"
					title="LinkedIn"
					class:text-secondary={isDarkMode}><i class="fab fa-linkedin me-1" /></a
				>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		max-height: 100%;
	}
</style>