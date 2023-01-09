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

<script lang="ts">
    import { EditableText } from "$lib"
    import { Example } from "$lib/components/internal"

	function makeHandler(tag: string){
		return function handleChange(event:CustomEvent<string>){
			console.log({level:"dev", tag, text: event.detail })
		}
	}
    
</script>