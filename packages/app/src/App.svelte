<script lang="ts">
	import { onMount } from "svelte"
	import svelteLogo from './assets/svelte.svg'
	import Counter from './lib/Counter.svelte'
	import { type MessageBoard, BackendAPI, Board} from "@kanbandown/shared/esmodule"
  	import { CompBoard } from "./lib/components/comp-board";
	// const {MessageBoard, BackendAPI} = require("@kanbandown/shared")
	// I don't understand why id does not work with commonjs
	// import { BackendAPI } from "@kanbandown/shared/src/api/backend/backend"

	
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
		console.log({level:"dev", msg:"saving board", board:e.detail})
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