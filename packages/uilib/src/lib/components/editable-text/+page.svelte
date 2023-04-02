
<script lang="ts">
    import { EditableText, Button } from "$lib"

    import { Example } from "$lib/components/internal"
  	import { initEditableTextAPI, useEditableTextAPI, type ID } from "./editable-text_context";

	function makeHandler(tag: string){
		return function handleChange(event:CustomEvent<string>){
			console.log({level:"demo", tag, text: event.detail })
			// isEditing = false
		}
	}

	let sliderValue = 300
	$: containerWidth = `${sliderValue}px`
	function onWidthChange(event:Event){
		const input = event.target as HTMLInputElement
	}
    
	function handleLinkClick(event: CustomEvent<string>){
		console.log({level:"demo", msg:"clicked on a link", href: event.detail})
	}

	initEditableTextAPI()
	const api = useEditableTextAPI()

	let exampleContainerValue = "Whereas #beta disregard and :low contempt +project [Readme.md](./readme.md) for human rights have resulted\n\n\n".repeat(3)
	function handleExampleContainerChange(event:CustomEvent<string>){
		exampleContainerValue = event.detail
	}

</script>


<h1>Editable Text</h1>

<Example name="Header 1">
    <EditableText 
		tag="h1" 
		value="This text is editable" 
		on:change={makeHandler("h1")}
	/>
</Example>

<Example name="Header 2">
    <EditableText 
		tag="h2" 
		value="This text is editable"  
		on:change={makeHandler("h2")}
	/>
		
</Example>

<Example name="paragraph">
    <EditableText 
		tag="p" 
		value="This text is editable"  
		on:change={makeHandler("p")}
	/>
</Example>

<Example name="span">
    <EditableText 
		tag="span" 
		value="This text is editable"  
		on:change={makeHandler("span")}
	/>
</Example>

<Example name="API">
	{@const id = Symbol()}
	<div class="api-buttons">
		<Button on:click={ () => api.activate(id) }>Edit</Button>
		<Button  on:click={ () => api.deactivate(id) }>Finish</Button>
	</div>
    <EditableText 
		id={id}
		tag="span" 
		value="This text is editable"  
		on:change={makeHandler("span")}
	/>
</Example>

<Example name="In container">
	<div>
		<input 
			type="range" 
			min="200" 
			max="500" 
			bind:value={sliderValue}
			on:change={onWidthChange}
		>
	</div>
	<div class="container" style:width={containerWidth}>
		<EditableText 
			tag="span" 
			bind:value={exampleContainerValue}
			on:change={handleExampleContainerChange}
			on:linkclick={handleLinkClick}
		/>
	</div>
</Example>

<Example name="Placeholder">
	<EditableText 
		tag="span"
		value=""
		placeholder="<editme>"
	/>
</Example>

<style>
	.c2 {
		border:red thin solid;
		height: auto;
		display: inline-grid;
	}

	.c2 textarea{
		height: auto;
		resize: none;
	}

	.container{
		/* border: gray thin solid; */
		display: inline-block;
		/* padding: 1rem; */
	}

	.api-buttons{
		margin-bottom: 1rem;
	}
</style>
