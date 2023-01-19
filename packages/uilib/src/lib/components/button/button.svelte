<script lang="ts">
	export let block = false
	export let icon = false
	export let forceHover = false
</script>

<button 
	class:block 
	class:icon 
	class:forceHover 
	on:click
	on:blur|capture
>
	<slot></slot>
</button>

<style>
	button{
		display: 	 	 inline-flex;
		place-items: 	 center;
		height: 	 	 2rem;
		min-width:   	 2rem;
		font-family: 	 inherit;
		gap: 		 	 0.5rem;
		justify-content: center;

	}
	.block{
		width: 100%;
	}

	.icon{
		height: 1.5rem;
		min-width: 1.5rem;
	}

	.icon:not(:hover):not(.forceHover) {
		background-color: transparent;
	}

	button {
		background-color: var(--vscode-button-secondaryBackground);
		color: 			  var(--button__color, var(--vscode-button-secondaryForeground));
		
		border-radius: 4px;
		border:		   none;
		cursor: 	   pointer;
	}

	button.forceHover,
	button:hover{
		background-color: var(--vscode-button-secondaryHoverBackground);
	}

</style>