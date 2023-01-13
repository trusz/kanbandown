import { Board } from "./board"

export type Message = {
	type: 	 MessageType
	payload: any
}

export enum MessageType {
    Board 	  = "board",
	SaveBoard = "board",
	OpenLink  = "openLink"
}

export type MessageBoard = Message & {
	type:    MessageType.Board,
	payload: Board
}
export type MessageSaveBoard = Message & {
	type: MessageType.SaveBoard,
	payload: Board,
}

export type MessageOpenLink = Message & {
	type: 	 MessageType.OpenLink,
	payload: string // the link's href
}