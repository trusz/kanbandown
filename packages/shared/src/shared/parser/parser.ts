import { marked } from 'marked';
import { Board } from '../board';

type LoaderFn = (board: Board, token: marked.Token) => void
type LoaderConfig = {
	type:     "heading" | "list" | "paragraph",
	loaderFn: LoaderFn
}
const loaders: LoaderConfig[] = [
	{type:"heading",   loaderFn: loadTitle},
	{type:"heading",   loaderFn: loadColumn},
	{type:"list",	   loaderFn: loadTasks},
	{type:"paragraph", loaderFn: loadDescription},

]

export function parseFromMarkdown(content: string): Board {
	const tokens = marked.lexer(content, {gfm:true, breaks:true})
	const board = new Board()
	for(let token of tokens){
		for(let loaderConfig of loaders){
			if(loaderConfig.type !== token.type){ continue }
			loaderConfig.loaderFn(board, token)
		}
	}
	return board
}

// 
// Loaders
// 

function loadTitle(board: Board, token: marked.Token) {
	token = token as marked.Tokens.Heading
	if(token.depth !== 1){ return }
	if(board.title.trim() !== ""){ return }

	token = token as marked.Tokens.Heading
	board.title = token.text
}

function loadColumn(board:Board, token: marked.Token){
	token = token as marked.Tokens.Heading
	if(token.depth !== 2){ return }

	const columnTitle = token.text
	board.createColumn(columnTitle)
}

function loadTasks(board:Board, token: marked.Token){
	token = token as marked.Tokens.List
	const tasks = token.items.filter(item => item.task)

	for(let task of tasks){
		board.createItem(task.text, task.checked)
	}
}

function loadDescription(board:Board, token: marked.Token){
	const alreadyReachedColumns = board.columns.length > 0
	if(alreadyReachedColumns){ return }

	token = token as marked.Tokens.Paragraph
	const sep = board.description !== "" ? "\n\n" : ""
	const newDesc = board.description + sep + token.text
	board.setDescription(newDesc.trim())
}

