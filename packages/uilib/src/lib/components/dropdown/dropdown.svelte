<script lang="ts">
    import { Button } from "$lib/components/button"

    type Item = {
        label: string
        onClick: () => void
    }
    export let items: Item[]
    export let selectedIndex = -1;
    export let isOpen = false

    $: console.log({level:"dev", msg:"dropdown is open", isOpen})
</script>

<dropdown class:open={isOpen}>
    <ol>
        {#each items as item, index}
            <li>
                <Button on:click={item.onClick}>
                    {item.label}
                </Button>
            </li>
        {/each}
    </ol>
</dropdown>

<style>
 
    dropdown{
        position:   absolute;
        left:       0;
        top:        0;
        display:    none;
        opacity:    0;
        transition: opacity 0.2s;
        padding:    0.5rem 0.5rem;
        z-index:    1000;

        background:    var(--vscode-dropdown-background);
        color:         var(--vscode-dropdown-foreground);
        border:        var(--vscode-dropdown-border) 1px solid;
        border-radius: var(--border-radius);
    }

    dropdown.open{
        display: block;
        opacity: 1;
    }


    ol {
        list-style-type: none;
        padding:         0;
        margin:          0;
    }
    /*
    li::before{
        content: "";
        margin-right: 2ch;
    }
    li.selected .content {
        text-decoration: underline;
    }
    li.selected::before {
        content: "> ";
        margin-right: 0;
        text-decoration: none;
    }
    */
</style>