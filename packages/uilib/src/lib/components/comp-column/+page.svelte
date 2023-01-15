

<script lang="ts">
    import { CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { Item } from "@kanbandown/shared/esmodule";
    import { Board, useBoardContext, initBoardContext, parseFromMarkdown, renderToMarkdown } from "@kanbandown/shared/esmodule"

    const title="Todo"
    const longText = "Whereas disregard and contempt for human rights have resulted"
    let items: Item[] = [
        new Item("task 1 "+longText, false,0),
        new Item("task 2 "+longText, false,1),
        new Item("task 3 "+longText, false,2),
        new Item("task 4 "+longText, false,3),
    ]

    function handleMove(event: CustomEvent<Item[]>){
        console.log({level:"dev", msg:"item is moving", items:event.detail})
        items = event.detail 
    }

    function handleFinalize(event:CustomEvent<unknown>){
        console.log({level:"dev", msg:"order is finalized"})
    }
    function handleTaskAdd(){
        const newItem = new Item("new", false, items.length)
        items=[newItem, ...items]
    }

    
    initBoardContext()
    const { displayBoard, onSaveBoard } = useBoardContext()

    let board = new Board()
	board.title = "Project"
	board.createColumn("Todo")
	board.createItem("task 1 " + longText, false, 0)
	board.createItem("task 2 " + longText, false, 0)
	board.createItem("task 3 " + longText, false, 0)
	board.createItem("task 4 " + longText, false, 0)
    displayBoard(board)

    // onSaveBoard((b) => displayBoard(b))
    onSaveBoard((b) => {
        if(!b){ return }
        displayBoard(parseFromMarkdown(renderToMarkdown(b)))
    })
</script>

<h1>Presence</h1>

<Example name="Column">
    <CompColumn 
        index={0}
        on:move={handleMove}
        on:finalize={handleFinalize}
        on:taskadd={handleTaskAdd}
    />
</Example>