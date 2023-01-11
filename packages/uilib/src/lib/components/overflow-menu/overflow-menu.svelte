<script lang="ts">
	import { IconOverflowMenu } from "$lib/icons"
	import { Button } from "$lib/components/button"
	import { Dropdown } from "$lib/components/dropdown"

	let isOpen = false
	const items = [
        {label: "Item 1", onClick: () => { handleClick(0) }},
        {label: "Item 2", onClick: () => { handleClick(1) }},
        {label: "Item 3", onClick: () => { handleClick(2) }},
        {label: "Item 4", onClick: () => { handleClick(3) }},
        {label: "Item 5", onClick: () => { handleClick(4) }},
    ]

	function handleClick(index:number){
		console.log({level:"dev", msg:"clicked a menu", index })
		isOpen = false
	}

	function toggleMenu(){
		isOpen = !isOpen
	}

    
</script>

<overflow-menu>
	<Button icon on:click={toggleMenu} forceHover={isOpen} on:blur={() => isOpen=false}>
		<IconOverflowMenu />
	</Button>
	<div class="dropdown">
		<Dropdown items={items} isOpen={isOpen} />
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