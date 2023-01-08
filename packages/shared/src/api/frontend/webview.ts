export type Webview = {
	postMessage: (message: any) => void
	onDidReceiveMessage: <T>(handler: HandlerFn<T>) => void
}

export type HandlerFn<T> = (message:T) => void