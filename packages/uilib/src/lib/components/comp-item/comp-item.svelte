<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { EditableText } from "$lib/components/editable-text";
	import { OverflowMenu } from "$lib/components/overflow-menu"

	export let label: string

	const dispatch = createEventDispatcher()

	function handleLabelChange(event:CustomEvent<string>){
		dispatch("change", event.detail)
	}

	function handleDelete(){
		dispatch("delete")
	}

	let menuItems = [
		{label:"Delete", onClick: handleDelete}
	]


</script>

<comp-item>
	<EditableText tag="p" value={label} on:change={handleLabelChange} on:linkclick />
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