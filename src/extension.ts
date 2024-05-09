// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "secret-sample-extension" is now active!');

	let disposableSaveToSecretStorageCommand = vscode.commands.registerCommand('extension.saveToSecretStorage', async () => {
        const input = await vscode.window.showInputBox({ prompt: 'Enter text to save to Secret Storage' });
        if (input !== undefined) {
            await context.secrets.store('storedText', input);
            vscode.window.showInformationMessage('Text saved to Secret Storage');
        }
    });

	
	const disposableReadFromSecretStorage = vscode.commands.registerCommand('extension.readFromSecretStorage', async () => {
		context.secrets.get('storedText').then((value: string | undefined) => {
			if (value !== undefined) {
				vscode.window.showInformationMessage('Stored text: ' + value);
			}
		});
    });
	
	context.subscriptions.push(disposableSaveToSecretStorageCommand);
	context.subscriptions.push(disposableReadFromSecretStorage);
}

// This method is called when your extension is deactivated
export function deactivate() {}
