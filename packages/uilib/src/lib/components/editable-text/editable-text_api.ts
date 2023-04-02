import { getContext, setContext } from "svelte"
import { type Writable, writable } from "svelte/store"

export type ID = unknown
const key = Symbol()


export function initEditableTextAPI(){
	const context = new EditableTextAPI()
	setContext(key,context)
}

// we want to uninentionally create context if it does not exists
// because context is created for a subtree and we want to
// manage who gets the context
export function useEditableTextAPI(): EditableTextAPI{
	const api = getContext<EditableTextAPI | undefined>(key)
	if(!api){
		return new EditableTextAPI()
	}
	return api
}

export class EditableTextAPI {

	private states: Map<ID, Writable<EditableTextState>> = new Map()
	
	public activate(id: ID){
		this.setIsEditing(id, true)
	}
	
	public deactivate(id: ID){
		this.setIsEditing(id, false)
	}

	public useState(id: ID): Writable<EditableTextState>{
		this.ensureState(id)
		const state = this.states.get(id)!
		return state
	}

	private ensureState(id: ID){
		const state = this.states.get(id)
		if(state){ return }
		this.states.set(id, writable({...defaultEditableTextState}))
	}

	private setIsEditing(id: ID, isEditing: boolean){
		this.ensureState(id)
		const itemState = this.states.get(id)
		if(!itemState){ return }
	
		itemState.update((state) => {
			return {
				...state,
				isEditing,
			}
		})
	}

}


export type EditableTextState = {
	isEditing: boolean
}


export const defaultEditableTextState: EditableTextState = {
	isEditing: false
}


