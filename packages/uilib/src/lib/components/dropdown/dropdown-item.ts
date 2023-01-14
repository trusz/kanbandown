
export type DropdownItem = {
	label: string
	icon?: new (...a: any[]) => any
	onClick: () => void
}