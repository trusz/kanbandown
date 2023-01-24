<script lang="ts">
	export let block = false
	export let icon = false
	export let forceHover = false
	export let dangerous = false
</script>

<button 
	class:block 
	class:icon 
	class:forceHover 
	class:dangerous
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
		justify-content: var(--button__justify-content, center);

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
		background-color: var(--button__background-color, var(--vscode-button-secondaryBackground));
		color: 			  var(--button__color, var(--vscode-button-secondaryForeground));
		
		border-radius: 4px;
		border:		   none;
		cursor: 	   pointer;
	}

	button.forceHover,
	button:hover{
		background-color: var(--button__hover__background-color, var(--vscode-button-secondaryHoverBackground));
		color: 			  var(--button__hover__color);
	}

	button.dangerous{
		color: var(--vscode-editorError-foreground)
	}

	button.dangerous:hover {
		background-color: var(--vscode-editorError-foreground);
		color: 			  unset;
	}

</style>