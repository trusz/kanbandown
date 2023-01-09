<h1>Board</h1>

<Example name="Board">
    <CompBoard board={board} />
</Example>

<script lang="ts">
    import { CompBoard, CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { Board, Item } from "@kanbandown/shared/esmodule";

    
	const board = new Board()
	board.title = "Project"
	board.createColumn("Todo")
	board.createItem("task 1")
	board.createItem("task 2")
	board.createColumn("In Progress")
	board.createItem("task 3")
	board.createItem("task 4")
	board.createColumn("Done")
	board.createItem("task 5")
</script>