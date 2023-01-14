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
		webviewPanel.webview.html = this.getHtmlForWebview();
		
		const frontendAPI = new FrontendAPI(webviewPanel.webview);
		function updateWebview() {
			const newBoard = parse(document.getText());
			frontendAPI.sendBoard(newBoard);
		}
		https://github.com/microsoft/vscode/blob/ac88f33e2ca851839a3cd2a972377558f654e0a6/extensions/markdown-language-features/src/preview/preview.ts#L447
		frontendAPI.onOpenLink((href:string)=>{
			
			const wsFolder =  vscode.workspace.getWorkspaceFolder(document.uri);
			if(!wsFolder){ return; }

			var filePath = path.join(wsFolder?.uri.toString(), href);
			const uri = vscode.Uri.parse(filePath);
			
			vscode.commands.executeCommand("vscode.open",uri);
		});

		frontendAPI.onSaveBoard((board: Board)=>{

			const renderedContent = render(board);
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
			console.log({level:"dev", msg:"webviewpanel disposed"});
			changeDocumentSubscription.dispose();
		});

		// important!
		// This make sure that we reload our view when we switch tabs
		webviewPanel.onDidChangeViewState((e) => {
			if(webviewPanel.visible){
				webviewPanel.webview.html = this.getHtmlForWebview();
				updateWebview();
			}
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
	public getHtmlForWebview(): string {
		let indexHTMLPath = "";
		
		if(this.context.extensionMode === vscode.ExtensionMode.Production){
			indexHTMLPath = path.join(this.context.extensionPath, 'media', "index.html");
		}else{
			indexHTMLPath = path.join(this.context.extensionPath, 'node_modules', "@kanbandown/app/dist", "index.html");
		}
		
		this.context.extensionMode;
		const indexContent = fs.readFileSync(indexHTMLPath.toString(),'utf-8');

		return indexContent;
	}

}

// export class KanbanDownSerializer implements vscode.WebviewPanelSerializer {
	
// 	constructor(
// 		private getWebviewContent: () => string 
// 	){}


// 	async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
// 	  // `state` is the state persisted using `setState` inside the webview
// 	  console.log(`Got state: ${state}`);
  
// 	  // Restore the content of our webview.
// 	  //
// 	  // Make sure we hold on to the `webviewPanel` passed in here and
// 	  // also restore any event listeners we need on it.
// 	  webviewPanel.webview.html = this.getWebviewContent();
// 	}
//   }