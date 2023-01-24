<script context="module" lang="ts">
	export type State = "read" | "write"
	export type API = {
		enableEditing: () => void
		disableEditing: () => void
	}
</script>
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

	export const classMap: {[tag in SupportedTags]: string} ={
		h1:   "h1",
		h2:   "h2",
		h3:   "h3",
		h4:   "h4",
		span: "span",
		p: 	  "p",
	}

	$: sizeClass = classMap[tag]

	export const api: API = {
		enableEditing,
		disableEditing: () => isEditing = false,
	}

	let isEditing = false
	$: dispatchStateChange( isEditing ? "write" : "read" )
	function enableEditing(){
		isEditing = true
	}

	function focus(node: HTMLTextAreaElement){
		node.focus()
	}

	function cancelEditing(){
		isEditing = false
		// newValue = value
		safeValue = value
	}
	
	function dispatchChangeOnEnter(event: KeyboardEvent){
		if(event.code !== "Enter" || event.shiftKey){ return }
		dispatch("change",textAreaValue)
		// value=newValue
		safeValue=textAreaValue
		isEditing = false

	}

	function dispatchLinkClick(href: string){
		dispatch("linkclick", href)
	}

	function dispatchStateChange(state: State){
		dispatch("state", state)
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
		on:dblclick={enableEditing}
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

	editable-text{
		/* display: inline-grid; */
		display: inline-block;
	}

	editable-text :global(p){
		margin: 1rem 0;
	}

	.growing-wrapper{
		display: grid;
	}
	.growing-wrapper > textarea,
	.growing-wrapper::after {
		padding: 0.5rem;
		grid-area: 1 / 1 / 2 / 2;
	}
	.growing-wrapper::after{
		content: attr(data-replicated-value) " ";
		visibility: hidden;
		white-space: pre-wrap;
	}
	textarea{
		width: 100%;
		height: auto;
		padding: 0 0.5rem;
		resize: none;
  		overflow: hidden;
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
		word-wrap: break-word;
		margin: 0;
		padding: 0;
	}

	.placeholder{
		opacity: 0.5;
	}

	
</style>