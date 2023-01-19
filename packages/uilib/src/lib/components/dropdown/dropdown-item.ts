
export type DropdownItem = {
	label:   string,
	onClick: () => void,
	icon?:   new (...a: any[]) => any,
	color?:   string,
}