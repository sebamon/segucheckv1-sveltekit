<script lang="ts">
	// Importar por nombre de componentes: https://sveltestrap.js.org/
	import { Button, Breadcrumb, BreadcrumbItem } from 'sveltestrap';
</script>

<svelte:head>
	<title>Checkgroups - SeguCheck</title>
</svelte:head>

<header class="row">
	<Breadcrumb>
		<BreadcrumbItem>
			<a href="/panel/">Inicio</a>
		</BreadcrumbItem>
		<BreadcrumbItem active>Checkgroups</BreadcrumbItem>
	</Breadcrumb>
	<div class="col-auto">
		<h1><i class="fas fa-clipboard-check me-4" />Checkgroups</h1>
		<h5>Descripción breve</h5>
	</div>
	<div class="col-2 ms-auto">
		<Button color="primary" href="/panel/checklists/nuevo">
			<i class="fas fa-plus me-2" />Nuevo
		</Button>
	</div>
</header>

<main>
	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle">
			<thead>
				<tr>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
					<th scope="col"><input type="search" placeholder="Filtrar" /></th>
				</tr>
				<tr>
					<th scope="col">ID checkgroup</th>
					<th scope="col">Nombre</th>
					<th scope="col">etc1</th>
					<th scope="col">etc2</th>
					<th scope="col">etc3</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1,001</td>
					<td>random</td>
					<td>data</td>
					<td>placeholder</td>
					<td>text</td>
				</tr>
				<tr>
					<td>1,002</td>
					<td>placeholder</td>
					<td>irrelevant</td>
					<td>visual</td>
					<td>layout</td>
				</tr>
				<tr>
					<td>1,003</td>
					<td>data</td>
					<td>rich</td>
					<td>dashboard</td>
					<td>tabular</td>
				</tr>
				<tr>
					<td>1,003</td>
					<td>information</td>
					<td>placeholder</td>
					<td>illustrative</td>
					<td>data</td>
				</tr>
				<tr>
					<td>1,004</td>
					<td>text</td>
					<td>random</td>
					<td>layout</td>
					<td>dashboard</td>
				</tr>
				<tr>
					<td>1,005</td>
					<td>dashboard</td>
					<td>irrelevant</td>
					<td>text</td>
					<td>placeholder</td>
				</tr>
				<tr>
					<td>1,006</td>
					<td>dashboard</td>
					<td>illustrative</td>
					<td>rich</td>
					<td>data</td>
				</tr>
				<tr>
					<td>1,007</td>
					<td>placeholder</td>
					<td>tabular</td>
					<td>information</td>
					<td>irrelevant</td>
				</tr>
				<tr>
					<td>1,008</td>
					<td>random</td>
					<td>data</td>
					<td>placeholder</td>
					<td>text</td>
				</tr>
				<tr>
					<td>1,009</td>
					<td>placeholder</td>
					<td>irrelevant</td>
					<td>visual</td>
					<td>layout</td>
				</tr>
				<tr>
					<td>1,010</td>
					<td>data</td>
					<td>rich</td>
					<td>dashboard</td>
					<td>tabular</td>
				</tr>
				<tr>
					<td>1,011</td>
					<td>information</td>
					<td>placeholder</td>
					<td>illustrative</td>
					<td>data</td>
				</tr>
				<tr>
					<td>1,012</td>
					<td>text</td>
					<td>placeholder</td>
					<td>layout</td>
					<td>dashboard</td>
				</tr>
				<tr>
					<td>1,013</td>
					<td>dashboard</td>
					<td>irrelevant</td>
					<td>text</td>
					<td>visual</td>
				</tr>
				<tr>
					<td>1,014</td>
					<td>dashboard</td>
					<td>illustrative</td>
					<td>rich</td>
					<td>data</td>
				</tr>
				<tr>
					<td>1,015</td>
					<td>random</td>
					<td>tabular</td>
					<td>information</td>
					<td>text</td>
				</tr>
			</tbody>
		</table>
	</div>
</main>
