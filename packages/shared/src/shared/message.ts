import { Board } from "./board"

export type Message = {
	type: 	 MessageType
	payload: any
}

export enum MessageType {
    Board = "board",
}

export type MessageBoard = Message & {
	type:    MessageType.Board,
	payload: Board
}