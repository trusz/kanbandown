import { Board, Column, Item } from "../board";

export function renderToMarkdown(board:Board): string {
	const parts = [
		renderTitle(board.title),
		renderDescription(board.description),
		renderColumns(board.columns),
		
	]
	
	let result = parts
		.filter(p => Boolean(p))
		.join(renderNewLine())

	return result + "\n"
}


function renderTitle(title:string, level = 1): string {
	return `${"#".repeat(level)} ${title}`
}

function renderDescription(desc: string): string {
	return desc
}

function renderNewLine(): string {
	return "\n\n";
}

function renderColumns(columns: Column[]):string{
	let result = ""
	const renderedColumns: string[] = []
	for(let column of columns){
		// result += renderColumn(column)
		renderedColumns.push( renderColumn(column) )
	}
	result += renderedColumns.join( renderNewLine() )

	return result
}

function renderColumn(column: Column): string {
	let result = ""
	result += renderTitle(column.title, 2)
	result += renderNewLine()
	result += renderItems(column.items)
	return result
}


function renderItems(items: Item[]): string {
	let result = ""
	let renderedItems: string[] = []
	for(let item of items){
		renderedItems.push( renderItem(item) )
	}
	result += renderedItems.join("\n")
	return result
}

function renderItem(item: Item): string {
	let result = ""
	const checkMark = item.done ? "x": " "
	const label = renderSoftNewLines(item.label)
	result += `- [${checkMark}] ${label}`
	return result
}

function renderSoftNewLines(text: string): string {
	// replaceAll exists
	// @ts-ignore
	return text.replaceAll("\n"," <br />");
}