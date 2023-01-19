<script lang="ts">
    import { Button } from "$lib/components/button"
    import type { DropdownItem } from "./dropdown-item"

    export let items: DropdownItem[]
    export let isOpen = false

</script>

<dropdown class:open={isOpen} >
    <ol>
        {#each items as item, index}
            <li>
                <Button on:click={item.onClick} icon --button__color={item.color}>
                    {#if item.icon}
                        <svelte:component this={item.icon} />
                    {/if}
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
        padding:    0.25rem 0.25rem;
        z-index:    1000;
        
        white-space:   nowrap;
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

    li{
        display:     flex;
        align-items: center;
        gap:         0.2rem;
    }

</style>