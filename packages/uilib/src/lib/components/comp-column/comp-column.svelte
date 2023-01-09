<script lang="ts">
	import type { Item } from "@kanbandown/shared/esmodule";
  	import {CompItem} from "../comp-item";
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from "svelte-dnd-action";
	import { createEventDispatcher } from "svelte"
	import {fade} from 'svelte/transition';
	import {cubicIn} from 'svelte/easing';
	import {flip} from 'svelte/animate';


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
</script>


<comp-column >
	<h2>{title}</h2>
		<ul 
			use:dndzone="{{items, flipDurationMs, dropTargetStyle}}" 
			on:consider="{handleDndConsider}" 
			on:finalize="{handleDndFinalize}"
		>
			{#each items as item(item.id)}
				<li>
					{#if Object.hasOwn(item,SHADOW_ITEM_MARKER_PROPERTY_NAME)}
						<div class='custom-shadow-item'>{item.label}</div>
					{/if}
					<CompItem label={item.label} />
				</li>
			{/each}
		</ul>
</comp-column>

<style>
	comp-column {
		/* border: black thin solid; */
		display: block;
	}

	ul{
		display: 		flex;
		flex-direction: column;
		gap:			0.5rem;
		min-height: 	5rem;
		min-width:  	10rem;
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
	}
</style>