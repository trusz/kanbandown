<script lang="ts">
	import { Example } from "$lib/components/internal"
	import OverflowMenu from "./overflow-menu.svelte"
	import type { DropdownItem } from "$lib/components/dropdown";


	const items: DropdownItem[] = [
		{label: "item 1", onClick: () => { console.log({level:"dev", msg:"clicked item", index:0}) } },
		{label: "item 2", onClick: () => { console.log({level:"dev", msg:"clicked item", index:1}) } },
		{label: "item 3", onClick: () => { console.log({level:"dev", msg:"clicked item", index:2}) } },
		{label: "item 4", onClick: () => { console.log({level:"dev", msg:"clicked item", index:3}) } },
	]

</script>

<h1>Overflow Menu</h1>

<Example name="Overflow Menu">
    <OverflowMenu items={items} />
</Example>
