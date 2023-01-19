<script lang="ts">
    import { Example } from "$lib/components/internal"
    import { Dropdown, type DropdownItem }from "$lib"

    let selectedIndex = -1
    const items: DropdownItem[] = [
        {label: "Item 1", onClick: () => { selectedIndex=0; isOpen=false }},
        {label: "Item 2", onClick: () => { selectedIndex=1; isOpen=false }},
        {label: "Item 3", onClick: () => { selectedIndex=2; isOpen=false }, color:"red" },
        {label: "Item 4", onClick: () => { selectedIndex=3; isOpen=false }},
        {label: "Item 5", onClick: () => { selectedIndex=4; isOpen=false }},
    ]

    let isOpen = true
    console.log({level:"dev", msg:"example isOpen", isOpen})

</script>

<Example name="Dropdown">
    <label>
        Open
        <input type="checkbox" bind:checked={isOpen} />
    </label>
    <div class="container">
        <Dropdown items={items} isOpen={isOpen} />
    </div>
</Example>

<style>
    .container{
        position: relative
    }
</style>

