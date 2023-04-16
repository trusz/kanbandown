<script lang="ts">
	import {createEventDispatcher} from "svelte"
	import {marked} from "marked"
	import { 
		markedExtensionPrio, 
		markedExtensionProject, 
		markedExtensionTag,
		markedExtensionMention,
		markedExtensionImageRenderer,
	} from "@kanbandown/shared/esmodule"

	import { useEditableTextAPI } from "./editable-text_api";

	// 
	// Internal Types
	// 
	type SupportedTags = "h1" | "h2" | "h3" | "h4" | "span" | "p"

	// 
	// Props
	// 
	export let tag: SupportedTags = "span"
	export let value: string = ""
	export let placeholder: string | undefined = undefined
	export let id: unknown = Symbol()

	// 
	// Derived
	// 
	$: showValue = value !== ""
	$: safeValue = value ? value : "" // value can be set to undefined
	$: textAreaValue = safeValue.replaceAll("<br />", "\n")

	const extensions = [
		markedExtensionPrio, 
		markedExtensionProject,
		markedExtensionTag,
		markedExtensionMention,
		markedExtensionImageRenderer,
	]
	// @ts-ignore TODO: correct typing
	marked.use({ extensions: extensions});
	marked.setOptions({gfm:true, breaks:true})
	$: renderedValue = marked.parse(safeValue)

	// 
	// Setup
	// 
	const dispatch = createEventDispatcher()

	const api = useEditableTextAPI()
	const state = api.useState(id)

	export const classMap: {[tag in SupportedTags]: string} ={
		h1:   "h1",
		h2:   "h2",
		h3:   "h3",
		h4:   "h4",
		span: "span",
		p: 	  "p",
	}

	$: sizeClass = classMap[tag]
	$: isEditing = $state.isEditing

	function focus(node: HTMLTextAreaElement){
		node.focus()
	}

	function cancelEditing(){
		api.deactivate(id)
		safeValue = value
	}
	
	function dispatchChangeOnEnter(event: KeyboardEvent){
		if(event.code !== "Enter" || event.shiftKey){ return }
		dispatch("change",textAreaValue)
		// value=newValue
		safeValue=textAreaValue
		isEditing = false
		api.deactivate(id)

	}

	function dispatchLinkClick(href: string){
		dispatch("linkclick", href)
	}

	
	// https://github.com/microsoft/vscode/blob/ac88f33e2ca851839a3cd2a972377558f654e0a6/extensions/markdown-language-features/preview-src/index.ts#L249
	function handleLinkClicks(event: MouseEvent){
		const passThroughLinkSchemes = ['http:', 'https:', 'mailto:', 'vscode:', 'vscode-insiders:'];
		let node: any = event.target;
		while (node) {
			if (node.tagName && node.tagName === 'A' && node.href) {
				if (node.getAttribute('href').startsWith('#')) {
					return;
				}
				
				let hrefText = node.getAttribute('href');
				if (passThroughLinkSchemes.some(scheme => hrefText.startsWith(scheme))) {
					return;
				}

				// If original link doesn't look like a url, delegate back to VS Code to resolve
				if (!/^[a-z\-]+:/i.test(hrefText)) {
					dispatchLinkClick(hrefText)
					// messaging.postMessage('openLink', { href: hrefText });
					event.preventDefault();
					event.stopPropagation();
					return;
				}

				return;
			}
			node = node.parentNode;
		}
	}

	

</script>

<editable-text on:click={handleLinkClicks} on:keypress>
	{#if !isEditing }
	<svelte:element 
		this={tag} 
		class="text" 
		class:placeholder={!showValue}
		on:dblclick={() => api.activate(id)}
		on:keypress={()=>{}}
	>

		{#if showValue}
			{@html renderedValue}
		{:else}
			{placeholder}
		{/if}


	</svelte:element>
	{:else}
	<div class="growing-wrapper" data-replicated-value={textAreaValue}>
		<textarea
			rows=1
			use:focus
			on:blur={cancelEditing}
			bind:value={textAreaValue}
			on:keydown={dispatchChangeOnEnter}
			class={sizeClass}
		/>
	</div>
	{/if}
</editable-text>


<style>

	:root {
		--padding: 0.25rem;
	}

	editable-text{
		/* display: inline-grid; */
		display: inline-block;
	}

	editable-text :global(p){
		/* TODO: either 0 or 0.5rem */
		margin: 0rem 0;
	}

	.growing-wrapper{
		display: grid;
	}
	.growing-wrapper > textarea,
	.growing-wrapper::after {
		padding: var(--padding);
		grid-area: 1 / 1 / 2 / 2;
	}
	.growing-wrapper::after{
		content: attr(data-replicated-value) " ";
		visibility: hidden;
		white-space: pre-wrap;
	}
	textarea{
		width: 		   100%;
		height: 	   auto;
		padding: 	   0 var(--padding);
		resize: 	   none;
  		overflow: 	   hidden;
	}

	.text {
		width:		   100%;
		/* white-space:   break-spaces; */
		padding: 	   0;
		margin: 	   0;
		display: 	   inline-block;
		box-sizing:    border-box;
		
	}

	.h1{
		font-size: 2em;
	}

	h2{
		padding:0;
		margin:0;
	}

	h3.text{
		margin-right: 3rem;
	}


	.h2{
		font-size: 1.5em;
	}

	.p,
	.span{
		font-size: 1em;
		margin: 0;
		padding: 0;
	}

	.placeholder{
		opacity: 0.5;
	}

	
</style>