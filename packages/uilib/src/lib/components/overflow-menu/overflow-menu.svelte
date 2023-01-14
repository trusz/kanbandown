<script lang="ts">
	import { IconOverflowMenu } from "$lib/icons"
	import { Button } from "$lib/components/button"
	import { Dropdown, type DropdownItem } from "$lib/components/dropdown"
	import { tick } from "svelte"
  	

	export let icon = IconOverflowMenu
	export let items: DropdownItem[]
	$: _items = items.map( item => {
		return {
			...item,
			onClick: () => {
				item.onClick()
				isOpen = false
			}
		}
	})
	
	
	async function toggleMenu(){
		isOpen = !isOpen
		await tick()
		setDropdownPosition()	
	}
	let isOpen = false

	
	function setDropdownPosition(){
		const rootRect = root.getBoundingClientRect()
		const dropdownRect = dropdown.firstElementChild!.getBoundingClientRect()
		const windowWidth = window.innerWidth
		
		const offsetRight = Math.max(rootRect.left + dropdownRect.width - windowWidth + rootRect.width, 0)
		posY = `${rootRect.top + rootRect.height + gapOffset}px`
		posX = `${rootRect.left - offsetRight}px`
		
	}
	let posX = "0px";
	let posY = "0px";
	const gapOffset = 4;
	const rightPadding = 12;
	let dropdown: HTMLElement
	let root: HTMLElement
	let compDropdown: any

	async function handleBlur(){
		// TODO: hinders clicking an item, the event does not react the menu items
		// isOpen = false
	}

	
	function handleBodyClick(event: MouseEvent){
		const target = event.target as HTMLElement
		const isInside = root.contains(target)

		if(isInside){ return }
		isOpen = false
	}

</script>

<svelte:body on:click={handleBodyClick} />

<overflow-menu bind:this={root}>
	<Button 
		icon
		on:click={toggleMenu} 
		forceHover={isOpen} 
		on:blur={handleBlur}
	>
		<svelte:component this={icon} />
	</Button>
	<div 
		class="dropdown" 
		style={ `--pos-x:${posX}; --pos-y:${posY};`} 
		bind:this={dropdown}
	>
		<Dropdown items={_items} isOpen={isOpen} bind:this={compDropdown} />
	</div>
</overflow-menu>

<style>
	overflow-menu{
		display: inline-block;
	}

	.dropdown{
		position: relative;
		position: fixed;
		inset: 	  0 auto auto 0;
		z-index:  1000;
		transform: translate3d(var(--pos-x,0), var(--pos-y,0), 0px);
	}
</style>