"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanDownEditorProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const commonjs_1 = require("@kanbandown/shared/commonjs");
class KanbanDownEditorProvider {
    static register(context) {
        const provider = new KanbanDownEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(KanbanDownEditorProvider.viewType, provider);
        return providerRegistration;
    }
    constructor(context) {
        this.context = context;
    }
    // Entry Point, gets called by vscode
    async resolveCustomTextEditor(document, webviewPanel, _token) {
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this.context.extensionPath, 'media')),
                vscode.Uri.file(path.join(this.context.extensionPath, 'node_modules')),
            ]
        };
        webviewPanel.webview.html = this.getHtmlForWebview();
        const frontendAPI = new commonjs_1.FrontendAPI(webviewPanel.webview);
        function updateWebview() {
            const newBoard = (0, commonjs_1.parse)(document.getText());
            frontendAPI.sendBoard(newBoard);
        }
        frontendAPI.onSaveBoard((board) => {
            const readme = "Readme.md";
            // @ts-ignore
            var filePath = path.join(vscode.workspace.workspaceFolders[0].uri.toString(), readme);
            const content = "hello";
            // fs.writeFileSync(filePath, content, 'utf8');
            var openPath = vscode.Uri.file(filePath); //A request file path
            vscode.workspace.openTextDocument(openPath).then(doc => {
                vscode.window.showTextDocument(doc);
            }, (err) => console.log({ level: "err", err }));
            // @ts-ignore
            // const root = vscode.workspace.wost(file);
            // try{
            // } catch(err){
            // 	console.log({level:"error", msg:"could not open text file", file });
            // }
            const renderedContent = (0, commonjs_1.render)(board);
            const edit = new vscode.WorkspaceEdit();
            // Just replace the entire document every time for this example extension.
            // A more complete extension should compute minimal edits instead.
            edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), renderedContent);
            try {
                vscode.workspace.applyEdit(edit);
            }
            catch (err) {
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
            console.log({ level: "dev", msg: "webviewpanel disposed" });
            changeDocumentSubscription.dispose();
        });
        // important!
        // This make sure that we reload our view when we switch tabs
        webviewPanel.onDidChangeViewState((e) => {
            if (webviewPanel.visible) {
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
    getHtmlForWebview() {
        const indexHTMLPath = path.join(this.context.extensionPath, 'node_modules', "@kanbandown/app/dist", "index.html");
        // const indexHTMLPath = path.join(this.context.extensionPath, 'media', "index.html");
        const indexContent = fs.readFileSync(indexHTMLPath.toString(), 'utf-8');
        return indexContent;
    }
}
exports.KanbanDownEditorProvider = KanbanDownEditorProvider;
KanbanDownEditorProvider.viewType = 'kanbanDown.editor';
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
//# sourceMappingURL=kanban-editor.js.map