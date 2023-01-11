<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { IconSettings } from "../../icons"
	import { OverflowMenu } from "../overflow-menu"

	const dispatch = createEventDispatcher()
	const dispatchCreateColumn = () => dispatch("createcolumn")

	let items = [
		{ label: "Create Column", onClick: dispatchCreateColumn },
	]

</script>

<options>
	<OverflowMenu items={items} icon={IconSettings} />
</options>
