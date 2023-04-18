<script lang="ts">
    import { Example } from "$lib/components/internal"
    import { CompItem } from "$lib"
    import { Board, useBoardContext, initBoardContext, parseFromMarkdown, renderToMarkdown, useSelectionContext, initSelectionContext } from "@kanbandown/shared/esmodule"


    const label= "a short description about the task"
    let sliderValue = 300
    $: containerWidth = `${sliderValue}px`


    initBoardContext()
    initSelectionContext()
    const { displayBoard, onSaveBoard } = useBoardContext()

    let board = new Board()
	board.title = "Project"
	board.createColumn("Todo")
	board.createItem("task 1 "+ label, false, 0)
	board.createItem("task 2 "+ label, false, 0)
    displayBoard(board)

    // onSaveBoard((b) => displayBoard(b))
    onSaveBoard((b) => {
        if(!b){ return }
        displayBoard(b)
        displayBoard(parseFromMarkdown(renderToMarkdown(b)))
    })

    function handleCreateNote(e: CustomEvent<string>){
        console.log({level:"demo", msg: "Handle Create Note", title: e.detail, event:e})
    }

</script>


<h1>Presence</h1>

<Example name="Item">
        <CompItem 
            columnIndex={0} 
            itemIndex={0} 
            on:createnote={handleCreateNote}
        />
</Example>

<Example name="Item in Container">
    <div>
        <label for="width-ranger">Width</label><br/>
        <input id="width-ranger" type="range" min=200 max=500 bind:value={sliderValue} />

    </div>
    <div class="container" style:width={containerWidth}>
        <CompItem columnIndex={0} itemIndex={1} />
    </div>
</Example>

<style>
    .container{
        display: inline-block;
    }
</style>