<script lang="ts">
	import Options from "./options.svelte"
</script>

<toolbar>
	<Options 
		on:createcolumn
	/>
</toolbar>

<style>
	toolbar {
		display:  	     flex;
		justify-content: end;
		padding: 		 0.5rem;	
		padding-right:   3rem;

		/* background-color:  var(--vscode-toolbar-hoverBackground); */
		border-radius:     var(--border-radius);
	}
	toolbar:hover{
		/* background-color: var(--vscode-toolbar-activeBackground); */

	}


	.root{
		--vscode-toolbar-hoverBackground: rgba(90, 93, 94, 0.31);
    --vscode-toolbar-activeBackground: rgba(99, 102, 103, 0.31);
	}

</style>