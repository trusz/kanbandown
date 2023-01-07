<script lang="ts">
  	import type { Board, Column } from "@kanbandown/shared/esmodule";
	import { CompColumn } from "../comp-column"

	export let board: Board

	$: console.log({level:"dev", msg:"board-display title or columns change", board})
</script>

<comp-board>
	<h1>{board.title}</h1>

	<ul>
	{#each board.columns as column}
		<li>
			<CompColumn title={column.title} items={column.items} />
		</li>
	{/each}
	</ul>

<style>
	ul{
		display: 		flex;
		flex-direction: row;
		gap:			1rem;
	}
</style>

</comp-board>