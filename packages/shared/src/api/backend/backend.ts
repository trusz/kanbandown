import { VSCodeAPI } from "./vscode-api"
import { writable, Unsubscriber } from "svelte/store"
import { filteredStore } from "../../shared/filtered-store"
import { Board } from "../../shared/board"
import { Message, MessageCreateNote, MessageOpenLink, MessageSaveBoard, MessageType } from "../../shared/message"
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

	public saveBoard(b: Board): void {
		const message: MessageSaveBoard = {
			type:    MessageType.SaveBoard,
			payload: b,
		}
		this.sendMessage(message)
	}

	public openLink(href: string) {
		const message: MessageOpenLink = {
			type:    MessageType.OpenLink,
			payload: href,
		}
		this.sendMessage(message)
	}

	public createNote(label: string, extension: string){
		const message: MessageCreateNote = {
			type:    MessageType.CreateNote,
			payload: {label, extension},
		}
		this.sendMessage(message)
	}

	private sendMessage<T>(message: T): void {
		this.vscode.postMessage(message)
	}

	private setupListening(){
		this.window.addEventListener<Message>('message', event => {
			this.messageStore.set(event.data)
		});
	}
	
}
