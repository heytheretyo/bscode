import * as vscode from "vscode";

import { Sidebar } from "./views/sidebar";

export function activate(ctx: vscode.ExtensionContext) {
  const pingCommand = vscode.commands.registerCommand("ping", () => {
    vscode.window.showInformationMessage("Hello World from Hourly!");
  });
  ctx.subscriptions.push(pingCommand);

  const sidebarProvider = new Sidebar(ctx.extensionUri);
  ctx.subscriptions.push(
    vscode.window.registerWebviewViewProvider("sidebar", sidebarProvider, {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
    })
  );
}

export function deactivate() {}
