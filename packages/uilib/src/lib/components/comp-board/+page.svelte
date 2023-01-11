<h1>Board</h1>

<Example name="Board">
    <CompBoard board={board} on:board={handleBoardChange} />
</Example>

<script lang="ts">
    import { CompBoard, CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { Board, Item } from "@kanbandown/shared/esmodule";

    const longText = "Whereas +SOME disregard :low and +another contempt for :high uman rights have resulted #beta"
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
		console.log({level:"dev", msg:"saving new board", board:event.detail})
		board = Object.setPrototypeOf({...event.detail}, Board.prototype)
	}
</script>