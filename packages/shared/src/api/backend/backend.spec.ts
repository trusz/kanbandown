import { suite, test, beforeAll } from "vitest"
import { BackendAPI } from "./backend"
import { Webview } from "./webview"

suite("backend", () => {

	let api: BackendAPI
	beforeAll(()=>{
		api = new BackendAPI(mockWebView)
	})

	test("just works", () => {
		// console.log({api})
	})
})

const mockWebView: Webview = {
	postMessage(message){}
}