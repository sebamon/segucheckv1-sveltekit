<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let giveMeSomeInfo=""; 

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<slot></slot>
	{giveMeSomeInfo}
{/if}