<script lang="ts">
  	import { Board, Column, type Item } from "@kanbandown/shared/esmodule";
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import { CompColumn } from "../comp-column"
	import { createEventDispatcher } from "svelte"
  	import { EditableText } from "../editable-text";
	import { OverflowMenu } from "../overflow-menu"

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
	function handleCreateColumn(){
		modifiedBoard.createColumn("+new+")
		dispatchBoardChange()
	}
	function handleDeleteColumn(columnIndex: number){
		modifiedBoard.deleteColumn(columnIndex)
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

	// 
	// Title overflow menu
	// 
	let headerOptions = [
		{label:"+Column", onClick: handleCreateColumn}
	]

</script>

<comp-board>
	<header>
		<EditableText value={board.title} tag="h2" on:change={handleTitleChange} />
		<span class="options"><OverflowMenu items={headerOptions} /></span>
	</header>
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
				on:linkclick
				on:move={(e) => handleMove(index, e.detail)}
				on:finalize={handleFinalize}
				on:titlechanged={(e) => handleColumnTitleChange(index, e.detail)}
				on:taskchange={(e)=> handleTaskChange(index, e.detail.taskIndex, e.detail.newLabel)}
				on:taskadd={() => handleTaskAdd(index)}
				on:taskdelete={ (e) => handleTaskDelete(index, e.detail)}
				on:deletecolumn={ () => handleDeleteColumn(index) }
			/>
		</li>
	{/each}
	</ul>

</comp-board>

<style>

	comp-board {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	header{
		display: 		flex;
		gap:	   	    0.5rem;
		flex-direction: row;
		align-items: 	center;
	}

	.options {
		opacity: 0;
		transition: opacity 0.1s;
	}

	header:hover .options{
		opacity: 1;
	}

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
