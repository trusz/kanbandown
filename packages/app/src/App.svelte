<script lang="ts">
	import { onMount } from "svelte"
	import svelteLogo from './assets/svelte.svg'
	import Counter from './lib/Counter.svelte'
	import { type MessageBoard, BackendAPI, Board} from "@kanbandown/shared/esmodule"
  	import { BoardDisplay } from "./lib/components/board-display";
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
			console.log({level:"dev", msg:"got new board", newBoard})
			board = newBoard	
		})
	})

	$: console.log({level:"dev", msg:"board changed", board})

</script>

<main>
	{#if board}
		<BoardDisplay {board} />
	{/if}
</main>

<style>

	
</style>