<script context='module'>
export async function load({ page, fetch }) {
		const res = await fetch('../users.json.ts').then((res) => res.json());
        console.log(res)
		const item = await res.json();
		return { props: { item } };
	}

</script>
<slot></slot>

<p>Hola Usuario</p>