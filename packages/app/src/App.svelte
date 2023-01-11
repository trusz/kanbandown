<script lang="ts">
	import { onMount } from "svelte"
	import svelteLogo from './assets/svelte.svg'
	import Counter from './lib/Counter.svelte'
	import { type MessageBoard, BackendAPI, Board} from "@kanbandown/shared/esmodule"
	import { CompBoard } from "@kanbandown/uilib"
	import "@kanbandown/uilib/style.css"

	
	// @ts-ignore
	const vscode = acquireVsCodeApi();
	const backendAPI = new BackendAPI(vscode, window)

	// 
	// Listen
	//
	let board: Board
	onMount(() => {
		backendAPI.listenOnBoard((newBoard?: Board) => {
			if(!newBoard){ return }

			board = newBoard	
		})
	})

	function handleBoard(e: CustomEvent<Board>){
		backendAPI.saveBoard(e.detail)
	}

</script>

<main>
	{#if board}
		<CompBoard 
		{board} 
		on:board={handleBoard} />
	{/if}
</main>

<style>

	
</style>