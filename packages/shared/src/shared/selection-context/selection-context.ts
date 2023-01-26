import { getContext, setContext } from 'svelte';
import { writable, type Unsubscriber, get } from 'svelte/store';
import type { Item } from '../board';

const key = {};
const selectionStore = writable<Item[]>([])

const selectionContext = {
	select,
	selectAdd,
	selectMultiple,
	reset,
	selectionStore,
}
type SelectionContext = typeof selectionContext

export function initSelectionContext(){
	setContext<SelectionContext>(key, selectionContext)
}

export function useSelectionContext(): SelectionContext{
	const ctx = getContext<SelectionContext>(key)
	if(!ctx){
		console.warn({level:"warn", msg:"selection context has not been initalized"})
	}
	return ctx
}


function select(item: Item){
	selectionStore.set([item])
}
function selectMultiple(items: Item[]){
	selectionStore.set(items)
}
function selectAdd(item: Item){
	const items = [item, ...get(selectionStore)]
	selectionStore.set(items)
}
function reset(){
	selectionStore.set([])
}
