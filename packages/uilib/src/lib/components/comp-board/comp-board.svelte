<script lang="ts">
  	import { Board, type Column, type Item } from "@kanbandown/shared/esmodule";
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import { CompColumn } from "../comp-column"
	import { createEventDispatcher } from "svelte"
  	import EditableText from "$lib/components/editable-text/editable-text.svelte";

	export let board: Board
	$: modifiedBoard = Object.setPrototypeOf({...board}, Board.prototype) as Board

	type ShadowItem = Item & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]: boolean
	}
	$: columns = [...board.columns]

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
	function handleTaskDelete(columnIndex: number, taskIndex: number){
		// modifiedBoard.columns[columnIndex].deleteItem(taskIndex)
		modifiedBoard.deleteItemFromColumn(columnIndex, taskIndex)
		dispatchBoardChange()
	}
	function handleTaskAdd(columnIndex: number){
		modifiedBoard.createItem("new",false,columnIndex, 0)
		dispatchBoardChange()
	}

	// 
	// DND
	//
	const flipDurationMs = 300;
	const dropTargetStyle = {};
	function handleDndConsider(e: CustomEvent<DndEvent<Column>>) {
		columns = e.detail.items;
		modifiedBoard.columns = columns
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Column>>) {
		if(e.detail.info.trigger !== "droppedIntoZone"){
			return
		}
		columns = e.detail.items;
		modifiedBoard.columns = columns
		dispatchBoardChange()
    }

</script>

<comp-board>
	<EditableText value={board.title} tag="h1" on:change={handleTitleChange} />

	<ul
		use:dndzone="{{items: columns, flipDurationMs, dropTargetStyle, type:"columns"}}" 
		on:consider="{handleDndConsider}" 
		on:finalize="{handleDndFinalize}"
	>
	{#each columns as column,index(column.id)}
		<li>
			{#if Object.hasOwn(column,SHADOW_ITEM_MARKER_PROPERTY_NAME)}
					<div class='custom-shadow-item'><h1>{column.title}</h1></div>
			{/if}
			<CompColumn
				title={column.title} 
				items={column.items} 
				on:move={(e) => handleMove(index, e.detail)}
				on:finalize={handleFinalize}
				on:titlechanged={(e) => handleColumnTitleChange(index, e.detail)}
				on:taskchange={(e)=> handleTaskChange(index, e.detail.taskIndex, e.detail.newLabel)}
				on:taskadd={() => handleTaskAdd(index)}
				on:taskdelete={ (e) => handleTaskDelete(index, e.detail)}
			/>
		</li>
	{/each}
	</ul>

<style>
	comp-board ul{
		display: 		flex;
		flex-direction: row;
		gap:			1rem;
		min-height: 	6rem;
	}
	li{
		position: relative;
	}
	.custom-shadow-item {
		position: absolute;
		top: 	  0; 
		left:	  0; 
		right: 	  0; 
		bottom:   0;
		
		visibility:  visible;
		border: 	 1px dashed grey;
		background:  var(--vscode-list-activeSelectionBackground);
		opacity: 	 0.9;
		margin: 	 0;
		display: 	 flex;
		align-items: center;
		padding: 	 0.5rem;
		border-radius: 4px;
	}
</style>

</comp-board>