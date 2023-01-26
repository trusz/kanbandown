
<script lang="ts">
	import { onDestroy } from "svelte"
    import { CompBoard, CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { 
		Board, 
		Item, 
		parseFromMarkdown, 
		renderToMarkdown,
		useBoardContext,
		initBoardContext,
		initSelectionContext,
        useSelectionContext,
	} from "@kanbandown/shared/esmodule";
	


    const longText = "Whereas +SOME disregard :low and +another contempt for :high uman rights [Readme](./Readme.md) have resulted #beta"
	let board = new Board()
	board.title = "Project"
	board.setDescription(
		"paragraph 1 line 1.1\n"+
		"paragraph 1 line 1.2\n"+
		"\n"+
		"paragraph 2 line 2.1\n"+
		"paragraph 2 line 2.2\n"
	)

	board.createColumn("Todo")
	board.createItem("task 1 "+ longText)
	board.createItem("task 2 "+ longText)
	board.createColumn("In Progress")
	board.createItem("task 3 "+ longText)
	board.createItem("task 4 "+ longText)
	board.createColumn("Done")
	board.createItem("task 5 "+longText)

	initBoardContext()
	const {boardStore, displayBoard, onSaveBoard} = useBoardContext()
	displayBoard(board)

	const unsubscribe = onSaveBoard((b) => {
		if(!b){ return }
		const mdContent = renderToMarkdown(b)
		console.log({level:"demo", msg:"generated markdown", mdContent})
		
		const simulatedFileWriteAndReparsedBoard = parseFromMarkdown(mdContent)
		displayBoard(simulatedFileWriteAndReparsedBoard)
	})
	onDestroy(() => unsubscribe())

	function handleLinkClick(event: CustomEvent<string>){
		console.log({level:"demo", msg:"handling link clicks", href: event.detail})
	}

	// 
	// Selection
	// 
	initSelectionContext()
	const {reset} = useSelectionContext()

    function resetSelection(e: MouseEvent){
        const target = e.target
        reset()
    }   


</script>


<Example name="">
    <CompBoard 
		on:linkclick={handleLinkClick} 
	/>
</Example>
