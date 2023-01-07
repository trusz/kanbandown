<script lang="ts">
	import type { Item } from "@kanbandown/shared/esmodule";
  import CompItem from "../comp-item/comp-item.svelte";

	export let title: string
	export let items: Item[]
</script>


<comp-column>
	<h2>{title}</h2>
		<ul>
			{#each items as item}
				<li>
					<CompItem label={item.label} />
					<!-- {item.label} -->
				</li>
			{/each}
		</ul>
</comp-column>

<style>
	comp-column {
		/* border: black thin solid; */
		display: block;
	}

	ul{
		display: flex;
		flex-direction: column;
		gap:0.5rem;
	}
</style>