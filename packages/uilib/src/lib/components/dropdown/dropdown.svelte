<script lang="ts">

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
            <li class:selected={index===selectedIndex}>
                <span class="content">
                    <a href="_" on:click|preventDefault={item.onClick}>
                        {item.label}
                    </a>
                </span>
            </li>
        {/each}
    </ol>
</dropdown>

<style>
dropdown{
        position:   absolute;
        left:       0;
        top:        2rem;
        width:      100%;
        border:     white 1px solid;
        background: var(--background-color);
        display:    inline-block;
        opacity:    0;
        transition: opacity 0.2s;
        display:    none;
        padding:    0.5rem;
        z-index:    1000;
        
    }

    dropdown.open{
        display: block;
        opacity: 1;
    }

    ol {
        list-style-type: none;
    }
    li::before{
        content: "";
        margin-right: 2ch;
    }
    li.selected .content {
        /* text-decoration: underline; */
    }
    li.selected::before {
        content: "> ";
        margin-right: 0;
        text-decoration: none;
    }
</style>