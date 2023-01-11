<script lang="ts">
	import { Example } from "$lib/components/internal"
	import { Toolbar } from "./index"
</script>

<Example name="Toolbar">
	<Toolbar 
		on:createcolumn={ () => console.log({level:"demo", msg:"creating column"}) }
	/>
</Example>
