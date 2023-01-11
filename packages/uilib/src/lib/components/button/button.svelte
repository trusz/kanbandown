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
	on:blur
>
	<slot></slot>
</button>

<style>
	button{
		display: 	 grid;
		place-items: center;
		height: 	 2rem;
		min-width:   2rem;
		font-family: inherit;
	}
	.block{
		width: 100%;
	}

	.icon:not(:hover):not(.forceHover) {
		background-color: transparent;
	}

	button {
		background-color: var(--vscode-button-secondaryBackground);
		color: 			  var(--vscode-button-secondaryForeground);
		
		border-radius: 4px;
		border:		   none;
		cursor: 	   pointer;
	}

	button.forceHover,
	button:hover{
		background-color: var(--vscode-button-secondaryHoverBackground);
	}


</style>