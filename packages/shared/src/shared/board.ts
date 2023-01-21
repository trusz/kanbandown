
export class Board {

	public title			 = ""
	public description		 = ""
	public columns: Column[] = []
	public items:	 Item[]	 = []

	// 
	// Board
	// 
	public setTitle(newTitle: string){
		this.title = newTitle
	}
	public setDescription(newDesc: string){
		this.description = newDesc
	}

	// 
	// Column
	// 
	public createColumn(title:string, at:number = this.columns.length){
		if(!this.isInColumnRange(at)){
			throw new Error(JSON.stringify({msg:"`at` is outside of columns range", at}))
		}

		const newColumn = new Column(title, this.columns.length)
		this.columns.splice(at,0,newColumn)
	}
	public deleteColumn(columnIndex: number) {
		this.columns.splice(columnIndex,1)
	}
	public setColumnTitle(columnIndex: number, newTitle: string){
		this.columns[columnIndex].title = newTitle
	}
	public setColumn(columns: Column[]){
		this.columns = columns
	}
	public setItems(columnIndex: number, items: Item[]){
		this.columns[columnIndex].items = items
	}
	public clearItems(columnIndex: number){
		this.columns[columnIndex].items = []
	}

	private hasColumnAt(index:number): boolean{
		const c = this.columns[index]
		return Boolean(c)
	}

	private throwIfWrongColumnPosition(columnIndex:number){
		if( !this.hasColumnAt(columnIndex) ){
			throw new Error(`no column at: ${columnIndex}`)
		}
	}

	private isInColumnRange(index:number): boolean{
		const tooSmall = index < 0
		const tooBig = index > this.columns.length
		const justRight = !tooSmall && !tooBig
		return justRight
	}

	// 
	// Item
	// 
	public createItem(
		label: string,
		done = false,
		columnIndex = this.columns.length -1, 
		position?: number
	) {
		this.throwIfWrongColumnPosition(columnIndex)
		
		const newItem = new Item(label, done, this.items.length)
		this.items.push(newItem)
		
		const column = this.columns[columnIndex]
		this.addItemToColumn(column, newItem, position)
		// column.addItem(newItem, position)
	}

	public setItemLabel(
		columnIndex: number,
		taskIndex: number,
		newLabel: string,
	){
		this.columns[columnIndex].items[taskIndex].label = newLabel
	}

	public deleteItemFromColumn(columnIndex: number, indexInColumn: number){
		const column = this.columns[columnIndex]
		const itemToDelete = column.items[indexInColumn]
		const indexInAllItems = this.items.indexOf(itemToDelete)

		column.items.splice(indexInColumn,1)
		this.items.splice(indexInAllItems,1)
	}


	public addItemToColumn(c: Column, i: Item, at: number = c.items.length){
		c.items.splice(at, 0, i)
		
	}

	public deleteItem(columnIndex: number, position: number){
		this.throwIfWrongColumnPosition(columnIndex)

		const column = this.columns[columnIndex]
		
		const item = column.getItem(position)
		const itemIndex = this.items.indexOf(item)
		this.items.splice(itemIndex,1)

		column.deleteItem(position)
	}

}

export class Column {
	public items: Item[] = []

	constructor(
		public title: string,
		public id:    number,
	){}

	public addItem(i: Item, at: number = this.items.length){
		this.items.splice(at, 0, i)
	}

	public deleteItem(at: number = this.items.length) {
		this.items.splice(at, 1)
	}

	public getItem(position: number): Item {
		return this.items[position]
	}

}


export class Item {
	constructor(
		public label = "",
		public done  = false,
		public id    = -1,
		// public id: 	  string = "",
	){}
}
