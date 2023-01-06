export type Action = {
	type: 		 "add" | "delete"
	columnIndex: number,
	position?: 	 number,
}

export type ActionAdd = Action & {
	type:  "add",
	label: string,
}

export type ActionDelete = Action & {
	type: "delete",
}