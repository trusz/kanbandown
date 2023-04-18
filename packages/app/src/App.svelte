<script lang="ts">
	import { onMount } from "svelte"
	import { 
		BackendAPI,
		Board,
		useBoardContext,
		initBoardContext,
		initSelectionContext,
	} from "@kanbandown/shared/esmodule"
	import { CompBoard } from "@kanbandown/uilib"
	import "@kanbandown/uilib/style.css"

	
	// @ts-ignore
	const vscode = acquireVsCodeApi();
	const backendAPI = new BackendAPI(vscode, window)
	initBoardContext()
	initSelectionContext()
	const { boardStore, displayBoard, onSaveBoard } = useBoardContext()


	// 
	// Listen
	//
	onMount(() => {
		backendAPI.listenOnBoard((newBoard?: Board) => {
			if(!newBoard){ return }
			const realBoard = Object.setPrototypeOf(newBoard,Board.prototype)
			displayBoard(realBoard)
		})

		onSaveBoard((newBoard?: Board) => {
			if(!newBoard){ return }
			backendAPI.saveBoard(newBoard)
		})

	})

	function handleLinkClick(e: CustomEvent<string>){
		backendAPI.openLink(e.detail)
	}



	function handleCreateNote(e: CustomEvent<{label: string, extension: string}>){
		backendAPI.createNote(e.detail.label, e.detail.extension)
	}

</script>

<main>
	{#if $boardStore}
		<CompBoard 
			on:linkclick={handleLinkClick}
			on:createnote={handleCreateNote}
		/>
	{/if}
</main>

<style>

	
</style>