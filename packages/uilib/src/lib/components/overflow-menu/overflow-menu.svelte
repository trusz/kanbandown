<script lang="ts">
	import { IconOverflowMenu } from "$lib/icons"
	import { Button } from "$lib/components/button"
	import { Dropdown, type DropdownItem } from "$lib/components/dropdown"
  	import type { SvelteComponent } from "svelte";

	export let icon = IconOverflowMenu

	export let items: DropdownItem[]
	$: _items = items.map( item => {
		return {
			label: item.label,
			onClick: () => {
				item.onClick()
				isOpen = false
			}
		}
	})
	
	let isOpen = false

	function toggleMenu(){
		isOpen = !isOpen
	}

	async function handleBlur(){
		// TODO: hinders clicking an item, the event does not react the menu items
		// isOpen = false
	}


</script>

<overflow-menu>
	<Button icon on:click={toggleMenu} forceHover={isOpen} on:blur={handleBlur}>
		<!-- <IconOverflowMenu /> -->
		<svelte:component this={icon} />
	</Button>
	<div class="dropdown">
		<Dropdown items={_items} isOpen={isOpen} />
	</div>
</overflow-menu>

<style>
	overflow-menu{
		display: block;
	}

	.dropdown{
		position: relative;
	}
</style>