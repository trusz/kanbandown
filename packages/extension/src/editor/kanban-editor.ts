import * as vscode from 'vscode';
import { getNonce } from './util';
import * as fs from "fs";
import * as path from "path";
import { Board, FrontendAPI, convertToFileName, parseFromMarkdown, renderToMarkdown, removeDuplicateSpaces } from '@kanbandown/shared/commonjs';

export class KanbanDownEditorProvider implements vscode.CustomTextEditorProvider {

	private disposeCommand?: vscode.Disposable;
	private static CommandKey = "kanbanDown.openAsMarkdown";

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
			// localResourceRoots: [
			// 	vscode.Uri.file(path.join(this.context.extensionPath, 'media')),
			// 	vscode.Uri.file(path.join(this.context.extensionPath, 'node_modules')),
			// ]
		};
		this.registerCommand()


		const uri = document.uri;
		const uriOfFile = webviewPanel.webview.asWebviewUri(
			vscode.Uri.joinPath(this.context.extensionUri, document.fileName)
		);
		const pathParts = uri.path.split(path.sep);
		const basePathParts = pathParts.slice(0,-1);
		const basePath = basePathParts.join(path.sep);
		const baseURL = `${uriOfFile.scheme}://${encodeURIComponent(uriOfFile.authority)}${basePath}`;


		webviewPanel.webview.html = this.getHtmlForWebview(document.uri, baseURL);

		const frontendAPI = new FrontendAPI(webviewPanel.webview);
		function updateWebview() {
			
			const newBoard = parseFromMarkdown(document.getText());
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

		frontendAPI.onCreateNote(async (title:string)=>{
			const fileName = convertToFileName(title)
			const tabInput = vscode.window.tabGroups.activeTabGroup?.activeTab?.input as {uri: vscode.Uri}
			const uri = tabInput?.uri
			if(!uri){
				console.error({level:"error", msg:"could not extract uri from active tab"})
				return
			}
			const currentUri = uri
			const currentDirUri = currentUri.with({ path: currentUri.path.replace(/\/[^\/]*$/, '') });
			const fileUri = currentDirUri.with({ path: `${currentDirUri.path}/${fileName}` });

			if(await this.doesFileExist(fileUri)){ 
				console.warn({level:"warn", msg:"file already exists, stopping", fileName, fileUri})
				return
			}
			const contentTitle = removeDuplicateSpaces(title)
			const content = `# ${contentTitle}`;
			const contentBuffer = Buffer.from(content, 'utf8');
			
			try {
				await vscode.workspace.fs.writeFile(fileUri, contentBuffer);
			} catch (err) {
				console.error(err);
			}
		})

		frontendAPI.onSaveBoard((board: Board)=>{

			const renderedContent = renderToMarkdown(board);
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
			this.disposeCommand?.dispose();
			this.disposeCommand = vscode.commands.registerCommand(KanbanDownEditorProvider.CommandKey, function noop(){});
		});

		// important!
		// This make sure that we reload our view when we switch tabs
		webviewPanel.onDidChangeViewState((e) => {
			if(webviewPanel.visible){
				webviewPanel.webview.html = this.getHtmlForWebview(document.uri, baseURL);
				updateWebview();
			}
		});

		// Receive message from the webview.

		updateWebview();
	}

	private registerCommand(){
		this.disposeCommand?.dispose();
		
		this.disposeCommand =  vscode.commands.registerCommand(KanbanDownEditorProvider.CommandKey, () => {
			const tabInput = vscode.window.tabGroups.activeTabGroup?.activeTab?.input as {uri: vscode.Uri}
			const uri = tabInput?.uri
			if(!uri){ 
				console.error({level:"error", msg:"could not extract uri"})
				return
			}
			vscode.window.showTextDocument(uri);
		});
	
	}

	/**
	 * Get the static html used for the editor webviews.
	 */
	public getHtmlForWebview(uri: vscode.Uri, basePath: string): string {
		let indexHTMLPath = "";
		
		if(this.context.extensionMode === vscode.ExtensionMode.Production){
			indexHTMLPath = path.join(this.context.extensionPath, 'media', "index.html");
		}else{
			indexHTMLPath = path.join(this.context.extensionPath, 'node_modules', "@kanbandown/app/dist", "index.html");
		}
		
		let indexContent = fs.readFileSync(indexHTMLPath.toString(),'utf-8');
		indexContent = indexContent.replace("%DOCUMENT_URI%", uri.toString());
		indexContent = indexContent.replace("%BASE_PATH%", basePath);

		return indexContent;
	}

	private async doesFileExist(uri: vscode.Uri): Promise<boolean> {
		try{
			await vscode.workspace.fs.stat(uri)
		} catch {
			return false
		}

		return true
	}

}