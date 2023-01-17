<script lang="ts">
  	import { Board, Column, type Item, useBoardContext } from "@kanbandown/shared/esmodule";
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import { CompColumn } from "../comp-column"
  	import { EditableText } from "../editable-text";
	import { OverflowMenu } from "../overflow-menu"
	import { IconAdd } from "../../icons"
  	import { IconEdit } from "$lib/icons";
	import type { EditableTextAPI } from "$lib"

	const { boardStore, saveBoard } = useBoardContext()
	$: columns = $boardStore.columns

	type ShadowItem = Item & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]: boolean
	}
	
	function handleTitleChange(event:CustomEvent<string>){
		const newTitle = event.detail
		$boardStore.setTitle(newTitle)
		saveBoard($boardStore)
	}
	function handleCreateColumn(){
		$boardStore.createColumn("+new+")
		saveBoard($boardStore)
	}
	let titleTextAPI: EditableTextAPI
	function handleEditTitle(){
		if(!titleTextAPI){ return }
		titleTextAPI.enableEditing()
	}


	// 
	// DND
	//
	const flipDurationMs = 300;
	const dropTargetStyle = {};
	function handleDndConsider(e: CustomEvent<DndEvent<Column>>) {
		columns = e.detail.items;
		$boardStore.setColumn(columns)
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Column>>) {
		if(e.detail.info.trigger !== "droppedIntoZone"){
			return
		}
		columns = e.detail.items;
		$boardStore.setColumn(columns)
		saveBoard($boardStore)
    }

	// 
	// Title overflow menu
	// 
	let headerOptions = [
		{label:"Edit", 	     onClick: handleEditTitle,    icon: IconEdit },
		{label:"Add Column", onClick: handleCreateColumn, icon: IconAdd },
	]


</script>

<comp-board>
	<header>
		<EditableText value={$boardStore.title} tag="h2" on:change={handleTitleChange}  bind:api={titleTextAPI}/>
		<span class="options"><OverflowMenu items={headerOptions} /></span>
	</header>
	<hr />
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
				index={index}
				on:linkclick
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

	hr{
		border: 0;
		border-top: 1px solid var(--vscode-textSeparator-foreground);
		width: 100%;
	}

	.options {
		opacity: 1;
		transition: opacity 0.1s;
	}

	header:hover .options{
		opacity: 1;
	}

	comp-board ul{
		display: 		flex;
		flex-direction: row;
		gap:			1.5rem;
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
