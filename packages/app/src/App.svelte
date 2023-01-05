<script lang="ts">
	import { onMount } from "svelte"
	import svelteLogo from './assets/svelte.svg'
	import Counter from './lib/Counter.svelte'
	
	// 
	// Listen
	// 
	onMount(() => {
		window.addEventListener('message', event => {
			const message = event.data; // The json data that the extension sent
			console.log({level:"dev", msg:"got message from BE", event})
			// switch (message.type) {
			// 	case 'update':
			// 		const text = message.text;

			// 		// Update our webview's content
			// 		updateContent(text);

			// 		// Then persist state information.
			// 		// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
			// 		vscode.setState({ text });

			// 		return;
			// }
		});
	})
	

</script>

<main>
	<h1>Vite + Svelte</h1>
	
	<div class="card">
		<Counter />
	</div>
	
	<p>
		Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
	</p>
	
	<p class="read-the-docs">
		Click on the Vite and Svelte logos to learn more
	</p>
</main>

<style>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
		color: #888;
	}
</style>