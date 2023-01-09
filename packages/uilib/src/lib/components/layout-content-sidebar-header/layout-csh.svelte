<script>
    export let withBorder = true
</script>

<layout-csh class:withoutBorder={!withBorder}>


    {#if $$slots.header}
    <header>
        <slot name="header"></slot>
    </header>
    {/if}

    {#if $$slots.left}
    <div class="left">
        <slot name="left"></slot>
    </div>
    {/if}

    <content>
        <slot name="content"></slot>
    </content>
    
    {#if $$slots.right}
    <div class="right">
        <slot name="right"></slot>
    </div>
    {/if}

    {#if $$slots.footer}
        <footer>
            <slot name="footer"></slot>
        </footer>
    {/if}
</layout-csh>



<style>
    layout-csh {
        display: grid;
        height: 100%;
        width:100%;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
    }

    layout-csh > * {
        border: var(--border-color, lightgray) 1px solid;
        /* box-shadow: 0px 0px 0px 1px var(--border-color, lightgray) inset; */
        /* box-sizing:content-box; */
        background-color: var(--background-color);
    }
    layout-csh > * + *{
        border-top: none;
        border-right: none;
    }
    layout-csh.withoutBorder > * {
        border:none
    }

    header {
        grid-column: 1 / 4;
    }

    .left {
        grid-column: 1 / 2;
        grid-row: 2 /3;
    }

    content {
        grid-column: 2 / 3;
        grid-row: 2 /3;
        overflow: hidden;
        width: 100%;
    }

    .right {
        grid-column: 3 / 4;
        grid-row: 2 /3;
    }

    footer {
        grid-column: 1 / 4;
        grid-row: 3 / 4;
    }

    .left,
    .right{
        height:     100%;
        max-height: 100%;
        overflow:   hidden;
    }

</style>