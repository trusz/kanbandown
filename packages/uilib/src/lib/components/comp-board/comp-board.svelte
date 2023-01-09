<script lang="ts">
  	import type { Board, Column, Item } from "@kanbandown/shared/esmodule";
	import { CompColumn } from "../comp-column"
	import { createEventDispatcher } from "svelte"
  import EditableText from "$lib/components/editable-text/editable-text.svelte";

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
	function handleTitleChange(event:CustomEvent<string>){
		const newTitle = event.detail
		modifiedBoard.title = newTitle
		dispatchBoardChange()
	}
	function handleColumnTitleChange(columnIndex: number, newTitle:string){
		modifiedBoard.columns[columnIndex].title = newTitle
		dispatchBoardChange()
	}
	function handleTaskChange(columnIndex: number, taskIndex:number, newLabel: string){
		modifiedBoard.columns[columnIndex].items[taskIndex].label = newLabel
		dispatchBoardChange()
	}
</script>

<comp-board>
	<!-- <h1>{board.title}</h1> -->
	<EditableText value={board.title} tag="h1" on:change={handleTitleChange} />

	<ul>
	{#each board.columns as column, index}
		<li>
			<CompColumn
				title={column.title} 
				items={column.items} 
				on:move={(e) => handleMove(index, e.detail)}
				on:finalize={handleFinalize}
				on:titlechanged={(e) => handleColumnTitleChange(index, e.detail)}
				on:taskchange={(e)=> handleTaskChange(index, e.detail.taskIndex, e.detail.newLabel)}

			/>
		</li>
	{/each}
	</ul>

<style>
	comp-board ul{
		display: 		flex;
		flex-direction: row;
		gap:			1rem;
	}
</style>

</comp-board>