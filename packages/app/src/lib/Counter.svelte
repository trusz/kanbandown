<script lang="ts">
	
	// @ts-ignore
	const vscode = acquireVsCodeApi();
	
	let count: number = 0
	const increment = () => {
		count += 1
		vscode.postMessage({
			type: "inc"
		})
	}
	
</script>

<button on:click={increment}>
	count is {count}
</button>
