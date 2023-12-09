import * as vscode from "vscode";
import { Sidebar } from "../views/sidebar";

interface ICommand {
  execute(msg: any): void;
}

export class SidebarCommand {
  commands: { [id: string]: ICommand } = {};
  _webview: Sidebar;
  _extensionUri: vscode.Uri;

  constructor(webview: Sidebar, extensionUri: vscode.Uri) {
    this._webview = webview;
    this._extensionUri = extensionUri;
  }

  register(commandName: string, command: ICommand) {
    this.commands[commandName] = command;
  }

  execute(commandName: string, msg: any) {
    if (commandName in this.commands) {
      this.commands[commandName].execute(msg);
    } else {
      console.log(`Command [${commandName}] not recognised`);
    }
  }
}
