
export class Board {

	public title				= ""
	public description			= ""
	public columns: Column[]	= []
	public items:	 Item[]		= []

	// 
	// Column
	// 
	public createColumn(title:string, at:number = this.columns.length){
		if(!this.isInColumnRange(at)){
			throw new Error(JSON.stringify({msg:"`at` is outside of columns range", at}))
		}

		const newColumn = new Column(title)
		this.columns.splice(at,0,newColumn)
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
		console.log({level:"dev", msg:"createItem", column})
		this.addItemToColumn(column, newItem, position)
		// column.addItem(newItem, position)
	}

	public deleteItemFromColumn(columnIndex: number, itemIndex: number){
		const column = this.columns[columnIndex]
		const itemToDelete = column.items[itemIndex]
		const indexInItems = this.items.indexOf(itemToDelete)

		column.items.splice(indexInItems,1)
		this.items.splice(indexInItems,1)
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
