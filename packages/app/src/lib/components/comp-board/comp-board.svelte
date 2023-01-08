<script lang="ts">
  	import type { Board, Column, Item } from "@kanbandown/shared/esmodule";
	import { CompColumn } from "../comp-column"
	import { createEventDispatcher } from "svelte"

	export let board: Board
	$: modifiedBoard = {...board} as Board

	const dispatch = createEventDispatcher()
	function dispatchBoardChange(){
		dispatch("board",modifiedBoard)
	}
	function handleMove(columnIndex:number, items: Item[]){
		modifiedBoard.columns[columnIndex].items = items
	}

	function handleFinalize(){
		dispatchBoardChange()
	}
</script>

<comp-board>
	<h1>{board.title}</h1>

	<ul>
	{#each board.columns as column, index}
		<li>
			<CompColumn
				title={column.title} 
				items={column.items} 
				on:move={(e) => handleMove(index, e.detail)}
				on:finalize={handleFinalize}
			/>
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