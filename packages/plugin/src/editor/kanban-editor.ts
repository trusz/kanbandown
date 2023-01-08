import * as vscode from 'vscode';
import { getNonce } from './util';
import * as fs from "fs";
import * as path from "path";
import { Board, FrontendAPI, parse, render } from '@kanbandown/shared/commonjs';
export class KanbanDownEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new KanbanDownEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(KanbanDownEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'kanbanDown.editor';

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	// Entry Point, gets called by vscode
	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: 		true,
			localResourceRoots: [
				vscode.Uri.file(path.join(this.context.extensionPath, 'media')),
				vscode.Uri.file(path.join(this.context.extensionPath, 'node_modules')),
			]
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
		
		const frontendAPI = new FrontendAPI(webviewPanel.webview);
		function updateWebview() {
			const newBoard = parse(document.getText());
			frontendAPI.sendBoard(newBoard);
		}

		frontendAPI.onSaveBoard((board: Board)=>{
			console.log({level:"dev", msg:"plugin>onSaveBoard", board});

			const renderedContent = render(board);
			console.log({level:"dev", msg:"plugin>renderedcontent", renderedContent});
			const edit = new vscode.WorkspaceEdit();
		// Just replace the entire document every time for this example extension.
		// A more complete extension should compute minimal edits instead.
			edit.replace(
				document.uri,
				new vscode.Range(0, 0, document.lineCount, 0),
				renderedContent,
			);

			try{
				vscode.workspace.applyEdit(edit);
			}catch(err){
				console.error(err);
			}
		});
		

		// Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		// 
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)
		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage(e => {
			switch (e.type) {
				case 'inc':
					console.warn("code is commented out");
					// this.incDocument(document);
					return;
			}
		});

		updateWebview();
	}

	/**
	 * Get the static html used for the editor webviews.
	 */
	private getHtmlForWebview(webview: vscode.Webview): string {

		const indexHTMLPath = path.join(this.context.extensionPath, 'node_modules', "@kanbandown/app/dist", "index.html");
		const indexContent = fs.readFileSync(indexHTMLPath.toString(),'utf-8');

		return indexContent;
	}

	private incDocument(document:vscode.TextDocument){
		let text = document.getText();
		let counter = parseInt(text);
		if( isNaN(counter)){
			counter = 0;
		}
		counter++;
		
		const edit = new vscode.WorkspaceEdit();

		// Just replace the entire document every time for this example extension.
		// A more complete extension should compute minimal edits instead.
		edit.replace(
			document.uri,
			new vscode.Range(0, 0, document.lineCount, 0),
			String(counter)
		);

		try{
			vscode.workspace.applyEdit(edit);
		}catch(err){
			console.error(err);
		}

		return;
	}

}
