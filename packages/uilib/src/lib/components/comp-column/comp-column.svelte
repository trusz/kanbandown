<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import type { Item } from "@kanbandown/shared/esmodule";
  	import { CompItem } from "../comp-item";
	import { Button } from "../button";
  	import { EditableText } from "../editable-text";
	import { IconAdd } from "../../icons"


	type ShadowItem = Item & {
		isDndShadowItem: boolean
	}
	export let title: string
	export let items: (Item|ShadowItem)[]
	

	const dispatch = createEventDispatcher()
	const dispatchFinalize = () => dispatch("finalize")
	function dispatchMove(items:Item[]){
		dispatch("move",items)
	}

	const flipDurationMs = 300;
	const dropTargetStyle = {};
    function handleDndConsider(e: CustomEvent<DndEvent<Item>>) {
        items = e.detail.items;
		dispatchMove(e.detail.items)
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Item>>) {
		if(e.detail.info.trigger !== "droppedIntoZone"){
			return
		}
        items = e.detail.items;
		dispatchFinalize()
    }
	function handleTitleChange(event:CustomEvent<string>){
		const newTitle = event.detail
		dispatch("titlechanged", newTitle)
	}
	function handleTaskChange(taskIndex: number, newLabel:string){
		dispatch("taskchange",{taskIndex, newLabel})
	}
	function handleDelete(taskIndex:number) {
		dispatch("taskdelete", taskIndex)
	}
	function addItem(){
		dispatch("taskadd")
	}
</script>


<comp-column >
	<EditableText tag="h2" value={title} on:change={handleTitleChange} />
	<div class="button-add-container">
		<Button block on:click={addItem}> <IconAdd /> </Button>
	</div>
	<ul 
		use:dndzone="{{items, flipDurationMs, dropTargetStyle}}" 
		on:consider="{handleDndConsider}" 
		on:finalize="{handleDndFinalize}"
	>
		{#each items as item,index(item.id)}
			<li>
				{#if Object.hasOwn(item,SHADOW_ITEM_MARKER_PROPERTY_NAME)}
					<div class='custom-shadow-item'>{item.label}</div>
				{/if}
				<CompItem 
					label={item.label} 
					on:change={(e) => handleTaskChange(index, e.detail) } 
					on:delete={() => handleDelete(index)}
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

	ul{
		display: 		flex;
		flex-direction: column;
		gap:			0.5rem;
		min-height: 	6rem;
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