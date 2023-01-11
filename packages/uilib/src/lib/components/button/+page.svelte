<script lang="ts">
    import { Example } from "$lib/components/internal"
	import Button from "./button.svelte"
</script>

<h1>Add Button</h1>

<Example name="Inline">
    <Button>+</Button>
</Example>

<Example name="Inline Text">
    <Button>Add new stuff</Button>
</Example>

<Example name="Block">
    <Button block={true}>+</Button>
</Example>

<Example name="Icon">
    <Button icon>+</Button>
</Example>