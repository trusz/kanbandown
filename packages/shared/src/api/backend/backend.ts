import { VSCodeAPI } from "./vscode-api"
import { writable, Unsubscriber } from "svelte/store"
import { filteredStore } from "../../shared/filtered-store"
import { Board } from "../../shared/board"
import { Message, MessageBoard, MessageType } from "../../shared/message"
import { Window } from "./window"

export type HandlerFn = (b?: Board) => void
// handler: (msg?: MSGInsert) => void

export class BackendAPI {

	private messageStore = writable<Message>()
	private boardEventStore = filteredStore<Board>(this.messageStore, MessageType.Board)

	constructor(
		private readonly vscode: VSCodeAPI,
		private readonly window: Window,
	){
		this.setupListening()
	}

	
	public listenOnBoard(handler: (board?: Board) => void): Unsubscriber {
		return this.boardEventStore.subscribe(handler)
	}

	private sendMessage<T>(message: T): void {
		this.vscode.postMessage(message)
	}

	private setupListening(){
		this.window.addEventListener<Message>('message', event => {
			console.log({level:"dev", msg:"got message from be", event})
			this.messageStore.set(event.data)
		});
	}
	
}
