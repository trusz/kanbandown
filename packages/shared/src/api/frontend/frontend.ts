import { Board } from "../../shared/board"
import { Message, MessageBoard, MessageType } from "../../shared/message"
import { Webview } from "../frontend/webview"
import EventEmitter from "events"

export class FrontendAPI {

	private eventEmmiter = new EventEmitter()

	constructor(
		private readonly webview: Webview 
	){
		this.setUpListeners()
	}

	public sendBoard(b: Board){
		const msg: MessageBoard = {
			type:    MessageType.Board,
			payload: b,
		}
		this.sendMessage(msg)
	}

	private sendMessage<T>(message: T){
		this.webview.postMessage(message)
	}

	public onSaveBoard(handler:(board:Board) => void) {
		this.eventEmmiter.on(MessageType.SaveBoard,handler)
	}

	public onOpenLink(handler:(href:string) => void){
		this.eventEmmiter.on(MessageType.OpenLink, handler)
	}

	public onCreateNote(handler:(note: {label: string, extension: string}) => void){
		this.eventEmmiter.on(MessageType.CreateNote, handler)
	}

	private setUpListeners(){
		this.webview.onDidReceiveMessage<Message>((msg: Message) => {
			switch(msg.type){
				case MessageType.SaveBoard: 
					this.eventEmmiter.emit(MessageType.SaveBoard, msg.payload)
					return
				case MessageType.OpenLink:
					this.eventEmmiter.emit(MessageType.OpenLink, msg.payload)
					return
				case MessageType.CreateNote:
					this.eventEmmiter.emit(MessageType.CreateNote, msg.payload)
					return
			}
		})
	}

}