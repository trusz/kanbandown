import { Board, Column, Item } from "../board";

export function renderToMarkdown(board:Board): string {
	let result = ""
	result += renderTitle(board.title)
	result += renderNewLine()
	result += renderColumns(board.columns)

	return result.trim() + "\n"
}


function renderTitle(title:string, level = 1): string {
	return `${"#".repeat(level)} ${title}`
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