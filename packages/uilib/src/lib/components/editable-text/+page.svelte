
<script lang="ts">
    import { EditableText, Button } from "$lib"

  	import type { EditableTextAPI } from "./";
    import { Example } from "$lib/components/internal"

	function makeHandler(tag: string){
		return function handleChange(event:CustomEvent<string>){
			console.log({level:"demo", tag, text: event.detail })
			isEditing = false
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

	let isEditing = false
	let api: EditableTextAPI
	$: ((isEditing) =>{
		if(!api){ return }
		if(isEditing){ api.enableEditing() }
		else { api.disableEditing() }
	})(isEditing)
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
	<div class="api-buttons">
		<Button on:click={ () => api.enableEditing() }>Edit</Button>
		<Button  on:click={ () => api.disableEditing() }>Finish</Button>
	</div>
    <EditableText 
		tag="span" 
		value="This text is editable"  
		bind:api={api}
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
			value={"Whereas #beta disregard and :low contempt +project [Readme.md](./readme.md) for human rights have resulted ".repeat(3)}
			on:change={makeHandler("span")}
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
