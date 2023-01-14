<script lang="ts">
	import { Example } from "$lib/components/internal"
	import { Toolbar } from "./index"
	import Options from "./options.svelte" 
	import { Button } from "../button"

	function handleCreateColumn(){
		console.log({level:"demo", msg:"creating column"})
	}
	function handlePlusClick(){
		console.log({level:"demo", msg:"clicked plus"})
	}
</script>

<Example name="Toolbar">
	<Toolbar >
		<Button icon on:click={handlePlusClick}>+</Button>
		<Options on:createcolumn={handleCreateColumn} />
	</Toolbar>
</Example>
