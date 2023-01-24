<script lang="ts">

	// https://svelte.dev/repl/4949485c5a8f46e7bdbeb73ed565a9c7?version=3.55.1
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import type { Item } from "@kanbandown/shared/esmodule";
  	import { CompItem } from "../comp-item";
	import { Button } from "../button";
  	import { EditableText, type EditableTextAPI } from "../editable-text";
	import { IconAdd, IconEdit, IconColumnDelete, IconClearItems } from "../../icons"
	import { OverflowMenu } from "../overflow-menu"
	import { Toolbar } from "../toolbar"
	import { useBoardContext } from "@kanbandown/shared/esmodule"
  	import type { DropdownItem } from "$lib/components/dropdown";

	// 
	// Props
	// 
	export let index: number

	// 
	// Setup
	// 
	const { boardStore, saveBoard } = useBoardContext()
	
	type ShadowItem = Item & {
		isDndShadowItem: boolean
	}
	let items: (Item|ShadowItem)[]

	$: column = $boardStore.columns[index]
	$: items = column.items
	$: title = column.title


	// 
	// DND
	// 
	const flipDurationMs = 300;
	const dropTargetStyle = {};
    function handleDndConsider(e: CustomEvent<DndEvent<Item>>) {
        items = e.detail.items;
		$boardStore.setItems(index, items)
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Item>>) {
		if(e.detail.info.trigger !== "droppedIntoZone"){
			return
		}
        items = e.detail.items;
		saveBoard($boardStore)
    }

	// 
	// Column
	// 
	function handleTitleChange(event:CustomEvent<string>){
		const newTitle = event.detail
		$boardStore.setColumnTitle(index, newTitle)
		saveBoard($boardStore)
	}
	function handleDeleteColumn(){
		$boardStore.deleteColumn(index)
		saveBoard($boardStore)
	}
	let titleTextAPI: EditableTextAPI
	function handleEdit(){
		if(!titleTextAPI){ return }
		titleTextAPI.enableEditing()
	}
	function handleClearItems(){
		$boardStore.clearItems(index)
		saveBoard($boardStore)
	}

	// 
	// Task
	// 
	function handleTaskChange(taskIndex: number, newLabel:string){
		$boardStore.setItemLabel(index, taskIndex, newLabel)
		saveBoard($boardStore)
	}
	function handleDelete(taskIndex:number) {
		$boardStore.deleteItem(index, taskIndex)
		saveBoard($boardStore)
	}
	function addItem(){
		$boardStore.createItem("new", false, index, 0)
		saveBoard($boardStore)
	}

	// 
	// Options
	// 
	const headerOptions: DropdownItem[] = [
		{label:"Edit", 		    onClick: handleEdit,		 icon: IconEdit},
		{label:"Delete Column", onClick: handleDeleteColumn, icon: IconColumnDelete, dangerous: true},
		{label:"Clear Items",   onClick: handleClearItems,   icon: IconClearItems,   dangerous: true},
	]


</script>


<comp-column >
	<header>
		<EditableText 
			tag="h3" 
			value={title} 
			placeholder="<title>"
			on:change={handleTitleChange} 
			bind:api={titleTextAPI} 
		/>
		<span class="options">
			<Toolbar>
				<Button icon on:click={addItem} > <IconAdd /> </Button>
				<OverflowMenu items={headerOptions} />
			</Toolbar>
		</span>
	</header>
	<ul 
		use:dndzone="{{items, flipDurationMs, dropTargetStyle, type:"items"}}" 
		on:consider="{handleDndConsider}" 
		on:finalize="{handleDndFinalize}"
	>
		{#each items as item,ii(item.id)}
			<li>
				{#if Object.hasOwn(item,SHADOW_ITEM_MARKER_PROPERTY_NAME)}
					<div class='custom-shadow-item'>{item.label}</div>
				{/if}
				<CompItem 
					columnIndex={index}
					itemIndex={ii}
					on:linkclick
					on:change={(e) => handleTaskChange(ii, e.detail) } 
					on:delete={() => handleDelete(ii)}
				/>
			</li>
		{/each}
	</ul>
</comp-column>

<style>
	comp-column {
		display: block;
		width:13rem;
	}

	header {
		display: 		 flex;
		flex-direction:  row;
		gap: 			 0.5rem;
		align-items: 	 center;
		justify-content: space-between;
	}

	.options{
		opacity: 1;
		transition: opacity 0.1s;
	}
	header:hover .options {
		opacity: 1;
	}

	ul{
		display: 		flex;
		flex-direction: column;
		gap:			0.5rem;
		min-height: 	6rem;
		padding-bottom: 5rem;
	}
	li{
		position: relative;
	}

	.button-add-container{
		margin: 1rem 0;
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