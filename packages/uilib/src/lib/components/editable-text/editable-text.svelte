<script lang="ts">
	import {createEventDispatcher} from "svelte"
	export let value: string = ""
	export let newValue = value
	export let tag: SupportedTags = "span"
	type SupportedTags = "h1" | "h2" | "span" | "p"

	const dispatch = createEventDispatcher()

	export const classMap: {[tag in SupportedTags]: string} ={
		h1:   "h1",
		h2:   "h2",
		span: "span",
		p: 	  "p",
	}

	$: sizeClass = classMap[tag]

	let isEditing = false
	function enableEditing(){
		isEditing = true
	}

	function focus(node: HTMLInputElement){
		node.focus()
	}

	function cancelEditing(){
		isEditing = false
		newValue = value
	}
	
	function dispatchChangeOnEnter(event: KeyboardEvent){
		if(event.code !== "Enter"){ return }
		dispatch("change",newValue)
		value=newValue
		isEditing = false

	}

</script>
<editable-text>
	{#if !isEditing}
	<svelte:element 
		this={tag} 
		class="text" 
		on:dblclick={enableEditing}
		on:keypress={()=>{}}
	>
		{value}
	</svelte:element>
	{:else}
		<input
			use:focus
			on:blur={cancelEditing}
			bind:value={newValue}
			on:keydown={dispatchChangeOnEnter}
			class={sizeClass}
		/>
	{/if}
</editable-text>


<style>

	.text {
		/* min-width: 10rem; */
		max-width: 20rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0rem 1rem;
	}

	.h1{
		font-size: 2em;
	}

	.h2{
		font-size: 1.5em;
	}

	.p,
	.span{
		font-size: 1em;
		word-wrap: break-word;
	}

	input{
		max-width: 20rem;
		padding: 0 0.5rem;
	}
</style>