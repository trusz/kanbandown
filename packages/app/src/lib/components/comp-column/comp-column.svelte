<script lang="ts">
	import type { Item } from "@kanbandown/shared/esmodule";
  	import CompItem from "../comp-item/comp-item.svelte";
	import { dndzone } from "svelte-dnd-action";
	import { createEventDispatcher } from "svelte"

	export let title: string
	export let items: Item[]
	

	const dispatch = createEventDispatcher()
	const dispatchFinalize = () => dispatch("finalize")
	function dispatchMove(items:Item[]){
		dispatch("move",items)
	}

	const flipDurationMs = 300;
    function handleDndConsider(e: CustomEvent<DndEvent<Item>>) {
		// console.log({
		// 	level:"dev", 
		// 	msg:"handleDndConsider",
		// 	trigger: e.detail.info.trigger,
		// 	source: e.detail.info.source,
		// })
        items = e.detail.items;
		dispatchMove(e.detail.items)
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Item>>) {
		if(e.detail.info.trigger !== "droppedIntoZone"){
			return
		}
		// console.log({
		// 	level:"dev", 
		// 	msg:"handleDndFinalize",
		// 	trigger: e.detail.info.trigger,
		// 	source: e.detail.info.source,
		// 	// details:e.detail.info.trigger, 
		// 	// changeInItemLength,
		// 	// items: items,
		// 	// newItem: e.detail.items,
		// })
        items = e.detail.items;
		dispatchFinalize()
    }
</script>


<comp-column >
	<h2>{title}</h2>
		<ul 
			use:dndzone="{{items, flipDurationMs}}" 
			on:consider="{handleDndConsider}" 
			on:finalize="{handleDndFinalize}"
		>
			{#each items as item(item.id)}
				<li>
					<CompItem label={item.label} />
					<!-- {item.label} -->
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
		display: flex;
		flex-direction: column;
		gap:0.5rem;
	}
</style>