<script lang="ts">
	import Options from "./options.svelte"
</script>

<toolbar>
	<slot></slot>
</toolbar>

<style>
	toolbar {
		display:  	     flex;
		gap: 			 0.5rem;
		justify-content: end;
		padding: 		 0.5rem;	
		border-radius:   var(--border-radius);
	}
</style>