import { suite, test, beforeAll } from "vitest"
import { BackendAPI } from "./backend"
import { Webview } from "../frontend/webview"
import { Window } from "./window"

suite("backend", () => {

	let api: BackendAPI
	beforeAll(()=>{
		api = new BackendAPI(mockWebView, mockWindow)
	})

	test("just works", () => {
		// console.log({api})
	})
})

const mockWebView: Webview = {
	postMessage(message){}
}

const mockWindow: Window = {
	addEventListener: <T>(type: string, listener:(event:{data:T}) => void ) => void {

	}
}