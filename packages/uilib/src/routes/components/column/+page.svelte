<h1>Presence</h1>

<Example name="Column">
    <CompColumn 
        title={title} 
        items={items} 
        on:move={handleMove}
        on:finalize={handleFinalize}
    />
</Example>

<script lang="ts">
    import { CompColumn } from "$lib"
    import { Example } from "$lib/components/internal"
    import { Item } from "@kanbandown/shared/esmodule";

    const title="Todo"
    let items: Item[] = [
        new Item("task 1", false,0),
        new Item("task 2", false,1),
        new Item("task 3", false,2),
        new Item("task 4", false,3),
    ]

    function handleMove(event: CustomEvent<Item[]>){
        console.log({level:"dev", msg:"item is moving", items:event.detail})
        items = event.detail 
    }

    function handleFinalize(event:CustomEvent<unknown>){
        console.log({level:"dev", msg:"order is finalized"})
    }
</script>