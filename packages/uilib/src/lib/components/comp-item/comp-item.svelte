<script lang="ts">
	import { EditableText, type EditableTextAPI } from "$lib/components/editable-text";
	import { OverflowMenu } from "$lib/components/overflow-menu"
  	import { IconEdit, IconDelete } from "$lib/icons";
  	import { useBoardContext } from "@kanbandown/shared/esmodule";

	export let columnIndex: number
	export let itemIndex: number

	const { boardStore, saveBoard } = useBoardContext()
	$: item = $boardStore?.columns[columnIndex]?.items[itemIndex]

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

		editableTextAPI.enableEditing()
	}

	let menuItems = [
		{label:"Edit", 	 onClick: handleEdit, 	icon: IconEdit },
		{label:"Delete", onClick: handleDelete, icon: IconDelete, color:"var(--vscode-editorError-foreground)"},
	]

	let editableTextAPI: EditableTextAPI


</script>

<comp-item>
	<EditableText 
		tag="p" 
		value={item?.label} 
		placeholder="<description>"
		on:change={handleLabelChange} 
		on:linkclick  
		bind:api={editableTextAPI}
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
		padding: 		  0.5rem;
		transition: 	  all 0.1s;
	}

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