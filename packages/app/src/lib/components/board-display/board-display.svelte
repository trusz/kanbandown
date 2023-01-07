<script lang="ts">
  	import type { Board, Column } from "@kanbandown/shared/esmodule";

	export let board: Board

	$: console.log({level:"dev", msg:"board-display title or columns change", board})
</script>

	<h1>{board.title}</h1>

	{#each board.columns as column}
		<h2>{column.title}</h2>
		<ul>
			{#each column.items as item}
				<li>
					{item.label}
				</li>
			{/each}
		</ul>
	{/each}

<style></style>