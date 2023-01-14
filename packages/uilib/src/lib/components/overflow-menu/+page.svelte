<script lang="ts">
	import { Example } from "$lib/components/internal"
	import OverflowMenu from "./overflow-menu.svelte"
	import type { DropdownItem } from "$lib/components/dropdown";
	import { IconSettings, IconAdd, IconOverflowMenu } from "../../icons"


	function makeLogger(index:number){
		return () => {
			console.log({level:"demo", msg:"clicked item", index})
		}
	}

	const items: DropdownItem[] = [
		{label: "item 1", onClick: makeLogger(0) },
		{label: "item 2", onClick: makeLogger(1) },
		{label: "item 3", onClick: makeLogger(2) },
		{label: "item 4 create column", onClick: makeLogger(4) },
	]
	
	const itemsWithIcons: DropdownItem[] = [
		{label: "item 1", onClick: makeLogger(0), icon: IconAdd },
		{label: "item 2", onClick: makeLogger(1), icon: IconOverflowMenu },
		{label: "item 3", onClick: makeLogger(2), icon: IconSettings },
		{label: "item 4 create column", onClick: makeLogger(4) },
	]

</script>

<h1>Overflow Menu</h1>

<Example name="Default Icon">
    <OverflowMenu items={items} />
</Example>

<Example name="Position Awareness">
	<div class="align-right">
    	<OverflowMenu items={items} />
	</div>
</Example>


<Example name="Custom Icon">
    <OverflowMenu items={items} icon={IconSettings} />
</Example>

<Example name="Icons">
    <OverflowMenu items={itemsWithIcons} icon={IconSettings} />
</Example>

<style>
	.align-right{

		display: flex;
		justify-content: end;
	}
</style>