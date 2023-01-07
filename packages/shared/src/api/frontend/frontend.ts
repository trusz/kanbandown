import { Board } from "../../shared/board"
import { MessageBoard, MessageType } from "../../shared/message"
import { Webview } from "../frontend/webview"

export class FrontendAPI {
	constructor(
		
		private readonly webview: Webview 
	){}

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
}