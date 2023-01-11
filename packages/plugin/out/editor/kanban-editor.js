"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanDownSerializer = exports.KanbanDownEditorProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const commonjs_1 = require("@kanbandown/shared/commonjs");
class KanbanDownEditorProvider {
    static register(context) {
        const provider = new KanbanDownEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(KanbanDownEditorProvider.viewType, provider);
        return [providerRegistration, provider];
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
    getHtmlForWebview() {
        // const indexHTMLPath = path.join(this.context.extensionPath, 'node_modules', "@kanbandown/app/dist", "index.html");
        const indexHTMLPath = path.join(this.context.extensionPath, 'media', "index.html");
        const indexContent = fs.readFileSync(indexHTMLPath.toString(), 'utf-8');
        return indexContent;
    }
    incDocument(document) {
        let text = document.getText();
        let counter = parseInt(text);
        if (isNaN(counter)) {
            counter = 0;
        }
        counter++;
        const edit = new vscode.WorkspaceEdit();
        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), String(counter));
        try {
            vscode.workspace.applyEdit(edit);
        }
        catch (err) {
            console.error(err);
        }
        return;
    }
}
exports.KanbanDownEditorProvider = KanbanDownEditorProvider;
KanbanDownEditorProvider.viewType = 'kanbanDown.editor';
class KanbanDownSerializer {
    constructor(getWebviewContent) {
        this.getWebviewContent = getWebviewContent;
    }
    async deserializeWebviewPanel(webviewPanel, state) {
        // `state` is the state persisted using `setState` inside the webview
        console.log(`Got state: ${state}`);
        // Restore the content of our webview.
        //
        // Make sure we hold on to the `webviewPanel` passed in here and
        // also restore any event listeners we need on it.
        webviewPanel.webview.html = this.getWebviewContent();
    }
}
exports.KanbanDownSerializer = KanbanDownSerializer;
//# sourceMappingURL=kanban-editor.js.map