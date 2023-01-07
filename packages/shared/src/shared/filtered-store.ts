import { derived, Writable, Readable } from "svelte/store"
import { Message, MessageType } from "./message"


export function filteredStore<T>(originalStore: Writable<Message>, type: MessageType ): Readable<T | undefined > {
    return derived(originalStore, (msg, set) => {
        if(!msg){ set(undefined) }
        if(msg?.type !== type){ return }
        set(msg.payload as T)
    })
}