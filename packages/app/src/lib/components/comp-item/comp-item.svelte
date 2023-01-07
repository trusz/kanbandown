<script lang="ts">
	export let label: string
</script>

<comp-item>
	  <p>{label}</p>
</comp-item>

<style>
	comp-item{
		border:  		  var(--vscode-textBlockQuote-border) thin solid;
		background-color: var(--vscode-textBlockQuote-background);
		display: 		  block;
		box-shadow: 	  0px 0px 10px 2px var(--vscode-widget-shadow);
		
		
		border-radius: 	  4px;
		
		display: 	           grid;
		grid-template-columns: 1fr 10px;
		
		width: 10rem;
	}
	comp-item::after{
		content:"┋";
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
	}
	p{
		padding: 0;
		margin: 0;
		border-right: var(--vscode-textBlockQuote-border) thin solid;
		padding: 		  0.5rem 0.5rem;
	}
</style>