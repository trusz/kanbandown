<script lang="ts">
  	import { 
		Column, 
		type Item, 
		useBoardContext, 
		useSelectionContext,
} from "@kanbandown/shared/esmodule";
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
	function handleDescriptionChange(event:CustomEvent<string>){
		const newDescription = event.detail
		$boardStore.setDescription(newDescription)
		saveBoard($boardStore)
	}
	function handleCreateColumn(){
		$boardStore.createColumn("")
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

	// 
	// Copy & Paste
	// 
	const { selectionStore, reset, selectMultiple } = useSelectionContext()

	function handlePaste(event:ClipboardEvent){
		const text = event.clipboardData?.getData('text/json');
		if(!text){ return }
		const items = JSON.parse(text) as Item[]

		const newItems: Item[] = []
		for(const item of items){
			$boardStore.createItem(item.label,false,0,0)
			const newItem = $boardStore.columns[0].items[0]
			newItems.push(newItem)
		}
		
		saveBoard($boardStore)
		selectMultiple(newItems)		
	}

	function handleCopy(event:ClipboardEvent){
		const items = $selectionStore
		if(items.length === 0){ return }

		event.clipboardData?.setData('text/json', JSON.stringify(items));
    	event.preventDefault();
	}

	function handleCut(event:ClipboardEvent){

		handleCopy(event)
		
		const items = $selectionStore
		for(const item of items){
			const [columnIndex, itemIndex] = $boardStore.findItemIndexes(item)
			const foundIndexes = columnIndex >= 0 && itemIndex >= 0
			if(!foundIndexes){ continue }

			$boardStore.deleteItemFromColumn(columnIndex, itemIndex)
		}
		saveBoard($boardStore)
	}

	function resetSelection(e: MouseEvent){
		const target = e.target as HTMLElement
		if(hasCompItemParent(target)){ return }

        reset()
    }
	
	function hasCompItemParent(e: HTMLElement): boolean {
		
		let parent = e.parentElement
		while(parent){
			if(parent.localName === "comp-item"){
				return true
			}

			parent = parent.parentElement
		} 

		return false
	}



</script>

<svelte:body 
	on:paste={handlePaste} 
	on:copy|preventDefault={handleCopy} 
	on:cut|preventDefault={handleCut} 
	on:click|capture={resetSelection} 
/>

<comp-board>
	<header>
		<EditableText 
			value={$boardStore.title} 
			placeholder="<Project Title>"
			tag="h2" 
			on:change={handleTitleChange}  
			bind:api={titleTextAPI}
		/>
		<span class="options"><OverflowMenu items={headerOptions} /></span>
	</header>
	<EditableText
		value={$boardStore.description}
		placeholder="<description>"
		on:change={handleDescriptionChange}
		tag="span"
	/>
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
