<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import EditableText from "$lib/components/editable-text/editable-text.svelte";

	export let label: string

	const dispatch = createEventDispatcher()

	function handleLabelChange(event:CustomEvent<string>){
		dispatch("change", event.detail)
	}
</script>

<comp-item>
	  <EditableText tag="p" value={label} on:change={handleLabelChange} />
</comp-item>

<style>
	comp-item{
		width:			  100%;
		display: 	      block;
		border:  		  var(--vscode-textBlockQuote-border) thin solid;
		background-color: var(--vscode-textBlockQuote-background);
		display: 		  inline-block;
		box-shadow: 	  0px 0px 10px 2px var(--vscode-widget-shadow);
		border-radius: 	  4px;
		padding: 		  0.5rem;
	}
	/* comp-item::after{
		content:"┋";
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
	} */
	p {
		padding: 0;
		margin: 0;
		/* border-right: var(--vscode-textBlockQuote-border) thin solid; */
		padding: 		  0.5rem 0.5rem;
	}
</style>