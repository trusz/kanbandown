import { Webview } from "./webview"
export class BackendAPI {

	constructor(
		private readonly webview: Webview 
	){}

	private sendMessage<T>(message: T): void {
		this.webview.postMessage(message)
	}
	
}