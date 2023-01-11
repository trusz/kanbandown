<script lang="ts">
	import { Example } from "$lib/components/internal"
	import OverflowMenu from "./overflow-menu.svelte"
	import type { DropdownItem } from "$lib/components/dropdown";
	import { IconSettings } from "../../icons"


	const items: DropdownItem[] = [
		{label: "item 1", onClick: () => { console.log({level:"demo", msg:"clicked item", index:0}) } },
		{label: "item 2", onClick: () => { console.log({level:"demo", msg:"clicked item", index:1}) } },
		{label: "item 3", onClick: () => { console.log({level:"demo", msg:"clicked item", index:2}) } },
		{label: "item 4 create column", onClick: () => { console.log({level:"demo", msg:"clicked item", index:3}) } },
	]

</script>

<h1>Overflow Menu</h1>

<Example name="Default Icon">
    <OverflowMenu items={items} />
</Example>


<Example name="Custom Icon">
    <OverflowMenu items={items} icon={IconSettings} />
</Example>
