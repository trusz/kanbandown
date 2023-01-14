
<script lang="ts">
    import { CompBoard, CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { Board, Item, parseFromMarkdown, renderToMarkdown } from "@kanbandown/shared/esmodule";

    const longText = "Whereas +SOME disregard :low and +another contempt for :high uman rights [Readme](./Readme.md) have resulted #beta"
	let board = new Board()
	board.title = "Project"
	board.createColumn("Todo")
	board.createItem("task 1 "+ longText)
	board.createItem("task 2 "+ longText)
	board.createColumn("In Progress")
	board.createItem("task 3 "+ longText)
	board.createItem("task 4 "+ longText)
	board.createColumn("Done")
	board.createItem("task 5 "+longText)

	function handleBoardChange(event:CustomEvent<Board>) {
		const newBoard = event.detail
		board = parseFromMarkdown(renderToMarkdown(newBoard))
		console.log({level:"demo", msg:"handle board change", board, newBoard})
	}

	function handleLinkClick(event: CustomEvent<string>){
		console.log({level:"demo", msg:"handling link clicks", href: event.detail})
	}

</script>

<Example name="">
    <CompBoard board={board} on:board={handleBoardChange} on:linkclick={handleLinkClick} />
</Example>
