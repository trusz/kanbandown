import { getContext, setContext } from 'svelte';
import { derived, writable, type Readable, type Unsubscriber, type Writable } from 'svelte/store';
import { Board } from '../board';

const key = {};
const toFile = writable<Board | undefined>()
const fromFile = writable<Board>(new Board())
const readableStore = derived(fromFile, (b) => b)

const boardContext = {
	saveBoard,
	onSaveBoard,
	displayBoard,
	onDisplayBoard,
	boardStore: readableStore
}
type BoardContext = typeof boardContext

export function initBoardContext(){
	setContext<BoardContext>(key, boardContext)
}

export function useBoardContext(){
	const ctx = getContext<BoardContext>(key)
	if(!ctx){
		console.warn({level:"warn", msg:"board context has not been initalized"})
	}
	return ctx
}

function saveBoard(newBoard: Board){
	toFile.set(newBoard)
}
function onSaveBoard(handler:(b?:Board) => void): Unsubscriber{
	return toFile.subscribe(handler)
}

function displayBoard(newBoard: Board){
	fromFile.set(newBoard)
}

function onDisplayBoard(handler:(b:Board) => void): Unsubscriber {
	return fromFile.subscribe(handler)
}
