
export class State {

	private title				= ""
	private description			= ""
	private columns: Column[]	= []
	private items:	 Item[]		= []

	// 
	// State
	// 
	setTitle(title: string){
		this.title = title
	}

	public Title(): string {
		return this.Title()
	}

	setDescription(desc: string){
		this.description = desc
	}

	public Description(): string {
		return this.description
	}

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

	public Columns(): Column[] {
		return this.columns
	}

	private hasColumnAt(index:number): boolean{
		const c = this.Columns()[index]
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
	public createItem(label: string, columnIndex: number, position?: number) {
		this.throwIfWrongColumnPosition(columnIndex)
		
		const newItem = new Item(label)
		this.items.push(newItem)

		const column = this.Columns()[columnIndex]
		column.addItem(newItem, position)

	}

	public deleteItem(columnIndex: number, position: number){
		this.throwIfWrongColumnPosition(columnIndex)

		const column = this.Columns()[columnIndex]
		
		const item = column.getItem(position)
		const itemIndex = this.Items().indexOf(item)
		this.items.splice(itemIndex,1)

		column.deleteItem(position)
	}

	public Items(): Item[] {
		return this.items
	}

}

export class Column {
	private items: Item[] = []

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

	public Items(): Item[] {
		return this.items
	}
}


export class Item {
	constructor(
		public label: string = "",
		public id: 	  string = crypto.randomUUID(),
	){}
}
