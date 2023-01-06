import { VSCodeAPI } from "./vscode-api";

export class FrontendAPI {
	constructor(
		private readonly vscode: VSCodeAPI
	){}

	public addItem(label: string, columnIndex: number, position: number){
		
	}

	private sendMessage<T>(message: T){
		this.vscode.postMessage(message)
	}
}