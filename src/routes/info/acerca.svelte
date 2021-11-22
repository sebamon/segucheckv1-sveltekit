<svelte:head>
	<title>Acerca de - SeguCheck</title>
</svelte:head>

<main>
	<h1>
		Acerca de SeguCheck <img
			src="/img/segucheck-logo.svg"
			alt="Logo SeguCheck"
			title="Logo SeguCheck"
			class="img-fluid m-3"
			style="height:60px"
		/>
	</h1>
	<ul class="lead">
		Creado por:
		<li><strong>Sebastián Mon</strong></li>
		<li><strong>Arian Acevedo</strong></li>
		<li><strong>Federico García Cendra</strong></li>
	</ul>
	<p>
		Este es nuestro proyecto final para la carrera <strong
			>Tecnicatura Universitaria en Desarrollo Web</strong
		>, de la <strong>Universidad Nacional del Comahue</strong>, en Argentina.
	</p>
	<p>Su función es simplificar las tareas diarias de control documental, y debe:</p>
	<ul>
		<li>Reunir toda información pertinente al trabajo seguro en el área correspondiente</li>
		<li>Presentar la documentación de forma ordenada al cliente</li>
		<li>Llevar un registro de los operarios con sus trabajos y vencimientos</li>
	</ul>
	<p>Por lo tanto, esta aplicación permitirá:</p>
	<ul>
		<li>
			Registrar los operarios y vehículos, así como también las empresas clientes y sus locaciones
		</li>
		<li>
			Almacenar las habilitaciones (con vencimiento) de los operarios y vehículos, de forma
			periódica
		</li>
		<li>
			Generar una tarea que especifique los requisitos y operarios que acudirán al lugar de trabajo
			del cliente
		</li>
		<li>
			Registrar los &quot;checklists&quot; o listas de verificación de los requisitos y elementos
			necesario para el trabajo
		</li>
		<li>Generar un código QR con acceso de invitado para ver la documentación en línea</li>
	</ul>

	<h2 class="mt-5">Librerías y recursos utilizados</h2>
	<hr />
	<p>
		El proyecto se encuentra desarrollado mediante el framework <a href="https://svelte.dev/"
			><strong>Svelte</strong></a
		>
		junto a <a href="https://kit.svelte.dev/"><strong>SvelteKit</strong></a>.
	</p>
	<ul>
		<li>
			Librería CSS: <a href="https://getbootstrap.com/" rel="nofollow">
				<strong>Bootstrap</strong>
			</a>, mediante tema
			<a href="https://bootswatch.com/pulse/" rel="nofollow"><strong>Bootswatch Pulse</strong></a>
			y librería de componentes
			<a href="https://sveltestrap.js.org/" rel="nofollow"><strong>Sveltestrap</strong></a>
		</li>
		<li>
			Manejo de datos: <a href="https://www.prisma.io/" rel="nofollow">
				<strong>Prisma ORM</strong>
			</a>
		</li>
		<li>
			Formularios: <a href="https://svelte-forms-lib-sapper-docs.vercel.app/" rel="nofollow"
				><strong>svelte-forms-lib</strong>
			</a>
			junto a la validación mediante
			<a href="https://github.com/jquense/yup"><strong>Yup</strong></a>
		</li>
		<li>
			Manejo de fechas:
			<a href="https://momentjs.com/" rel="nofollow"><strong>Moment.js</strong></a>
		</li>
		<li>
			Copiar al portapapeles:
			<a href="https://github.com/henriquecaraujo/svelte-copy-to-clipboard">
				<strong>svelte-copy-to-clipboard</strong>
			</a>
		</li>
		<li>
			Códigos QR: <del
				><a href="https://rapidapi.com/linqr-linqr-default/api/qrcode3/" rel="nofollow">LinQR</a> y</del
			>
			<a href="https://developers.google.com/chart/infographics/docs/qr_codes" rel="nofollow"
				><strong>Google Charts</strong></a
			>
		</li>
		<li>
			Autenticación: <a href="https://github.com/Dan6erbond/sk-auth"><strong>sk-auth</strong></a> y
			<a href="https://github.com/auth0/node-jsonwebtoken"><strong>jsonwebtoken</strong></a>
		</li>
		<li>
			Aplicación móvil (a probar): <a href="https://svelte-native.technology" rel="nofollow"
				><strong>Svelte Native</strong></a
			>
		</li>
	</ul>
	<h2 class="mt-5">Estilos</h2>
	<hr />
	<h3>Tipografías</h3>
	<ul class="lead my-3">
		<li>
			Títulos: <a href="https://fonts.google.com/specimen/Poppins"><strong>Poppins</strong></a>
		</li>
		<li>
			Cuerpo: <a href="https://fonts.google.com/specimen/Archivo"><strong>Archivo</strong></a>
		</li>
	</ul>
	<h3>Paleta de colores</h3>
	<div class="row row-cols-3">
		<h3 class="bg-light text-dark p-5">Texto oscuro: #17141f</h3>
		<h3 class="bg-light text-muted p-5">Texto gris: #868e96</h3>
		<h3 class="bg-dark text-light p-5">Texto claro: #f9f8fc</h3>
	</div>
	<div class="row row-cols-2">
		<h3 class="bg-primary text-light p-5">Primario: #593196</h3>
		<h3 class="bg-secondary p-5">Secundario: #a991d4</h3>
	</div>
	<div class="row row-cols-4">
		<h4 class="bg-info p-5">Info: #009cdc</h4>
		<h4 class="bg-success p-5">Éxito: #13b955</h4>
		<h4 class="bg-warning p-5">Atención: #efa31d</h4>
		<h4 class="bg-danger p-5">Peligro: #fc3939</h4>
	</div>
</main>
