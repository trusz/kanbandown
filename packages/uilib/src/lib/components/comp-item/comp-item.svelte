<script lang="ts">
	import {createEventDispatcher} from "svelte";
  	import type { DropdownItem } from "$lib/components/dropdown";
	import { EditableText, useEditableTextAPI } from "$lib/components/editable-text";
	import { OverflowMenu } from "$lib/components/overflow-menu"
  	import { IconEdit, IconDelete, IconCreateNote } from "$lib/icons";
  	import { convertToFileName, renderMarkdown, useBoardContext, useSelectionContext } from "@kanbandown/shared/esmodule";

	// 
	// Props
	// 
	export let columnIndex: number
	export let itemIndex: number


	// 
	// Configs
	// 
	let menuItems: DropdownItem[] = [
		{label:"Edit", 	 	  onClick: handleEdit, 	     icon: IconEdit },
		{label:"Create Note", onClick: handleCreateNote, icon: IconCreateNote },
		{label:"Delete", 	  onClick: handleDelete, 	 icon: IconDelete, dangerous: true},
	]
	const editableTextAPI = useEditableTextAPI()
	const dispatch = createEventDispatcher()

	// 
	// Data
	// 
	const { boardStore, saveBoard } = useBoardContext()
	$: item = $boardStore?.columns[columnIndex]?.items[itemIndex]

	const { selectionStore, select, selectAdd } = useSelectionContext()
	$: selected = $selectionStore.indexOf(item) >= 0


	// 
	// Interaction
	// 
	function handleLabelChange(event:CustomEvent<string>){
		const newLabel = event.detail
		$boardStore?.setItemLabel(columnIndex, itemIndex, newLabel)
		saveBoard($boardStore)
	}

	function handleDelete(){
		$boardStore.deleteItemFromColumn(columnIndex, itemIndex)
		saveBoard($boardStore)
	}


	function handleEdit(){
		if(!editableTextAPI){ return }

		editableTextAPI.activate(item.id)
	}

	function handleCreateNote(){
		if(!editableTextAPI){ return }

		const label = item.label
		const parsedLabel = renderMarkdown(label)
		
		const div = document.createElement("div")
		div.innerHTML = parsedLabel
		const sanitizedLabel = div.innerText
		
		dispatch("createnote", sanitizedLabel)
		
		const generatedFilename = convertToFileName(sanitizedLabel)
		const newLabel = `[${sanitizedLabel}](./${generatedFilename})`
		$boardStore?.setItemLabel(columnIndex, itemIndex, newLabel)
		saveBoard($boardStore)
	}

	function handleClick(event: MouseEvent){
		if (event.metaKey) {
			selectAdd(item)
			return
		}
		select(item)
	}


</script>

<comp-item 
	class:selected 
	on:click={handleClick} 
	on:keypress 
	on:dblclick={() => editableTextAPI.activate(item.id)}
>
	<EditableText 
		tag="p"
		value={item?.label}
		placeholder="<description>"
		on:change={handleLabelChange} 
		on:linkclick
		id={item.id}
	/>
	<div class="menu">
		<OverflowMenu items={menuItems} />
	</div>
</comp-item>

<style>
	comp-item{
		width:			  100%;
		display: 	      grid;
		place-items: 	  center start;
		grid-template-columns: 1fr 2rem;

		border:  		  var(--vscode-textBlockQuote-border) thin solid;
		background-color: var(--vscode-textBlockQuote-background);
		box-shadow: 	  0px 0px 10px 2px var(--vscode-widget-shadow);
		border-radius: 	  4px;
		padding: 		  0.25rem;
		transition: 	  all 0.1s;
	}

	comp-item.selected,
	comp-item:hover{
		border-color: var(--vscode-inputValidation-infoBorder);
	}

	

	.menu{
		opacity:    0;
		transition: opacity 0.1s;
		
		display:     grid;
		place-items: start;
		height:      100%		
	}

	comp-item:hover .menu{
		opacity: 1;
	}

</style>